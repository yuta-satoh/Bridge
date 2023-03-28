import Image from 'next/image';
import Link from 'next/link';
import headModule from '../styles/header.module.css';
import Cookies from 'js-cookie';
import { GetServerSideProps } from 'next';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import UserCart from './CartForUser';
import GuestCart from './CartForGuest';
import InputSuggest from './utils/InputSuggest';
import { useWindowSize } from '@/lib/useWindowSize';

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

export default function Header({
  auth,
}: {
  auth: boolean | undefined;
}) {
  const windowSize = useWindowSize()
  const router = useRouter();
  const [input, setInput] = useState('');

  const categoryDatas = [
    '椅子',
    'テーブル',
    'カーテン',
    '照明',
    'カーペット/ラグ',
    'ソファ',
    '収納棚',
    'ベッド/寝具',
    '小物/雑貨',
  ];
  const genreDatas = [
    '北欧風',
    'ナチュラル',
    '和モダン',
    'フェミニン',
  ];

  // const userId = Cookies.get('id');
  // const fetcher = (url: string) =>
  //   fetch(url).then((res) => res.json());

  // const { data, error }: { data: cart; error: any } = useSWR(
  //   `/api/cart_items?select=*,items(*),carts(*)&cart_id=eq.${userId}`,
  //   fetcher,
  //   { refreshInterval: 0.1 }
  // );
  // if (error) return <p>エラー</p>;
  // if (!data) return <p>ロード中...</p>;

  // const total = data.reduce(function (sum, element) {
  //   return sum + element.quantity;
  // }, 0);

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const value = ev.target.value;
    setInput(value);
  };

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault();

    // if (!input) {
    //   return;
    // }

    // // ジャンルやカテゴリが空の時は全要素をクエリに渡す
    // router.push({
    //   pathname: '/items/itemlist/search',
    //   query: {
    //     genre: genreDatas,
    //     category: categoryDatas,
    //     input: input,
    //   },
    // });
  };
  return (
    <header
      className={`${headModule.body} h-28 w-full`}
    >
      <div
        className={`${headModule.menu} flex items-center justify-center h-20 w-screen bg-white absolute top-8`}
      >
        <Link href={'/'}>
          <div>
            <Image
              className={headModule.titleiconimg}
              src="/images/logo/header_logo.png"
              alt="bridge-logo"
              width={150}
              height={80}
            />
          </div>
        </Link>
        <ul className={`${headModule.left} flex gap-10 mr-60 ml-30 whitespace-nowrap`}>
          <li className='text-base'>
            <Link href="/items/itemlist">商品</Link>
          </li>
          <li>
            <Link href="/#remind" className={headModule.toRemind}>
              お知らせ
            </Link>
          </li>
          { windowSize.width >= 600 ? <li>ヘルプ</li> : <></> }
        </ul>
        <div className={`${headModule.right} flex gap-10`}>
          <form className={headModule.form} onSubmit={handleSubmit}>
            <InputSuggest
              value={input}
              onChange={handleChange}
              onClick={(value) => setInput(value)}
            />
            {/* <input
              className={`${headModule.formtitle} h-8 border border-neutral-500 rounded-l pl-2.5`}
              type="text"
              placeholder="何をお探しですか？"
              value={input}
              onChange={handleChange}
            /> */}
            <Link
              href={`/items/itemlist/search?genre=北欧風&genre=ナチュラル&genre=和モダン&genre=フェミニン&category=椅子&category=テーブル&category=カーテン&category=照明&category=カーペット%2Fラグ&category=ソファ&category=収納棚&category=ベッド%2F寝具&category=小物%2F雑貨&input=${input}&order=id.desc&page=0`}
            >
              <button
                className={`${headModule.searchs} h-6 sp:h-8 text-white bg-neutral-900 border border-neutral-900 rounded-r px-1`}
                type="submit"
              >
                <span className={headModule.search}>検索</span>
              </button>
            </Link>
          </form>
          {auth ? (
            <Link href={'/mypage'} className={headModule.iconModule}>
              <Image
                className={headModule.iconimg}
                src="/images/icon/login.png"
                alt=""
                width={25}
                height={25}
              />
              <div>
                <span
                  className={`${headModule.menuLabel} inline-block pt-1`}
                >
                  マイページ
                </span>
              </div>
            </Link>
          ) : (
            <Link href={'/login'} className={headModule.iconModule}>
              <Image
                className={headModule.iconimg}
                src="/images/icon/login.png"
                alt=""
                width={25}
                height={25}
              />
              <div>
                <span
                  className={`${headModule.menuLabel} inline-block whitespace-nowrap`}
                >
                  ログイン
                </span>
              </div>
            </Link>
          )}
          {auth ? <UserCart /> : <GuestCart />}
        </div>
      </div>
    </header>
  );
}
