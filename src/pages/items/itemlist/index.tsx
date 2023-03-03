// itemlist/[id]作成次第削除

import ItemList from '@/components/ItemList';
import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/Header';
import lstyles from '../../../styles/itemList.module.css';
import SearchBox from '../../../components/SerchBox';



export default function List() {

  return (
    <>
      <Head>
        <title>商品一覧画面</title>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0"
        />
      </Head>

      <div className={lstyles.container}>
        <Header />
        <main className={lstyles.main}>
          {/* 検索ボックス */}
          <SearchBox/>
          <div className={lstyles.Breadcrumb}>
            <nav>
              <ol>
                <li className={lstyles.breadlist}>
                  <Link href="/">TOPページ</Link>
                </li>
                <li className={lstyles.breadlist}>商品一覧ページ</li>
              </ol>
            </nav>
          </div>

          {/* 商品一覧 */}
          <div>
            <ItemList />
          </div>
        </main>
      </div>
    </>
  );
}

// tailwindcss：md;
// 1ページ表示（横*縦)：4*10
