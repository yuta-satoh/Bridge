import Image from 'next/image';
import Link from 'next/link';
import lstyles from '../styles/itemList.module.css';
import useSWR, { Fetcher } from 'swr';
import { SyntheticEvent, useState } from 'react';
import Stars from './Stars';
import SelectBox from './utils/SelectBox';
import Loading from './utils/Loading';

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
  const [order, setOrder] = useState('新着順');
  const [orderQuery, setOrderQuery] = useState('?order=id.desc');
  const [page, setPage] = useState(0);

  const fetcher: Fetcher<Item[], string> = (resource) =>
    fetch(resource).then((res) => res.json());

  const { data, error, mutate } = useSWR(
    `/api/items${orderQuery}`,
    fetcher
  );
  if (error) return <p>エラー</p>;
  // ロード中のcss入れたい・画面中央に表示したい
  if (!data) return <Loading height={400} />;

  // ページ数の確認
  const pageAmount =
    data.length % 18 === 0
      ? data.length / 18
      : Math.floor(data.length / 18) + 1;

  // ページ数の配列
  const pageArr = Array(pageAmount)
    .fill(0)
    .map((num, index) => index);

  // データの成形
  const pagingData = data.slice(page * 18, page * 18 + 18);

  // セレクトボックスのChangeEvent
  const handleChange = (ev: SyntheticEvent<HTMLSelectElement>) => {
    const value = ev.currentTarget.value;
    if (value === '新着順') {
      setOrder(value);
      setOrderQuery('?order=id.desc');
      mutate(data);
    } else if (value === '安い順') {
      setOrder(value);
      setOrderQuery('?order=price.asc');
      mutate(data);
    } else if (value === '高い順') {
      setOrder(value);
      setOrderQuery('?order=price.desc');
      mutate(data);
    } else {
      setOrder(value);
      setOrderQuery('?order=id.desc');
      mutate(data);
    }
  };

  return (
    <>
      {/* ソート用 */}
      <div className="text-right w-full">
        <label htmlFor="itemOrder" className={lstyles.itemOrder}>表示順：</label>
        <SelectBox
          arr={['新着順', '安い順', '高い順']}
          name="itemOrder"
          id="itemOrder"
          value={order}
          onChange={(ev) => handleChange(ev)}
        />
        {/* <select
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
        </select> */}
      </div>
      <div className={lstyles.list_outer}>
        {pagingData.map((item: Item) => {
          return (
            <div key={item.id} className={lstyles.item}>
              <Link href={`/items/itemlist/${item.id}`}>
                <div className={lstyles.image}>
                  <Image
                    className={lstyles.images}
                    src={item.imgurl}
                    alt={item.name}
                    fill
                  />
                </div>
                <div className={lstyles.detail}>
                  <p className={lstyles.itemname}>{item.name}</p>
                  <Stars itemId={item.id} />
                  <p className={lstyles.itemprice}>¥ {(item.price * 1.1).toLocaleString()}</p>
                  <p className={lstyles.itemdescription}>{item.description}</p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      {/* ページング用 */}
      <div className={lstyles.paging}>
        <ul className={lstyles.pages}>
          {pageArr.map((num) => (
            <li
              key={`page_${num}`}
              className={
                num === page ? lstyles.currentPage : lstyles.page
              }
            >
              <button
                className={lstyles.button}
                type="button"
                onClick={() => {
                  setPage(num);
                  window.scroll({ top: 0 });
                }}
              >
                {num + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
