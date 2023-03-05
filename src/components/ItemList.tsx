import Image from 'next/image';
import Link from 'next/link';
import lstyles from '../styles/itemList.module.css';
import useSWR from 'swr';
import { useState } from 'react';

type Item = {
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

// 商品一覧用：商品カテゴリとジャンル問わず取得関数
export default function ItemList(): JSX.Element {
  // ソート用のstateを管理、onChangeで変更、mutateで再取得
  const [order, setOrder] = useState("?order=id.desc")

  const fetcher = (resource: string) =>
    fetch(resource).then((res) => res.json());

  const { data, error, mutate } = useSWR(`/api/items${order}`, fetcher);
  if (error) return <p>エラー</p>;
  // ロード中のcss入れたい・画面中央に表示したい
  if (!data) return <p>ロード中...</p>;

  return (
    <>
      {/* ソート用 */}
      <div className='text-right w-full'>
        <label htmlFor="itemOrder">表示順：</label>
        <select
          name="itemOrder"
          id="itemOrder"
          value={order}
          onChange={
            (e) => {
              setOrder(e.target.value)
              mutate(data)
            }
          } >
          <option value="?order=id.desc">新着順</option>
          <option value="?order=price.asc">安い順</option>
          <option value="?order=price.desc">高い順</option>
        </select>
      </div>
      <div className={lstyles.list_outer}>
        {data.map((item: Item) => {
          return (
            <div key={item.id}>
              <Link href={`/items/itemlist/${item.id}`}>
                <div className={lstyles.image}>
                  <Image
                    src={item.imgurl}
                    alt={item.name}
                    width={280}
                    height={250}
                  />
                </div>
                <div className={lstyles.detail}>
                  <p className={lstyles.itemname}>{item.name}</p>
                  <p>{item.price}円</p>
                  <p>{item.description}</p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
