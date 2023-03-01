import Head from 'next/head';
import Link from 'next/link';
import lstyles from '../../../styles/itemList.module.css';
import useSWR from 'swr';
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


export default function ItemPage({item}: {item: Item[]}): JSX.Element {

  // 確認用
  // console.log(item);

  const items = item[0];
  const genre = items.genre;
  const category = items.category;

  return (
    <>
      <Head>
        <title>商品詳細</title>
      </Head>

      <main className={istyles.main}>
        {/* パンくずリスト */}
        <div className={lstyles.Breadcrumb}>
          <nav>
            <ol>
              <li className={lstyles.breadlist}>
                <Link href="/">TOPページ</Link>
              </li>
              <li className={lstyles.breadlist}>
                <Link href={`/items/?genre=eq.${items.genre}`}>{items.genre}</Link>
              </li>
              <li className={lstyles.breadlist}>
                <Link href={`/items/?category=eq.${items.category}`}>{items.category}</Link>
              </li>
              <li className={lstyles.breadlist}>
                {items.name}
              </li>
            </ol>
          </nav>
        </div>

        <div className={istyles.itembox}>

          <div key={items.id} className={istyles.content_left}>
            <div className={istyles.image}>
              <Image
                src={items.imgurl}
                alt={items.name}
                width={580}
                height={500}
              />
            </div>

          {/* 以下はこんなのもどうですか、ジャンル・カテゴリに合致したものを持ってくる */}
          <ItemdetailReccomend genre={genre} category={category}/>
          </div>

          <div className={istyles.content_right}>
             {/* 詳細他メニュー */}
            <div>
              <ul className={istyles.product_taglists}>
                <li className={istyles.product_taglist}>保証付</li>
                <li className={istyles.product_taglist}>完成品</li>
                <li className={istyles.product_taglist}>
                  受注生産品
                </li>
                <li className={istyles.product_taglist}>
                  開梱・設置無料
                </li>
              </ul>
            </div>

          {/* 商品概要 */}
            <div className={istyles.content_itemname}>
              <span>{items.name}</span>
            </div>
            <div className={istyles.content_itemprice}>
              <span>{items.price}円</span>
            </div>

          {/* カートボタン機能 */}
            <CartCounter />

          {/* 商品詳細説明 */}
            <div className={istyles.content_description}>
              <div className={istyles.content_itemdescription_title}>
                <div className={istyles.content_description_title}>
                  <p>商品説明</p>
                </div>
              </div>
              <div className={istyles.content_itemdescription}>
                <p>{items.description}</p>
              </div>
            </div>

            {/* 詳細商品カテゴリー */}
            <div className={istyles.category_details}>
              <div className={istyles.category_detail}>
                商品カテゴリー：
                <Link href="/">
                  <p className={istyles.category_detailname}>
                    {items.category}
                  </p>
                </Link>
              </div>
              <div className={istyles.category_detail}>
                インテリアジャンル：
                <Link href="/">
                  <p className={istyles.category_detailname}>
                    {items.genre}
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

// パス・データ取得

export async function getStaticPaths() {
  const res = await fetch('http://127.0.0.1:8000/items');
  const items = await res.json();

  const paths = items.map((item: { id: number }) => ({
    params: { 
      id: `${item.id}` ,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

type Params = {
  params: {
    id: number;
  };
};

export async function getStaticProps({ params }:Params) {
  const res = await fetch(`http://127.0.0.1:8000/items?id=eq.${params.id}`);
  const item = await res.json();

  return {
    props: { item },
  };
}
