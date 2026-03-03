import sendEmail from "./../../utils/mail";
import sendEmailPassport from "./../../utils/mailPassport";

export async function POST(request) {
  try {
    // Если вы ожидаете данные из тела запроса, извлеките их
    const body = await request.json();
    const { emailType, ...emailData } = body; // вытаскиваем тип, остальное — данные для письма

    let result;
    // Условие выбора функции отправки
    if (emailType === "passport") {
      result = await sendEmailPassport(emailData);
    } else if (emailType === "contract") {
      // Если будут другие типы
      // result = await sendMailContract(emailData);
    } else {
      // Функция по умолчанию
      result = await sendEmail(emailData);
    }
    // // Вызов функции отправки email
    // const result = await sendEmail(body);

    return Response.json({
      accepted: result.accepted,
      message: "Письмо успешно отправлено",
    });
  } catch (error) {
    console.error("Error in API route:", error);
    return Response.json(
      {
        message: "что-то сломалось в роуте апи emails",
        error: error.message, // Добавьте больше информации об ошибке
      },
      { status: 500 },
    );
  }
}
