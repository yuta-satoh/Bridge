import ItemList from '@/components/ItemList';
import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import lstyles from '../../styles/itemList.module.css';

export default function List() {
  return (
    <>
      <Head>
        <title>インテリア・家具通販【bridge】</title>
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      </Head>

      <div className={lstyles.container}>
      <Header />
      <main className={lstyles.main}>
        <div className={lstyles.Breadcrumbs}>
        <nav>
          <ol className={lstyles.breadcrumbs}>
            <li className={lstyles.breadlist}>
              <Link href="/">TOPページ</Link>
            </li>
            <li className={lstyles.breadlist}>
                <Link href="">現在のページ</Link>
            </li>
          </ol>
        </nav>
        </div>

        <div>
            <ul>
                <li>
                    <ItemList />
                </li>
            </ul>
        </div>

        <div role="dialog">
        <fieldset>
          <form>
            <div className="flex gap-10">
              <input
                type="text"
                name="keyword"
                placeholder="キーワードを入力"
              />
              <button type="submit">検索</button>
            </div>
          </form>

          <form>
             <div className='itembox'>
                <div>
                    <p>絞り込み条件</p>
                    <button type='button' className='clearText'>クリア</button>
                </div>
                <ul className='sidebar_category_checklist'>
                    <li>椅子</li>
                </ul>
                <ul className='sidebar_genre_checklist'>
                    <li>北欧風</li>
                </ul>
             </div>

            <div className='category'>
                <ul>
                    <li>
                        <input type="checkbox" id="chair" name="chair" checked />
                        <label htmlFor="chair">椅子</label>
                    </li>
                    <li>
                        <input type="checkbox" id="table" name="table" />
                        <label htmlFor="table">テーブル</label>
                    </li>
                    <li>
                        <input type="checkbox" id="curtain" name="curtain" />
                        <label htmlFor="curtain">カーテン</label>
                    </li>
                    <li>
                        <input type="checkbox" id="rug" name="rug" />
                        <label htmlFor="rug">カーペット/ラグ</label>
                    </li>
                    <li>
                        <input type="checkbox" id="sofa" name="sofa" />
                        <label htmlFor="sofa">ソファ</label>
                    </li>
                    <li>
                        <input type="checkbox" id="chest" name="chest" />
                        <label htmlFor="chest">収納棚</label>
                    </li>
                    <li>
                        <input type="checkbox" id="light" name="light" />
                        <label htmlFor="light">照明</label>
                    </li>
                    <li>
                        <input type="checkbox" id="bed" name="bed" />
                        <label htmlFor="bed">ベッド/寝具</label>
                    </li>
                    <li>
                        <input type="checkbox" id="accessory" name="accessory" />
                        <label htmlFor="accessory">小物/雑貨</label>
                    </li>
                </ul>
            </div>

            <div className='genre'>
                <ul>
                    <li>
                        <input type="checkbox" id="nordic" name="nordic" checked/>
                        <label htmlFor="nordic">北欧風</label>
                    </li>
                    <li>
                        <input type="checkbox" id="natural" name="natural" />
                        <label htmlFor="natural">ナチュラル</label>
                    </li>
                    <li>
                        <input type="checkbox" id="jmodern" name="jmodern" />
                        <label htmlFor="jmodern">和モダン</label>
                    </li>
                    <li>
                        <input type="checkbox" id="feminine" name="feminine" />
                        <label htmlFor="feminine">フェミニン</label>
                    </li>
                </ul>
            </div>
          </form>
        </fieldset>
        </div>
      </main>
      </div>
      <Footer />
    </>
  );
}

// tailwindcss：md;
// 1ページ表示（横*縦)：4*10
//
