import lstyles from '../../../styles/itemList.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { GetServerSideProps } from 'next';
import { ChangeEvent, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

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

type Order = {
  genres: string | string[];
  categories: string | string[];
  input: string;
  order: string;
  page: string;
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
}) => {
  if (query.genre === undefined || query.category === undefined) {
    return {
      props: {},
    };
  }
  const genre = query.genre;
  const category = query.category;
  const input = query.input;
  const order = query.order;
  const page = query.page;

  // ジャンルとカテゴリを/api/searchに渡す
  const response = await fetch(
    `http://localhost:3000/api/search?genre=${genre}&category=${category}&input=${input}&order=${order}`
  );
  const data: Item[] = await response.json();

  // ページ数表示用にページの最大数を確認
  const maxPage =
    data.length % 18 === 0
      ? data.length / 18
      : Math.floor(data.length / 18) + 1;

  const filter = data.slice(
    Number(page) * 18,
    Number(page) * 18 + 18
  );

  // propsにはページ内で使用予定のものを渡す
  return {
    props: {
      filter,
      maxPage: String(maxPage),
      nowOrder: {
        genres: genre,
        categories: category,
        input: typeof input !== 'string' ? '' : input,
        order: typeof order !== 'string' ? 'new' : order,
        page: typeof page !== 'string' ? '0' : page,
      },
    },
  };
};

export default function Search({
  filter,
  maxPage,
  nowOrder,
}: {
  filter: Item[];
  maxPage: string;
  nowOrder: Order;
}) {
  const router = useRouter();
  const [order, setOrder] = useState(nowOrder.order);

  const pageArr = Array(Number(maxPage))
    .fill(0)
    .map((num, index) => index);

  const handleClick = () => {
    // onClick時にorderの値を変更してリダイレクト
    // なぜかonChangeではリダイレクトできなかった
    router.push({
      query: {
        genre: nowOrder.genres,
        category: nowOrder.categories,
        input: nowOrder.input,
        order: order,
        page: '0',
      },
    });
  };

  const handleClickPaging = (page: string) => {
    router.push({
      query: {
        genre: nowOrder.genres,
        category: nowOrder.categories,
        input: nowOrder.input,
        order: order,
        page: page,
      },
    });
  };

  if (!filter || filter.length === 0) {
    return <div>検索結果がありません</div>;
  }

  return (
    <>
      <Head>
        <title>商品検索</title>
      </Head>
      <div className={lstyles.main}>
        {/* パンくずリスト */}
      <div className={lstyles.Breadcrumb}>
        <nav>
          <ol>
            <li className={lstyles.breadlist}>
              <Link href="/">TOPページ</Link>
            </li>
            <li className={lstyles.breadlist}>
              <Link href="/items/itemlist">商品一覧ページ</Link>
            </li>

            {/* ジャンル絞り込み */}
            <li className={lstyles.breadlist}>
              {nowOrder.input === '' ? (
                <Link
                  href={`/items/itemlist/search?genre=${nowOrder.genres}&category=椅子&category=テーブル&category=カーテン&category=照明&category=カーペット%2Fラグ&category=ソファ&category=収納棚&category=ベッド%2F寝具&category=小物%2F雑貨&input=&order=id.desc&page=0`}
                >
                  {nowOrder.genres}
                </Link>
              ) : (
                <>{nowOrder.input}</>
              )}
            </li>
            {/* ジャンルとカテゴリ絞り込み */}
            <li className={lstyles.breadlist}>
              {nowOrder.input === '' ? (
                <Link
                  href={`/items/itemlist/search?genre=${nowOrder.genres}&category=${nowOrder.categories}&input=&order=id.desc&page=0`}
                >
                  {nowOrder.categories}
                </Link>
              ) : (
                ''
              )}
            </li>
          </ol>
        </nav>
      </div>
      <div className="text-right w-full">
        <label htmlFor="itemOrder">表示順：</label>
        <select
          name="itemOrder"
          id="itemOrder"
          className="mx-2 border rounded border-gray-500"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
        >
          <option value="id.desc">新着順</option>
          <option value="price.asc">安い順</option>
          <option value="price.desc">高い順</option>
        </select>
        <button
          type="button"
          className="mr-5 px-2 border rounded border-gray-500"
          onClick={handleClick}
        >
          並び替える
        </button>
      </div>

      <div className={lstyles.list_outer}>
        {filter.map((fil: Item) => {
          return (
            <div key={fil.id}>
              <Link href={`/items/itemlist/${fil.id}`}>
                <div className={lstyles.image}>
                  <Image
                    src={fil.imgurl}
                    alt={fil.name}
                    width={280}
                    height={250}
                  />
                </div>
                <div className={lstyles.detail}>
                  <p className={lstyles.itemname}>{fil.name}</p>
                  <p>¥ {(fil.price * 1.1).toLocaleString()}</p>
                  <p>{fil.description}</p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      {/* ページング用 */}
      <div>
        <ul>
          {pageArr.map((num) => (
            <li key={`page_${num}`}>
              <button
                type="button"
                onClick={() => handleClickPaging(String(num))}
              >
                {num + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
      </div>
    </>
  );
}
