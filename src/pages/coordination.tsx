import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import cModule from '../styles/coordination.module.css';
import Generator from '@/components/Generator';

export default function coordination() {
  const loupe = '/images/icon/loupe.png';
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
            <div className={cModule.selectTheme}>
              <p className={cModule.theme}>テーマ選択：</p>
              <select name="example" className={cModule.select}>
                <option value="ナチュラル">ナチュラル</option>
                <option value="北欧風">北欧風</option>
                <option value="フェミニン">フェミニン</option>
                <option value="和モダン">和モダン</option>
              </select>
            </div>
          </div>
          <Generator />
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
