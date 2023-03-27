import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import topStyle from '../styles/top.module.css';
import Cookies from 'js-cookie';
import NewItems from '@/components/NewItems';
import Button from '@/components/utils/Button';
import { useRouter } from 'next/router';
import { useWindowSize } from '@/lib/getWindowSize';

export default function Home() {
  const router = useRouter();
  // Cookies.set('genre', 'ナチュラル');
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

  const windowSize = useWindowSize()

  return (
    <>
      <Head>
        <title>トップページ</title>
      </Head>
      <main className={`${topStyle.main} mx-auto`}>
        <div className="relative">
          {/* 背景イメージは後から変えてください（３枚だけ用意してます） */}
          <div className={`${topStyle.container}`}>
            <Image
              src={'/images/background/top_image_2.jpeg'}
              alt={'top-image'}
              width={1920}
              height={1000}
              className={`${topStyle.topImage}`}
            />
            <Image
              src={'/images/background/top_image_4.jpeg'}
              alt={'top-image'}
              width={1920}
              height={1000}
              className={`${topStyle.topImage}`}
            />
            <Image
              src={'/images/background/top_image_3.jpeg'}
              alt={'top-image'}
              width={1920}
              height={1000}
              className={`${topStyle.topImage}`}
            />
          </div>
          {/* ロゴは後で作成予定 */}

          <Image
            src={'/images/logo/top_logo.png'}
            alt={'top-logo'}
            width={350}
            height={350}
            className={`${topStyle.logo} absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}
          />
          <div
            className={`${topStyle.cordbutton} absolute left-1/2 top-3/4 -translate-x-1/2 -translate-y-1/2`}
          >
            <button className={`${topStyle.cord}`}>
              <Link href="/coordination">
                <div className={`${topStyle.cordtitle} mx-auto pt-1.5 text-center w-96 h-10`}>
                  <span className={topStyle.cordtext}>コーディネートをランダム生成する　→</span>
                  {/* <span className={`${topStyle.cordtextarrow} float-right mr-1`}>→</span> */}
                </div>
              </Link>
            </button>
          </div>
        </div>
        <div className={`${topStyle.content} mt-20`}>
          <h2 className={`${topStyle.font} text-center text-xl font-bold`}>新着商品</h2>
          <NewItems />
          <div className={topStyle.buttonContent}>
            <Button
              type='button'
              color='white'
              onClick={() => router.push("/items/itemlist")}
            >
              商品一覧へ　→
            </Button>
          </div>
        </div>
        <div
          className={`mx-auto mt-20 justify-center w-5/6`}
        >
          {/* カテゴリの表示は２段で別々にmap()を使っています */}
          <h2 className={`${topStyle.font} text-center text-xl font-bold`}>
            商品カテゴリから探す
          </h2>
          {windowSize.width >= 600 ?
            <>
              <ul
                className={`${topStyle.cateLists} grid grid-cols-5 gap-8 mx-auto mt-5`}
              >
                {category.slice(0, 5).map((item) => (
                  <li key={item.alt} >
                    <Link
                      href={`/items/itemlist/search?genre=北欧風&genre=ナチュラル&genre=和モダン&genre=フェミニン&category=${item.name}&input=&order=id.desc&page=0`}
                    >
                      <div className={`${topStyle.cateList} relative block h-16 border rounded hover:shadow-md border-neutral-400`}>
                        <div className={`${topStyle.cateLis} absolute flex ml-2 top-1/2 -translate-y-1/2`}>
                          <Image
                            className={topStyle.cateimg}
                            src={item.src}
                            alt={item.alt}
                            width={50}
                            height={50}
                          />
                          <span className={`${topStyle.catename} my-auto mx-2`}>
                            {item.name}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              <ul
                className={`${topStyle.cateLists2} grid grid-cols-4 gap-7 w-3/5 mx-auto mt-5`}
              >
                {category.slice(5, 9).map((item) => (
                  <li key={item.alt}>
                    <Link
                      href={`/items/itemlist/search?genre=北欧風&genre=ナチュラル&genre=和モダン&genre=フェミニン&category=${item.name}&input=&order=id.desc&page=0`}
                    >
                      <div className={`${topStyle.cateList} relative block h-16 border rounded hover:shadow border-neutral-400`}>
                        <div className={`${topStyle.cateLis} absolute ml-2 flex top-1/2 -translate-y-1/2`}>
                          <Image
                            className={topStyle.cateimg}
                            src={item.src}
                            alt={item.alt}
                            width={50}
                            height={50}
                          />
                          <span className={`${topStyle.catename} my-auto mx-2`}>
                            {item.name}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          :
            <ul
              className='grid grid-cols-3 gap-4 mx-auto mt-5'
              >
                {category.map((item) => (
                    <li key={item.alt}>
                      <Link
                        href={`/items/itemlist/search?genre=北欧風&genre=ナチュラル&genre=和モダン&genre=フェミニン&category=${item.name}&input=&order=id.desc&page=0`}
                      >
                        <div className='relative block border rounded hover:shadow border-neutral-400 h-16'>
                          <div className='absolute ml-2 flex top-1/2 -translate-y-1/2'>
                            <Image
                              src={item.src}
                              alt={item.alt}
                              width={50}
                              height={50}
                            />
                            <span className='my-auto mx-1 text-sm'>
                              {item.name}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
            </ul>
          }
        </div>
        <div className={topStyle.scrollArea} id="remind">
          <h2 className={`${topStyle.font} text-center text-xl font-bold`}>お知らせ</h2>
          <div className={topStyle.scroll}>
            <div className={topStyle.announce}>
              <p className={topStyle.date}>2023-1-4</p>
              <p className={topStyle.announceData}>新年のご挨拶</p>
            </div>
            <div className={topStyle.announce}>
              <p className={topStyle.date}>2022-12-28</p>
              <p className={topStyle.announceData}>
                年末年始の営業のお知らせ
              </p>
            </div>
            <div className={topStyle.announce}>
              <p className={topStyle.date}>2022-10-31</p>
              <p className={topStyle.announceData}>
                偽サイトにご注意ください
              </p>
            </div>
            <div className={topStyle.announce}>
              <p className={topStyle.date}>2020-2-3</p>
              <p className={topStyle.announceData}>
                新型コロナウイルス感染症による配送への影響について
              </p>
            </div>
            <div className={topStyle.announce}>
              <p className={topStyle.date}>2019-4-1</p>
              <p className={topStyle.announceData}>
                消費税改定およびサイトメンテナンスに関するお知らせ
              </p>
            </div>
            <div className={topStyle.announce}>
              <p className={topStyle.date}>2019-3-31</p>
              <p className={topStyle.announceData}>
                サイトリニューアルのお知らせ
              </p>
            </div>
            <div className={topStyle.announce}>
              <p className={topStyle.date}>2018-4-9</p>
              <p className={topStyle.announceData}>
                送料改定に関するお知らせ
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
