import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import cModule from '../styles/coordination.module.css';
import Generator from '@/components/Generator';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { GetServerSideProps } from 'next';
import { journal } from '../lib/generatorFn';
import { createList } from '../lib/generatorFn';
import { setURL } from '../lib/generatorFn';
import Router from 'next/router';
import { sum } from '@/lib/generatorFn';

export const getServerSideProps: GetServerSideProps = async (
  context
) => {
  const theme = context.req.cookies['genre'];
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
  return {
    props: { list, theme },
  };
};
type list = {
  list: {
    id: number;
    name: string;
    genre: string;
    category: string;
    price: number;
    imgurl: string;
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

export default function coordination(
  { list }: list,
  { theme }: { theme: string }
) {
  const loupe = '/images/icon/loupe.png';
  function selectTheme(e: React.ChangeEvent<HTMLSelectElement>) {
    genre.genre = e.target.value;
  }
  const listItem = list[0];
  const total = sum(listItem, list);
  const genre = { genre: `${listItem.genre}` };
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    Cookies.set('genre', genre.genre);
    Router.push({pathname:""});
  };

  return (
    <>
      <Head>
        <title>{listItem.genre}</title>
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
            <li className={cModule.pageLink}>{listItem.genre}</li>
          </ol>
          <div className={cModule.titleItems}>
            <h1 className={cModule.title}>
              コーディネートジェネレーター（{listItem.genre}）
            </h1>
            <form
              action=""
              onSubmit={handleSubmit}
              className={cModule.resForm}
            >
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
                  <option value={`${listItem.genre}`}>
                    選択する
                  </option>
                  <option value="ナチュラル">ナチュラル</option>
                  <option value="北欧風">北欧風</option>
                  <option value="フェミニン">フェミニン</option>
                  <option value="和モダン">和モダン</option>
                </select>
              </div>
              <div className={cModule.button}>
                <button className={cModule.buttonStyle}>
                  再生成する
                </button>
              </div>
            </form>
            {/* <div className={cModule.button}>
              <Link href="/coordination">
                <button className={cModule.backButtonStyle}>
                  テーマ選択
                </button>
              </Link>
            </div> */}
          </div>
          <Generator list={list} />
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
                <Link
                  href={`/items/itemlist/search?genre=${listItem.genre}&category=テーブル&input=&order=id.desc`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
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
                <Link
                  href={`/items/itemlist/search?genre=${listItem.genre}&category=椅子&input=&order=id.desc`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
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
                <Link
                  href={`/items/itemlist/search?genre=${listItem.genre}&category=ソファ&input=&order=id.desc`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
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
                <Link
                  href={`/items/itemlist/search?genre=${listItem.genre}&category=ベッド%2F寝具&input=&order=id.desc`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className={cModule.categories}>
                    <Image
                      src={loupe}
                      width={23}
                      height={10}
                      alt=""
                    />
                    <p>&emsp;ベッド/寝具&emsp;</p>
                  </div>
                </Link>
                <Link
                  href={`/items/itemlist/search?genre=${listItem.genre}&category=収納棚&input=&order=id.desc`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
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
                <Link
                  href={`/items/itemlist/search?genre=${listItem.genre}&category=小物%2F雑貨&input=&order=id.desc`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
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
                <Link
                  href={`/items/itemlist/search?genre=${listItem.genre}&category=照明&input=&order=id.desc`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
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
                <Link
                  href={`/items/itemlist/search?genre=${listItem.genre}&category=カーテン&input=&order=id.desc`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
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
                <Link
                  href={`/items/itemlist/search?genre=${listItem.genre}&category=小物%2F雑貨&input=&order=id.desc`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className={cModule.categories}>
                    <Image
                      src={loupe}
                      width={23}
                      height={10}
                      alt=""
                    />
                    <p>&emsp;小物/雑貨&emsp;</p>
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
