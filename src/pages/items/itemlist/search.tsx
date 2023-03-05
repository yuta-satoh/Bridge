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
  genres: string | string[],
  categories: string | string[],
  input: string,
  order: string,
}

export const getServerSideProps:GetServerSideProps = async ({query}) => {
  if (query.genre === undefined || query.category === undefined) {
    return {
      props: {}
    }
  }
  const genre = query.genre;
  const category = query.category;
  const input = query.input;
  const order = query.order;

  // ジャンルとカテゴリを/api/searchに渡す
  const response = await fetch(`http://localhost:3000/api/search?genre=${genre}&category=${category}&input=${input}&order=${order}`)
  const filter = await response.json()

  // propsにはページ内で使用予定のものを渡す
  return {
    props: {
      filter,
      nowOrder: {
        genres: genre,
        categories: category,
        input: typeof input !== "string" ? "" : input,
        order: typeof order !== "string" ? "new" : order
      }
    }
  }
}

export default function Search({ filter, nowOrder }:{ filter:Item[], nowOrder: Order }) {
  const router = useRouter();
  const [order, setOrder] = useState(nowOrder.order);

  const handleClick = () => {
    // onClick時にorderの値を変更してリダイレクト
    // なぜかonChangeではリダイレクトできなかった
    router.push({
      query: {
        genre: nowOrder.genres,
        category: nowOrder.categories,
        input: nowOrder.input,
        order: order
      },
    });
  }

  if (!filter || filter.length === 0) {
    return <div>検索結果がありません</div>
  }

  return(
    <>
      <Head>
        <title>商品検索</title>
      </Head>
      <div className='text-right w-full'>
        <label htmlFor="itemOrder">表示順：</label>
        <select
          name="itemOrder"
          id="itemOrder"
          className='mx-2 border rounded border-gray-500'
          value={order}
          onChange={(e) => setOrder(e.target.value)}
        >
          <option value="id.desc">新着順</option>
          <option value="price.asc">安い順</option>
          <option value="price.desc">高い順</option>
        </select>
        <button
          type='button'
          className='mr-5 px-2 border rounded border-gray-500'
          onClick={handleClick}>並び替える</button>
      </div>
      <div className={lstyles.list_outer}>
        {filter.map((fil:Item) => {
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
                  <p>{fil.price}円</p>
                  <p>{fil.description}</p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
} 
