import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { GetServerSideProps } from 'next';
import useSWR from 'swr';
import { type } from 'os';
import hModule from '../../styles/history.module.css';

type Item = {
  id: number;
  item_id: number;
  user_id: number;
  name: string;
  description: string;
  genre: string;
  category: string;
  price: number;
  imgurl: string;
  date: string;
  quantity: number;
  delete: boolean;
};

export const getServerSideProps: GetServerSideProps = async (
  context
) => {
  const cookie = context.req.cookies['id'];
  return {
    props: { cookie },
  };
};

export default function history({
  cookie,
}: {
  cookie: string | undefined;
}) {
  const userId = Number(cookie);
  const fetcher = (url: string) =>
    fetch(url).then((res) => res.json());
  const { data, error } = useSWR(
    `/api/order_histories?user_id=eq.${userId}`,
    fetcher
  );
  if (error) return <p>エラー</p>;
  if (!data) return <p>ロード中...</p>;
  return (
    <>
      <Head>
        <title>購入履歴</title>
      </Head>
      <div className={hModule.body}>
        <h1 className={hModule.title}>購入履歴</h1>
        <ul>
          {data.map((item: Item) => (
            <li key={item.item_id} className={hModule.card}>
              <Image
                src={item.imgurl}
                alt={item.name}
                width={50}
                height={50}
                className={hModule.cardImage}
              />
              <div className={hModule.cardContents}>
                <p>{item.name}</p>
                <p>購入数：{item.quantity}個</p>
                <p>
                  金額：¥ {(item.quantity * item.price).toLocaleString()}
                </p>
                <p>購入日：{item.date}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
