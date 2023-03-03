import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { GetServerSideProps } from 'next';
import useSWR from 'swr';
import { type } from 'os';
import hModule from '../../styles/history.module.css';
import urStyles from '../../styles/userRegister.module.css';

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
  console.log(data);
  return (
    <>
      <Head>
        <title>購入履歴</title>
      </Head>
      {data.length !== 0 ? (
        <div className={hModule.body}>
          <h1 className={hModule.title}>購入履歴</h1>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>商品名</th>
                <th>購入数</th>
                <th>単価</th>
                <th>小計</th>
              </tr>
            </tbody>
            {data.map((item: Item) => (
              <tbody>
                <tr key={item.item_id} className={hModule.card}>
                  <td>
                    <Link href={`../items/itemlist/${item.item_id}`}>
                      <Image
                        src={item.imgurl}
                        alt={item.name}
                        width={50}
                        height={50}
                        className={hModule.cardImage}
                      />
                    </Link>
                  </td>
                  <Link href={`../items/itemlist/${item.item_id}`}>
                    <td>{item.name}</td>
                  </Link>
                  <td>{item.quantity}個</td>
                  <td>
                    ¥ {(item.quantity * item.price).toLocaleString()}
                  </td>
                  <td>
                    ¥ {(item.quantity * item.price).toLocaleString()}
                  </td>
                  <td>
                    <button type='button'>レビューする</button>
                  </td>
                </tr>
                <tr>
                  <td>購入日：{item.date}</td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      ) : (
        <div className={hModule.body}>
          <h1 className={hModule.noData}>履歴はありません</h1>
          <div className={urStyles.loginLink}>
            <Link href="/mypage">
              <button type="button" className={urStyles.linkButton}>
                マイページ
                <span className={urStyles.buttonSpan}>→</span>
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
