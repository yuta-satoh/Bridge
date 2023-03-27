import lstyles from '../../../styles/itemList.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { GetServerSideProps } from 'next';
import { SyntheticEvent, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import SelectBox from '@/components/utils/SelectBox';

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

  	const genreQuery = typeof genre === "string"
		? `genre.eq.${genre}`
		: genre
			.reduce((current, query) => current + `,genre.eq.${query}`, '')
			.replace(',', '')
	const categoryQuery = typeof category === "string"
  		? `category.eq.${category}`
  		: category
			.reduce((current, query) => current + `,category.eq.${query}`, '')
			.replace(',', '');

	const inputTranslate = (input: string | string[] | undefined) => {
		if (typeof input === "string") {
			if (input.length === 0) {
				return ""
			} else {
				const inputQuery = input
					.split(/\s+/)
					.reduce((current, query) => current + `&or=(name.like.*${query}*,genre.like.*${query}*,description.like.*${query}*,category.like.*${query}*)`, '')
				return inputQuery
			}
		} else {
			return ""
		}
	}
	const inputQuery = inputTranslate(input)
	const orderQuery = `&order=${order}`

  // ジャンルとカテゴリを/api/searchに渡す
  	const response = await fetch(
	`${process.env.SUPABASE_URL}/items?or=(${genreQuery})&or=(${categoryQuery})${inputQuery}${orderQuery}`, {
		method: "GET",
		headers: {
			"apikey": `${process.env.SUPABASE_API_KEY}`,
			"Authorization": `Bearer ${process.env.SUPABASE_API_KEY}`,
			"Content-Type": "application/json",
		}
	});
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

  const handleChange = async (ev: SyntheticEvent<HTMLSelectElement>) => {
    setOrder(ev.currentTarget.value)
    await router.push({
      query: {
        genre: nowOrder.genres,
        category: nowOrder.categories,
        input: nowOrder.input,
        order: orderChange(ev.currentTarget.value),
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
        order: orderChange(order),
        page: page,
      },
    });
  };

  const orderChange = (order: string) => {
    if (order === "新着順") {
      return "id.desc"
    } else if (order === "安い順") {
      return "price.asc"
    } else if (order === "高い順") {
      return "price.desc"
    } else {
      return "id.desc"
    }
  }

  if (!filter || filter.length === 0) {
    return (
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
              <li className={lstyles.breadlist}>検索結果</li>
            </ol>
          </nav>
        </div>
        <div className={lstyles.result_none}>
          <p>検索結果がありません</p>
          <Link href="/items/itemlist">商品一覧に戻る</Link>
        </div>
      </div>
    );
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
              <li className={lstyles.breadlist}>検索結果</li>
            </ol>
          </nav>
        </div>
        <div className="text-right w-full">
          <label htmlFor="itemOrder">表示順：</label>
          <SelectBox
            arr={[ "新着順", "安い順", "高い順" ]}
            name="itemOrder"
            id='itemOrder'
            value={order}
            onChange={(ev) => handleChange(ev)}
          />
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
                      fill
                    />
                  </div>
                  <div className={lstyles.detail}>
                    <p className={lstyles.itemname}>{fil.name}</p>
                    <p>¥ {(fil.price * 1.1).toLocaleString()}</p>
                    <p className={lstyles.itemdescription}>{fil.description}</p>
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
                  num === Number(nowOrder.page)
                    ? lstyles.currentPage
                    : lstyles.page
                }
              >
                <button
                  className={lstyles.button}
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
