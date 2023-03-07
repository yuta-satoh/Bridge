import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import lstyles from '../../../styles/itemList.module.css';
import istyles from '../../../styles/item.module.css';
import useSWR from 'swr';
import { useState } from 'react';
import ItemdetailReccomend from '@/components/ItemdetailReccomend';
import CartCounter from '@/components/Cartbutton';
import ReviewList from '@/components/ReviewList';

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

export default function ItemPage({
  item,
}: {
  item: Item[];
}): JSX.Element {
  // 確認用
  // console.log(item);

  const items = item[0];
  const genre = items.genre;
  const category = items.category;

  const [multiItemPrice, setMultiItemPrice] = useState(items.price)

  const handleChangeQuantityItem = (quantity: string) => {
    const multi = items.price * Number(quantity);
    setMultiItemPrice(multi);
  }

  const showMultiPrice = () => {
    if (multiItemPrice === items.price) {
      return (
        <div className={istyles.content_itemprice}>
        </div>
      )
    } else {
      return (
        <div className={istyles.content_itemprice}>
          <span>合計：</span>
          <span>¥ {(multiItemPrice * 1.1).toLocaleString()}</span>
          <span className={istyles.inTax}>(税込)</span>
        </div>
      )
    }
  }

  return (
    <>
      <Head>
        <title>{items.name}</title>
      </Head>

      <main className={lstyles.main}>
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
              {/* ジャンル絞り込み */}
              <li className={lstyles.breadlist}>
                <Link
                  href={`/items/itemlist/search?genre=${items.genre}&category=椅子&category=テーブル&category=カーテン&category=照明&category=カーペット%2Fラグ&category=ソファ&category=収納棚&category=ベッド%2F寝具&category=小物%2F雑貨&input=&order=id.desc&page=0`}
                >
                  {items.genre}
                </Link>
              </li>
              {/* ジャンルとカテゴリ絞り込み */}
              <li className={lstyles.breadlist}>
                <Link
                  href={`/items/itemlist/search?genre=${items.genre}&category=${items.category}&input=&order=id.desc&page=0`}
                >
                  {items.category}
                </Link>
              </li>
              <li className={lstyles.breadlist}>{items.name}</li>
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

            {/* レビュー機能 */}
            <ReviewList itemId={items.id.toString()} />

            {/* 以下はこんなのもどうですか、ジャンル・カテゴリに合致したものを持ってくる */}
            <ItemdetailReccomend genre={genre} category={category} />
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
              <span>¥ {(items.price * 1.1).toLocaleString()}</span><span className={istyles.inTax}>(税込)</span>
            </div>
              {/* 合計金額 */}
              {showMultiPrice()}

            {/* カートボタン機能 */}
            <CartCounter itemId={items.id} handleChangeQuantityItem={handleChangeQuantityItem} />

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
                <Link
                  href={`/items/itemlist/search?genre=北欧風&genre=ナチュラル&genre=和モダン&genre=フェミニン&category=${items.category}&input=&order=id.desc&page=0`}
                >
                  <p className={istyles.category_detailname}>
                    {items.category}
                  </p>
                </Link>
              </div>
              <div className={istyles.category_detail}>
                インテリアジャンル：
                <Link
                  href={`/items/itemlist/search?genre=${items.genre}&category=椅子&category=テーブル&category=カーテン&category=照明&category=カーペット%2Fラグ&category=ソファ&category=収納棚&category=ベッド%2F寝具&category=小物%2F雑貨&input=&order=id.desc&page=0`}
                >
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
      id: `${item.id}`,
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

export async function getStaticProps({ params }: Params) {
  const res = await fetch(
    `http://127.0.0.1:8000/items?id=eq.${params.id}`
  );
  const item = await res.json();

  return {
    props: { item },
  };
}
