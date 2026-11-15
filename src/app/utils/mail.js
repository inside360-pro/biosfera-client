import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 465,
  secure: true, // true for port 465, false for other ports
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

async function sendEmail(body) {
  const name = escapeHtml(body.name);
  const phone = escapeHtml(body.phone);
  const email = escapeHtml(body.email);
  const question = body.question ? escapeHtml(body.question) : "";

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      // from: 'no-replay@dubrovinastom.ru',
      // через запятую в TO добавить еще почты
      to: `${process.env.SMTP_FROM}, info.biosfera_dv@mail.ru`,
      subject: "Форма с сайта biosfera25.ru",
      text: `Имя: ${body.name}\nТелефон: ${body.phone}\nEmail: ${body.email}${
        body.question ? `\nСообщение: ${body.question}` : ""
      }`,
      html: `
      <b>Имя:</b> ${name}<br>
      <b>Телефон:</b> ${phone}<br>
      <b>Email:</b> ${email}<br>
      ${question ? `<b>Сообщение:</b> ${question}<br>` : ""}
      `
      ,
    });

    // console.log("Message sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error; // Перебрасываем ошибку, чтобы её можно было поймать в API роуте
  }
}

export default sendEmail;
