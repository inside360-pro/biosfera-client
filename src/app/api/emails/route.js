import sendEmail from "./../../utils/mail";

export async function POST(request) {
  try {
    // Если вы ожидаете данные из тела запроса, извлеките их
    const body = await request.json();
    // Вызов функции отправки email
    const result = await sendEmail(body);

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
