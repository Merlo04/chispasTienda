import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const enviarCorreoVerificacion = async (destinatario, token) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // o el proveedor que uses
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const linkVerificacion = `http://localhost:5173/verificar?token=${token}`;

  const mailOptions = {
    from: `"Chispas Tienda" <${process.env.EMAIL_USER}>`,
    to: destinatario,
    subject: 'Verifica tu cuenta',
    html: `
      <h3>¡Gracias por registrarte en Chispas Tienda!</h3>
      <p>Haz clic en el siguiente enlace para verificar tu cuenta:</p>
      <a href="${linkVerificacion}">${linkVerificacion}</a>
    `,
  };

  await transporter.sendMail(mailOptions);
};