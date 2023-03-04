import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import topStyle from '../styles/top.module.css';
import { GetServerSideProps } from 'next';

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

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch('http://localhost:3000/api/newItems')
  const data: Item[] = await response.json()

  return {
    props: {
      data: data
    }
  }
}

export default function Home({ data }: { data: Item[] }) {
  const newItems = data.slice(1);
  // カテゴリ用配列
  const category = [
    {
      name: 'テーブル',
      src: '/images/table/table_natural_1.jpg',
      alt: 'table',
    },
    {
      name: '椅子',
      src: '/images/chair/chair_natural_3.jpg',
      alt: 'chair',
    },
    {
      name: 'ソファ',
      src: '/images/sofa/sofa_natural_2.jpg',
      alt: 'sofa',
    },
    {
      name: 'ベッド/寝具',
      src: '/images/bed/bed_natural_3.jpg',
      alt: 'bed',
    },
    {
      name: '収納棚',
      src: '/images/chest/chest_nordic_3.jpeg',
      alt: 'chest',
    },
    {
      name: 'カーペット/ラグ',
      src: '/images/rug/rug_nordic_2.jpeg',
      alt: 'rug',
    },
    {
      name: '照明',
      src: '/images/light/light_natural_3.jpg',
      alt: 'light',
    },
    {
      name: 'カーテン',
      src: '/images/curtain/curtain_natural_3.jpg',
      alt: 'curtain',
    },
    {
      name: '小物/雑貨',
      src: '/images/accessory/accessory_jmodern_3.jpeg',
      alt: 'accessory',
    },
  ];

  return (
    <>
      <Head>
        <title>トップページ</title>
      </Head>
      <main className={`${topStyle.main} mx-auto`}>
        <div className="relative">
          {/* 背景イメージは後から変えてください（３枚だけ用意してます） */}
          <Image
            src={'/images/background/top_image_2.jpeg'}
            alt={'top-image'}
            width={1920}
            height={1000}
          />
          {/* ロゴは後で作成予定 */}
          <Image
            src={'/images/logo/top_logo.png'}
            alt={'top-logo'}
            width={350}
            height={350}
            className={`${topStyle.logo} absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}
          />
          <div
            className={`${topStyle.buttonArea} absolute left-1/2 top-3/4 -translate-x-1/2 -translate-y-1/2`}
          >
            <button className="bg-white">
              <Link href="/coordination">
                <div className="mx-auto pt-1.5 text-center w-96 h-10 border-2 border-neutral-900">
                  <span>コーディネートをランダム生成する</span>
                  <span className="float-right mr-1">→</span>
                </div>
              </Link>
            </button>
          </div>
        </div>
        <div className={`${topStyle.content} mt-10`}>
          <h2 className="text-center text-xl font-bold">新着商品</h2>
          <div className={`${topStyle.categoryList} container mx-auto p-2 flex gap-5 justify-center`}>
            {/* 大きく表示する商品 */}
            <Link href={`/items/itemlist/${data[0].id}`}>
              <div>
                <Image
                  src={data[0].imgurl}
                  alt={data[0].name}
                  width={285}
                  height={285}
                  className="rounded"
                />
                <p className="text-lg">
                  ¥{data[0].price.toLocaleString()}
                </p>
              </div>
            </Link>
            <ul className="grid grid-cols-4 gap-4">
              {newItems.map((item, index) => (
                <Link href={`/items/itemlist/${item.id}`} key={index}>
                  <li>
                    <Image
                      src={item.imgurl}
                      alt={item.name}
                      width={120}
                      height={120}
                      className="rounded"
                    />
                    <p className="text-lg">
                      ¥{item.price.toLocaleString()}
                    </p>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
          <div className={topStyle.buttonContent}>
            <Link href="/items/itemlist">
              <button className={`${topStyle.buttonArea}`}>
                <div className="mx-auto pt-1.5 text-center w-96 h-10 border-2 border-neutral-900">
                  <span>商品一覧へ</span>
                  <span className="float-right mr-1">→</span>
                </div>
              </button>
            </Link>
          </div>
        </div>
        <div
          className={`${topStyle.content} mx-auto mt-20 justify-center`}
        >
          {/* カテゴリの表示は２段で別々にmap()を使っています */}
          <h2 className="text-center text-xl font-bold">
            商品カテゴリから探す
          </h2>
          <ul
            className={`${topStyle.categoryList} grid grid-cols-5 gap-8 w-4/5 mx-auto mt-5`}
          >
            {category.slice(0, 5).map((item) => (
              <li key={item.alt}>
                <Link href={`/items/itemlist/search?genre=北欧風&genre=ナチュラル&genre=和モダン&genre=フェミニン&category=${item.name}`}>
                  <div className="relative block h-16 border-2 border-neutral-500">
                    <div className="absolute flex ml-2 top-1/2 -translate-y-1/2">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={50}
                        height={50}
                      />
                      <span className="my-auto mx-2">
                        {item.name}
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <ul
            className={`${topStyle.categoryList} grid grid-cols-4 gap-7 w-3/5 mx-auto mt-5`}
          >
            {category.slice(5, 9).map((item) => (
              <li key={item.alt}>
                <Link href={`/items/itemlist/search?genre=北欧風&genre=ナチュラル&genre=和モダン&genre=フェミニン&category=${item.name}`}>
                  <div className="relative block h-16 border-2 border-neutral-500">
                    <div className="absolute ml-2 flex top-1/2 -translate-y-1/2">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={50}
                        height={50}
                      />
                      <span className="my-auto ml-2">
                        {item.name}
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={topStyle.scrollArea}>
          <h2 className="text-center text-xl font-bold">お知らせ</h2>
          <div className={topStyle.scroll}>
          <div className={topStyle.announce}>
              <p className={topStyle.date}>2023-1-4</p>
              <p className={topStyle.announceData}>新年のご挨拶</p>
            </div>
            <div className={topStyle.announce}>
              <p className={topStyle.date}>2022-12-28</p>
              <p className={topStyle.announceData}>年末年始の営業のお知らせ</p>
            </div>
            <div className={topStyle.announce}>
              <p className={topStyle.date}>2022-XX-XX</p>
              <p className={topStyle.announceData}>テキストテキストテキストテキストテキストテキストテキストテキスト</p>
            </div>
            <div className={topStyle.announce}>
              <p className={topStyle.date}>2022-XX-XX</p>
              <p className={topStyle.announceData}>テキストテキストテキストテキストテキストテキストテキストテキスト</p>
            </div>
            <div className={topStyle.announce}>
              <p className={topStyle.date}>2022-XX-XX</p>
              <p className={topStyle.announceData}>テキストテキストテキストテキストテキストテキストテキストテキスト</p>
            </div>
            <div className={topStyle.announce}>
              <p className={topStyle.date}>2022-XX-XX</p>
              <p className={topStyle.announceData}>テキストテキストテキストテキストテキストテキストテキストテキスト</p>
            </div>
            <div className={topStyle.announce}>
              <p className={topStyle.date}>2022-XX-XX</p>
              <p className={topStyle.announceData}>テキストテキストテキストテキストテキストテキストテキストテキスト</p>
            </div>
            <div className={topStyle.announce}>
              <p className={topStyle.date}>2022-XX-XX</p>
              <p className={topStyle.announceData}>テキストテキストテキストテキストテキストテキストテキストテキスト</p>
            </div>
            <div className={topStyle.announce}>
              <p className={topStyle.date}>2022-XX-XX</p>
              <p className={topStyle.announceData}>テキストテキストテキストテキストテキストテキストテキストテキスト</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
