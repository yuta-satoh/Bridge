import Head from 'next/head';
import Link from 'next/link';
import lstyles from '../../styles/itemList.module.css';
import istyles from '../../styles/item.module.css';
import Image from 'next/image';
import useSWR from 'swr';

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

  console.log(item);

  const items = item[0];

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
                <Link href="">インテリアジャンル</Link>
              </li>
              <li className={lstyles.breadlist}>
                <Link href="">商品カテゴリ</Link>
              </li>
              <li className={lstyles.breadlist}>
                <Link href="">商材ページ</Link>
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
                width={550}
                height={500}
              />
            </div>

          {/* 以下はこんなのもどうですか、ジャンル・カテゴリに合致したものを持ってくる */}
            <div className={istyles.recommend}>
              <div>
                <Link href={'/'}>
                  <div className={istyles.images}>
                    <Image
                      src="/images/accessory/accessory_feminine_1.jpg"
                      alt="全身姿見"
                      width={150}
                      height={150}
                    />
                  </div>
                  <div className={istyles.detail}>
                    <p>全身姿見</p>
                    <p>¥15,000</p>
                    <p>韓国インテリアのお洒落な全身鏡。</p>
                  </div>
                </Link>
              </div>
            </div>
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
              <span>{items.price}</span>
            </div>

          {/* カートボタン機能 */}
            <div className={istyles.carts}>
              <div className={istyles.cart_left}>
                <div className={istyles.cart_lclick}>
                  <p>-</p>
                </div>
                <form>
                  <input
                    type="text"
                    value="1"
                    className={istyles.cart_value}
                  />
                  {/* <input type="text" value="1" class="input_text _size_63" disabled="disabled" />
                <input type="hidden" name="changeUnit" value="1" /> */}
                </form>
                <div className={istyles.cart_rclick}>
                  <p>+</p>
                </div>
              </div>
              <div className={istyles.cart_right}>
                <form>
                  <button type="button">カートに追加</button>
                </form>
              </div>
            </div>

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
