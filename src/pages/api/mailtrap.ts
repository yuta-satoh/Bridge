import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { use } from 'react';

type User = {
  lastname: string;
  firstname: string;
  gender: string;
  tell: string;
  email: string;
  zipcode: string;
  address: string;
  password: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user: User = req.body;

//   console.log(user)

  const mailData = {
    from: '”Bridge”<no-reply@bridge-mailTest.com>',
    to: `${user.email}`,
    subject: `ご購入ありがとうございます`,
    text: `${user.lastname} 様 ご購入ありがとうございます!`,
    html: ``,
  };

  const transport = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });

  transport.sendMail(mailData, (error,info) => {
    if (error) console.log(error);
    console.log(`Message sent: ${info.messageId}`);
  });

  res.status(200);
}
