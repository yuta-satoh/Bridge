import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { GetServerSideProps } from 'next';
import useSWR from 'swr';
import { type } from 'os';
import hModule from '../../styles/history.module.css';
import urStyles from '../../styles/userRegister.module.css';
import { useRouter } from 'next/router';
import { useState } from 'react';

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

export default function History({
  cookie,
}: {
  cookie: string | undefined;
}) {
  const router = useRouter();
  const [order, setOrder] = useState('id.desc');

  const userId = Number(cookie);
  const fetcher = (url: string) =>
    fetch(url).then((res) => res.json());
  const { data, error } = useSWR<Item[], Error>(
    `/api/order_histories?user_id=eq.${userId}&order=${order}`,
    fetcher
  );
  if (error) return <p>エラー</p>;
  if (!data) return <p>ロード中...</p>;

  function handlePathTransition(item: Item) {
    router.push({
      pathname: '/account/review',
      query: { id: item.id },
    });
  }
    
  function selectOrder(e: React.ChangeEvent<HTMLSelectElement>) {
    setOrder(e.target.value);
  }

  return (
    <>
      <Head>
        <title>購入履歴</title>
      </Head>
      {data.length !== 0 ? (
        <div className={hModule.body}>
          <h1 className={hModule.title}>購入履歴</h1>
          <div className={hModule.historyOrder}>
            <label htmlFor="historyOrder">並び替える:</label>
            <select
              name="historyOrder"
              id="historyOrder"
              onChange={selectOrder}
            >
              <option value="id.desc">新しい順</option>
              <option value="id.asc">古い順</option>
            </select>
          </div>
          <table className={hModule.tableBody}>
            <thead>
              <tr>
                <th></th>
                <th>商品名</th>
                <th className={hModule.tableCell}>購入数</th>
                <th className={hModule.tableCell}>単価</th>
                <th className={hModule.tableCell}>小計</th>
              </tr>
            </thead>
            {data.map((item) => (
              <>
                <tbody key={item.item_id}>
                  <tr
                    key={item.item_id}
                    className={hModule.tableLine}
                  >
                    <td className={hModule.tableCellCenter}>
                      <Link
                        href={`../items/itemlist/${item.item_id}`}
                      >
                        <Image
                          src={item.imgurl}
                          alt={item.name}
                          width={100}
                          height={100}
                          className={hModule.cardImage}
                        />
                      </Link>
                    </td>
                    <td className={hModule.tableCellCenter}>
                      <Link
                        href={`../items/itemlist/${item.item_id}`}
                      >
                        {item.name}
                      </Link>
                    </td>
                    <td className={hModule.tableCell}>
                      {item.quantity}個
                    </td>
                    <td className={hModule.tableCell}>
                      ¥ {(item.price * 1.1).toLocaleString()}
                    </td>
                    <td className={hModule.tableCell}>
                      ¥ {(item.quantity * (item.price * 1.1)).toLocaleString()}
                    </td>
                    <td className={hModule.tableCellCenter}>
                      <button
                        type="button"
                        className={hModule.buttonStyle}
                        onClick={() => handlePathTransition(item)}
                      >
                        レビューする
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={5}></td>
                    <td className={hModule.tableCellCenterSub}>
                      購入日：{item.date}
                    </td>
                  </tr>
                </tbody>
              </>
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
