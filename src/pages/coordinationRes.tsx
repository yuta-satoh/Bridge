import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import cModule from '../styles/coordination.module.css';
import Generator from '@/components/Generator';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { type } from 'os';
import { journal } from '../lib/generatorFn';
import { shuffleItems } from '../lib/generatorFn';
import { createList } from '../lib/generatorFn';
import { setURL } from '../lib/generatorFn';
import Router from 'next/router';

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
type Request = {
  request: {
    id: number;
    name: string;
    description: string;
    genre: string;
    category: string;
    price: number;
    imgurl: string;
    stock: number;
    delete: boolean;
  }[];
};
type item = {
  id: number;
  name: string;
  genre: string;
  category: string;
  price: number;
  imgurl: string;
}[];

export default function coordination({ request }: Request) {
  const loupe = '/images/icon/loupe.png';
  const curtain: item = [];
  const light: item = [];
  const chair: item = [];
  const chest: item = [];
  const table: item = [];
  const rug: item = [];
  const bed: item = [];
  const sofa: item = [];
  const accessory: item = [];
  const list: item = [];
  const url = '/images/accessory/accessory_nordic_3.jpeg';
  const urlData = {
    curtain: url,
    light: url,
    chair: url,
    chest: url,
    table: url,
    rug: url,
    bed: url,
    sofa: url,
    accessory: url,
  };

  const theme = Cookies.get('genre');
  journal(
    { request },
    curtain,
    light,
    chair,
    chest,
    table,
    rug,
    bed,
    sofa,
    accessory
  );
  createList(
    list,
    curtain,
    light,
    chair,
    chest,
    table,
    rug,
    bed,
    sofa,
    accessory
  );
  const listItem = list[0];
  setURL(urlData, list, listItem);
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const theme = Cookies.get('genre');
    Router.push({ query: { name: theme } });
  };

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
            <li className={cModule.pageLink}>
              <Link href="/coordination">ジェネレーター</Link>
              <span className={cModule.greaterThan}>&gt;</span>
            </li>
            <li className={cModule.pageLink}>{theme}</li>
          </ol>
          <div className={cModule.titleItems}>
            <h1 className={cModule.title}>
              コーディネートジェネレーター
            </h1>
            <form
              action=""
              onSubmit={handleSubmit}
              className={cModule.resForm}
            >
              <p className={cModule.selectResTheme}>
                選択テーマ：{theme}
              </p>
              <div className={cModule.button}>
                <button className={cModule.buttonStyle}>
                  再生成する
                </button>
              </div>
            </form>
            <div className={cModule.button}>
              <Link href="/coordination">
                <button className={cModule.backButtonStyle}>
                  テーマ選択
                </button>
              </Link>
            </div>
          </div>
          <Generator list={list} urlData={urlData} />
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