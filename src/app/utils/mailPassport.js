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

async function sendEmailPassport(body) {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      // from: 'no-replay@dubrovinastom.ru',
      // через запятую в TO добавить еще почты
      to: `${process.env.SMTP_FROM}`,
      subject: "biosfera25.ru - Подписание договора",
      text: `Имя: ${body.name}\nТелефон: ${body.phone}`,
      html: `
      <b>Тип документа:</b> Паспорт<br>
      <b>Фамилия:</b> ${body.last_name}<br>
      <b>Имя:</b> ${body.name}<br>
      <b>Отчество:</b> ${body.middle_name}<br>
      <b>Телефон:</b> ${body.phone}<br>
      <b>Серия и номер паспорта:</b> ${body.passport_issued_code}<br>
      <b>Кем выдан:</b> ${body.passport_issued_by}<br>
      <b>Дата выдачи:</b> ${body.passport_issued_date}<br>
      <b>Адрес проживания:</b> ${body.address_of_residence}<br>
      <b>Тип договора:</b> ${body.contract_type}<br>
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

export default sendEmailPassport;
