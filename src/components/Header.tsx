import Image from 'next/image';
import Link from 'next/link';
import headModule from '../styles/header.module.css';
import Cookies from 'js-cookie';
import { GetServerSideProps } from 'next';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/router';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {},
  };
};

export default function Header({auth}:{auth:boolean|undefined}) {
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

  const handleChange = (ev:ChangeEvent<HTMLInputElement>) => {
    const value = ev.target.value;
    setInput(value);
  }

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault();

    if (!input) {
      return
    }
    
    // ジャンルやカテゴリが空の時は全要素をクエリに渡す
    router.push({
      pathname: '/items/itemlist/search',
      query: { genre: genreDatas, category: categoryDatas, input: input },
    });
  }

  return (
    <header
      className={`${headModule.body} h-28 w-screen bg-orange-900`}
    >
      <div
        className={`${headModule.menu} flex items-center justify-center h-20 w-screen bg-white absolute top-8`}
      >
        <Link href={'/'}>
          <div>
            <Image
              src="/images/logo/header_logo.png"
              alt="bridge-logo"
              width={150}
              height={80}
            />
          </div>
        </Link>
        <ul className="flex gap-10 mr-60 ml-30 whitespace-nowrap">
          <li>商品</li>
          <li>お知らせ</li>
          <li>ヘルプ</li>
        </ul>
        <div className="flex gap-10">
          <form className={headModule.form} onSubmit={handleSubmit} >
            <input
              className="h-8 border border-neutral-500 rounded-l pl-2.5"
              type="text"
              placeholder="何をお探しですか？"
              value={input}
              onChange={handleChange}
            />
            <button
              className="h-8 text-white bg-neutral-900 border border-neutral-900 rounded-r px-1"
              type="submit"
            >
              検索
            </button>
          </form>
          {auth ? (
            <Link href={'/mypage'} className={headModule.iconModule}>
              <Image
                src="/images/icon/login.png"
                alt=""
                width={25}
                height={25}
              />
              <div>
                <span
                  className={`${headModule.menuLabel} inline-block mt-1`}
                >
                  マイページ
                </span>
              </div>
            </Link>
          ) : (
            <Link href={'/login'} className={headModule.iconModule}>
              <Image
                src="/images/icon/login.png"
                alt=""
                width={25}
                height={25}
              />
              <div>
                <span
                  className={`${headModule.menuLabel} inline-block mt-1 whitespace-nowrap`}
                >
                  ログイン
                </span>
              </div>
            </Link>
          )}
          <Link href={'/cart'} className={headModule.iconModule}>
            <Image
              src="/images/icon/cart.png"
              alt=""
              width={25}
              height={25}
            />
            <span
              className={`${headModule.menuLabel} inline-block mt-1 whitespace-nowrap`}
            >
              カート
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
