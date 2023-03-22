/* eslint-disable react-hooks/rules-of-hooks */
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import pstyles from '../styles/purchaseComp.module.css';
import React, { useEffect, useState } from 'react';
import Auth from './auth/auth';

export default function purchaseComp() {
  const [randomNumber, setRandomNumber] = useState('');

  useEffect(() => {
    const randomNumber = () => Math.floor(Math.random() * 1000000);
    const randomRNumber = () =>
      randomNumber().toString().padStart(6, '0');
    setRandomNumber(randomRNumber());
  }, []);

  return (
    <>
      <Head>
        <title>購入完了</title>
      </Head>
      <main className={pstyles.main}>
        <div className={pstyles.img}>
          <Image
            src="/purchase3.jpeg"
            alt="購入完了"
            width={650}
            height={400}
          />
        </div>

        <div className={pstyles.order}>
          <ul className={pstyles.order_number}>
            <li>お客様のご注文番号</li>
            <li className={pstyles.order_num}>{randomNumber}</li>
          </ul>

          <ul className={pstyles.order_details}>
            <li>ご注文ありがとうございます。</li>
            <li>
              明細メールをご登録メールアドレスにお送りしましたのでご確認ください。
            </li>
          </ul>
        </div>

        <div className={pstyles.order_toplink}>
          <Link href="/">TOPページへ →</Link>
        </div>
      </main>
    </>
  );
}
