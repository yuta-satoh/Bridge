import pModule from '../styles/purchase.module.css';
import { GetServerSideProps } from 'next';
import useSWR from 'swr';
import Head from 'next/head';
import { type } from 'os';
import { useState } from 'react';
import { procedure } from '@/lib/purchaseFn';
import Link from 'next/link';
import urStyles from '../styles/userRegister.module.css';
import { useRouter } from 'next/router';
import Auth from './auth/auth';

type items = {
  id: number;
  name: string;
  description: string;
  genre: string;
  category: string;
  price: number;
  imgurl: string;
  stock: number;
  delete: boolean;
};
type cart = {
  id: number;
  item_id: number;
  items: items;
  cart_id: number;
  date: string;
  quantity: number;
  delete: boolean;
}[];
type User = {
  lastName: string;
  firstName: string;
  gender: string;
  tell1: string;
  tell2: string;
  tell3: string;
  email: string;
  zipcode1: string;
  zipcode2: string;
  address: string;
  password: string;
  confirmationPassword: string;
}[];
type price = {
  id: number;
  name: string;
  price: number;
}[];

export const getServerSideProps: GetServerSideProps = async (
  context
) => {
  const cookie = context.req.cookies['id'];
  if (cookie === undefined) {
    const user = null
    const cookie = null
    return {
      props: { cookie, user },
    };
  }
  const TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYXBpX3VzZXIifQ.OOP7yE5O_2aYFQG4bgMBQ9r0f9sikNqXbhJqoS9doTw';
  const user = await fetch(
    `http://127.0.0.1:8000/users?id=eq.${cookie}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
  return {
    props: { cookie, user },
  };
};

export default function purchase({
  cookie,
  user,
}: {
  cookie: string | null;
  user: User;
}) {
  const price: price = [];
  const userId = Number(cookie);
  const fetcher = (url: string) =>
    fetch(url).then((res) => res.json());

  const { data, error }: { data: cart; error: any } = useSWR(
    `/api/cart_items?select=*,items(*),carts(*)&cart_id=eq.${userId}`,
    fetcher
  );
  if (error) return <p>エラー</p>;
  if (!data) return <p>ロード中...</p>;
  if (data.length === 0) {
    location.href = ('/cart');
  }
  data.map((item) => {
    price.push({
      id: item.item_id,
      name: item.items.name,
      price: item.items.price * item.quantity,
    });
  });
  const total = price.reduce(function (sum, element) {
    return sum + element.price;
  }, 0);
  const tax = total * 0.1;
  return (
    <>
      <Head>
        <title>購入確認</title>
      </Head>
      <Auth>
      <div className={pModule.body}>
        <h1 className={pModule.title}>購入確認</h1>
        <table className={pModule.itemTable}>
          <tbody>
            <tr className={pModule.tableTLine}>
              <th className={pModule.nameTag}>品名</th>
              <th className={pModule.nameTag}></th>
              <th className={pModule.item}>個数</th>
              <th className={pModule.itemTag}>単価</th>
              <th className={pModule.itemTag}>小計</th>
            </tr>
            {data.map((item) => (
              <tr key={item.item_id} className={pModule.tableLine}>
                <td className={pModule.itemName}>
                  {item.items.name}
                </td>
                <td className={pModule.itemName}>
                  {item.items.imgurl}
                </td>
                <td className={pModule.item}>{item.quantity}</td>
                <td className={pModule.item}>
                  ¥ {item.items.price.toLocaleString()}
                </td>
                <td className={pModule.item}>
                  ¥{' '}
                  {(
                    item.quantity * item.items.price
                  ).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
          <tbody>
            <tr className={pModule.content}>
              <td colSpan={2}></td>
              <td className={pModule.subTTotal}>本体合計</td>
              <td className={pModule.topText}>
                ¥&nbsp;{total.toLocaleString()}
              </td>
            </tr>
            <tr className={pModule.content}>
              <td colSpan={2}></td>
              <td className={pModule.subTotal}>消費税</td>
              <td className={pModule.text}>
                ¥&nbsp;{tax.toLocaleString()}
              </td>
            </tr>
            <tr className={pModule.totalContent}>
              <td colSpan={2}></td>
              <td className={pModule.total}>合計</td>
              <td className={pModule.total}>
                ¥&nbsp;{(total + tax).toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
        <div className={pModule.addressArea}>
          <p className={pModule.total}>お届け先住所</p>
          <p>{user[0].address}</p>
        </div>
        <div className={pModule.buttonArea}>
          <button
            type="button"
            onClick={() => procedure(data)}
            className={pModule.buttonStyle}
          >
            購入する
          </button>
        </div>
        <div className={urStyles.loginLink}>
          <Link href="/cart">
            <button type="button" className={urStyles.linkButton}>
              カートに戻る
              <span className={urStyles.buttonSpan}>→</span>
            </button>
          </Link>
        </div>
      </div>
      </Auth>
    </>
  );
}
