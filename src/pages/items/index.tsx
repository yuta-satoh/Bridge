import ItemList from '@/components/ItemList';
import Head from 'next/head';
import Link from 'next/link';
// import Header from ;
// import Footer from ;

export default function List() {
  return (
    <>
      <Head>
        <title>インテリア・家具通販【bridge】</title>
      </Head>
      {/* <Header /> */}
      <main>
        <nav>
          <ol className="breadcrumbs">
            <li>
              <Link href="/">TOPページ</Link>
            </li>
            <li>商品一覧</li>
          </ol>
        </nav>

        <div className="itemList">
          <ul>
            <li>
              <ItemList />
            </li>
          </ul>
        </div>

        <fieldset>
          <form>
            <div>
              <input
                type="text"
                name="keyword"
                placeholder="キーワードを入力してください"
              />
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
              <div>
                <input type="checkbox" id="chair" name="chair" checked />
                <label htmlFor="chair">椅子</label>
              </div>
              <div>
                <input type="checkbox" id="table" name="table" />
                <label htmlFor="table">テーブル</label>
              </div>
              <div>
                <input type="checkbox" id="curtain" name="curtain" />
                <label htmlFor="curtain">カーテン</label>
              </div>
              <div>
                <input type="checkbox" id="rug" name="rug" />
                <label htmlFor="rug">カーペット/ラグ</label>
              </div>
              <div>
                <input type="checkbox" id="sofa" name="sofa" />
                <label htmlFor="sofa">ソファ</label>
              </div>
              <div>
                <input type="checkbox" id="chest" name="chest" />
                <label htmlFor="chest">収納棚</label>
              </div>
              <div>
                <input type="checkbox" id="light" name="light" />
                <label htmlFor="light">照明</label>
              </div>
              <div>
                <input type="checkbox" id="bed" name="bed" />
                <label htmlFor="bed">ベッド/寝具</label>
              </div>
              <div>
                <input type="checkbox" id="accessory" name="accessory" />
                <label htmlFor="accessory">小物/雑貨</label>
              </div>
            </div>

            <div className='genre'>
              <div>
                <input type="checkbox" id="nordic" name="nordic" checked/>
                <label htmlFor="nordic">北欧風</label>
              </div>
              <div>
                <input type="checkbox" id="natural" name="natural" />
                <label htmlFor="natural">ナチュラル</label>
              </div>
              <div>
                <input type="checkbox" id="jmodern" name="jmodern" />
                <label htmlFor="jmodern">和モダン</label>
              </div>
              <div>
                <input type="checkbox" id="feminine" name="feminine" />
                <label htmlFor="feminine">フェミニン</label>
              </div>
            </div>
          </form>
        </fieldset>
      </main>
      {/* <Footer /> */}
    </>
  );
}

// tailwindcss：md;
// 1ページ表示（横*縦)：4*10
//
