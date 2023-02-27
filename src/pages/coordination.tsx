import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import cModule from '../styles/coordination.module.css';
import Generator from '@/components/Generator';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { type } from 'os';

export async function getServerSideProps(context: any) {
  const theme = context.query.name;
  const TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYXBpX3VzZXIifQ.OOP7yE5O_2aYFQG4bgMBQ9r0f9sikNqXbhJqoS9doTw';
  const request = await fetch(
    `http://127.0.0.1:8000/items?genre=eq.${theme}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
  return {
    props: { request },
  };
}

type request = {
  request:{
    id: number;
    name:string;
    description:string;
    genre:string;
    category:string;
    price:number;
    imgurl:string;
    stock:number;
    delete:boolean;
  }
}

export default function coordination({ request }: request) {
  const [theme, setTheme] = useState('');
  const [send, setSend] = useState('');
  const router = useRouter();
  const loupe = '/images/icon/loupe.png';
  function selectTheme(e: React.ChangeEvent<HTMLSelectElement>) {
    setTheme(e.target.value);
  }
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    router.push({ pathname: '', query: { name: theme } });
    setSend(theme);
  };
  console.log(request);
  return (
    <>
      <Head>
        <title>コーディネートジェネレーター</title>
      </Head>
      <div className={cModule.body}>
        <main>
          <ol className={cModule.links} id="top">
            <li className={cModule.pageLink}>
              <Link href="/">Bridge</Link>
              <span className={cModule.greaterThan}>&gt;</span>
            </li>
            <li className={cModule.pageLink}>ジェネレーター</li>
          </ol>
          <div className={cModule.titleItems}>
            <h1 className={cModule.title}>
              コーディネートジェネレーター
            </h1>
            <form action="" onSubmit={handleSubmit}>
              <div className={cModule.selectTheme}>
                <label htmlFor="select" className={cModule.theme}>
                  テーマ選択：
                </label>
                <select
                  id="select"
                  name="example"
                  className={cModule.select}
                  onChange={selectTheme}
                >
                  <option value="">選択する</option>
                  <option value="ナチュラル">ナチュラル</option>
                  <option value="北欧風">北欧風</option>
                  <option value="フェミニン">フェミニン</option>
                  <option value="和モダン">和モダン</option>
                </select>
              </div>
              <div className={cModule.button}>
                <button className={cModule.buttonStyle}>
                  生成する
                </button>
              </div>
            </form>
          </div>
          <Generator send={send}/>
          <div className={cModule.linkItems}>
            <Link href="#top">
              <button type="button" className={cModule.linkButton}>
                トップへ<span className={cModule.buttonSpan}>↑</span>
              </button>
            </Link>
            <div className={cModule.categoriesItems}>
              <p className={cModule.subTitle}>
                関連カテゴリの商品を見る
              </p>
              <div className={cModule.categoriesList}>
                <Link href="/api/items?category=eq.table">
                  <div className={cModule.categories}>
                    <Image
                      src={loupe}
                      width={23}
                      height={10}
                      alt=""
                    />
                    <p>&emsp;テーブル&emsp;</p>
                  </div>
                </Link>
                <Link href="/api/items?category=eq.chair">
                  <div className={cModule.categories}>
                    <Image
                      src={loupe}
                      width={23}
                      height={10}
                      alt=""
                    />
                    <p>&emsp;椅子&emsp;</p>
                  </div>
                </Link>
                <Link href="/api/items?category=eq.sofa">
                  <div className={cModule.categories}>
                    <Image
                      src={loupe}
                      width={23}
                      height={10}
                      alt=""
                    />
                    <p>&emsp;ソファ&emsp;</p>
                  </div>
                </Link>
                <Link href="/api/items?category=eq.bed">
                  <div className={cModule.categories}>
                    <Image
                      src={loupe}
                      width={23}
                      height={10}
                      alt=""
                    />
                    <p>&emsp;ベッド&emsp;</p>
                  </div>
                </Link>
                <Link href="/api/items?category=eq.chest">
                  <div className={cModule.categories}>
                    <Image
                      src={loupe}
                      width={23}
                      height={10}
                      alt=""
                    />
                    <p>&emsp;収納棚&emsp;</p>
                  </div>
                </Link>
              </div>
              <div className={cModule.categoriesList}>
                <Link href="/api/items?category=eq.rug">
                  <div className={cModule.categories}>
                    <Image
                      src={loupe}
                      width={23}
                      height={10}
                      alt=""
                    />
                    <p>&emsp;ラグ&emsp;</p>
                  </div>
                </Link>
                <Link href="/api/items?category=eq.light">
                  <div className={cModule.categories}>
                    <Image
                      src={loupe}
                      width={23}
                      height={10}
                      alt=""
                    />
                    <p>&emsp;照明&emsp;</p>
                  </div>
                </Link>
                <Link href="/api/items?category=eq.curtain">
                  <div className={cModule.categories}>
                    <Image
                      src={loupe}
                      width={23}
                      height={10}
                      alt=""
                    />
                    <p>&emsp;カーテン&emsp;</p>
                  </div>
                </Link>
                <Link href="/api/items?category=eq.accessory">
                  <div className={cModule.categories}>
                    <Image
                      src={loupe}
                      width={23}
                      height={10}
                      alt=""
                    />
                    <p>&emsp;インテリア雑貨&emsp;</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
