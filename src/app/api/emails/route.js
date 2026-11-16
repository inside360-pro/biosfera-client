import sendEmail from "./../../utils/mail";
import sendEmailPassport from "./../../utils/mailPassport";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const hitsByIp = new Map();

function clientIp(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") || "local";
}

function isRateLimited(ip) {
  const now = Date.now();
  const recent = (hitsByIp.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);

  if (recent.length >= MAX_REQUESTS) {
    hitsByIp.set(ip, recent);
    return true;
  }

  recent.push(now);
  hitsByIp.set(ip, recent);

  if (hitsByIp.size > 1000) {
    for (const [key, times] of hitsByIp) {
      if (times.every((time) => now - time >= WINDOW_MS)) {
        hitsByIp.delete(key);
      }
    }
  }

  return false;
}

function textField(value, max) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > max) return null;
  return trimmed;
}

function phoneField(value) {
  const phone = textField(value, 30);
  if (!phone) return null;
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 15) return null;
  return phone;
}

function emailField(value) {
  const email = textField(value, 120);
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  return email;
}

function leadData(body) {
  const name = textField(body.name, 80);
  const phone = phoneField(body.phone);
  const email = emailField(body.email);
  const question =
    body.question === undefined || body.question === null || body.question === ""
      ? ""
      : textField(body.question, 2000);

  if (!name || name.length < 2 || !phone || !email || question === null) {
    return null;
  }
  if (body.policy !== true) return null;

  return { name, phone, email, question };
}

function passportData(body) {
  const data = {
    last_name: textField(body.last_name, 80),
    name: textField(body.name, 80),
    middle_name: textField(body.middle_name, 80),
    phone: phoneField(body.phone),
    email: emailField(body.email),
    contract_type: textField(body.contract_type, 80),
    passport_series: textField(body.passport_series, 40),
    passport_issued_by: textField(body.passport_issued_by, 200),
    passport_issued_code: textField(body.passport_issued_code, 40),
    passport_issued_date: textField(body.passport_issued_date, 40),
    address_of_residence: textField(body.address_of_residence, 300),
  };

  if (Object.values(data).some((value) => !value)) return null;
  if (body.policy !== true) return null;

  return data;
}

function isServiceFilled(value) {
  if (value === undefined || value === null || value === "") return false;
  if (typeof value === "string") return value.trim() !== "";
  return true;
}

function badRequest() {
  return Response.json({ message: "Проверьте поля формы" }, { status: 400 });
}

export async function POST(request) {
  if (isRateLimited(clientIp(request))) {
    return Response.json(
      { message: "Слишком много запросов, попробуйте позже" },
      { status: 429 },
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return badRequest();
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return badRequest();
  }

  if (isServiceFilled(body.service)) {
    return Response.json({
      accepted: [],
      message: "Письмо успешно отправлено",
    });
  }

  try {
    const { emailType, ...emailData } = body;
    let result;

    if (emailType === undefined) {
      const data = leadData(emailData);
      if (!data) return badRequest();
      result = await sendEmail(data);
    } else if (emailType === "passport") {
      const data = passportData(emailData);
      if (!data) return badRequest();
      result = await sendEmailPassport(data);
    } else {
      return badRequest();
    }

    return Response.json({
      accepted: result.accepted,
      message: "Письмо успешно отправлено",
    });
  } catch (error) {
    console.error("Error in API route:", error);
    return Response.json(
      { message: "Не удалось отправить заявку" },
      { status: 500 },
    );
  }
}
