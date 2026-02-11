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

async function sendEmail(body) {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      // from: 'no-replay@dubrovinastom.ru',
      // через запятую в TO добавить еще почты
      to: `${process.env.SMTP_FROM}`,
      subject: "Форма с сайта biosfera-d.ru",
      text: `Имя: ${body.name}\nТелефон: ${body.phone}`,
      html: `<b>Имя:</b> ${body.name}<br><b>Телефон:</b> ${body.phone}`,
    });

    // console.log("Message sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error; // Перебрасываем ошибку, чтобы её можно было поймать в API роуте
  }
}

export default sendEmail;
