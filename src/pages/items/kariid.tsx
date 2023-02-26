import ItemList from '@/components/ItemList';
import Head from 'next/head';
import Link from 'next/link';
import lstyles from '../../styles/itemList.module.css';
import istyles from '../../styles/item.module.css';
import Image from 'next/image';

export default function ItemPage() {
  return (
    <>
      <Head>
        <title>商品詳細</title>
      </Head>

      <main className={istyles.main}>
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
          <div className={istyles.content_left}>
            <div className={istyles.image}>
              <Image
                src="/images/accessory/accessory_feminine_1.jpg"
                alt="全身姿見"
                width={550}
                height={500}
              />
            </div>

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

            <div className={istyles.content_itemname}>
              <span>全身姿見</span>
            </div>
            <div className={istyles.content_itemprice}>
              <span>¥15,000</span>
            </div>

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

            <div className={istyles.content_description}>
              <div className={istyles.content_itemdescription_title}>
                <div className={istyles.content_description_title}>
                  <p>商品説明</p>
                </div>
              </div>
              <div className={istyles.content_itemdescription}>
                <p>韓国インテリアのお洒落な全身鏡。</p>
              </div>
            </div>

            <div className={istyles.category_details}>
              <div className={istyles.category_detail}>
                商品カテゴリー：
                <Link href="/">
                  <p className={istyles.category_detailname}>
                    アクセサリー
                  </p>
                </Link>
              </div>
              <div className={istyles.category_detail}>
                インテリアジャンル：
                <Link href="/">
                  <p className={istyles.category_detailname}>
                    フェミニン
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
