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
  const email: string = req.body;

//   console.log(user)

  const mailData = {
    from: '”Bridge”<no-reply@bridge-mailTest.com>',
    to: `${email}`,
    subject: `パスワード再設定のご案内`,
    text: `${email} 様 お帰りなさい!`,
    html: `<p>${email} 様 お帰りなさい！</p>
    <a href="${process.env.NEXT_PUBLIC_URL_HEAD}/renewPass">パスワードを再設定する</a>`,
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
