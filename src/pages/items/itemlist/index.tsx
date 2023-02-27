// [id]作成次第削除

import ItemList from '@/components/ItemList';
import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import lstyles from '../../styles/itemList.module.css';
import fstyles from '../../styles/Footer.module.css';

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
          <div className={lstyles.serch_boxes}>
            <div className={lstyles.serchbox}>
              <input
                className={lstyles.serch}
                type="text"
                placeholder="何をお探しですか？"
              />
              <button className={lstyles.serch_button} type="submit">
                検索
              </button>
            </div>

            <div className={lstyles.serch_itemsmenu}>
              <input
                type="checkbox"
                id="serch_checkbox"
                className={lstyles.serch_checkbox}
              />
              <label
                htmlFor="serch_checkbox"
                className={lstyles.serch_menu}
              >
                クリックで開く（後ほどアイコン挿入）
              </label>

              {/* 検索ボックス */}
              <div className={lstyles.serchmenu_itembox}>
                <div className={lstyles.itemboxes}>
                  <div className={lstyles.itembox}>
                    <p>絞り込み条件</p>
                    <button
                      type="button"
                      className={lstyles.itembox_clear}
                    >
                      クリア
                    </button>
                  </div>
                  <div className={lstyles.itembox_item}>
                    <ul className={lstyles.itembox_categories}>
                      <li className={lstyles.itembox_lists}>
                        商材カテゴリー：
                      </li>
                      <li className={lstyles.itembox_list}>椅子</li>
                      <li className={lstyles.itembox_list}>
                        アクセサリー
                      </li>
                      <li className={lstyles.itembox_list}>
                        テーブル
                      </li>
                    </ul>
                    <ul className={lstyles.itembox_genres}>
                      <li className={lstyles.itembox_lists}>
                        インテリアジャンル：
                      </li>
                      <li className={lstyles.itembox_list}>北欧風</li>
                      <li className={lstyles.itembox_list}>
                        フェミニン
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <div className={fstyles.category}>
                    <p className={lstyles.menu_contents_title}>
                      商材カテゴリから探す
                    </p>
                    <div className={lstyles.category_lists}>
                      <ul className={lstyles.category_list}>
                        <li>
                          <input
                            type="checkbox"
                            id="chair"
                            name="chair"
                          />
                          <label htmlFor="chair">椅子</label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="table"
                            name="table"
                          />
                          <label htmlFor="table">テーブル</label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="curtain"
                            name="curtain"
                          />
                          <label htmlFor="curtain">カーテン</label>
                        </li>
                      </ul>
                      <ul className={lstyles.category_list}>
                        <li>
                          <input
                            type="checkbox"
                            id="rug"
                            name="rug"
                          />
                          <label htmlFor="rug">カーペット/ラグ</label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="sofa"
                            name="sofa"
                          />
                          <label htmlFor="sofa">ソファ</label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="chest"
                            name="chest"
                          />
                          <label htmlFor="chest">収納棚</label>
                        </li>
                      </ul>
                      <ul className={lstyles.category_list}>
                        <li>
                          <input
                            type="checkbox"
                            id="light"
                            name="light"
                          />
                          <label htmlFor="light">照明</label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="bed"
                            name="bed"
                          />
                          <label htmlFor="bed">ベッド/寝具</label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="accessory"
                            name="accessory"
                          />
                          <label htmlFor="accessory">小物/雑貨</label>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className={fstyles.category}>
                    <p className={lstyles.menu_contents_title}>
                      インテリアジャンルから探す
                    </p>
                    <div className={lstyles.category_lists}>
                      <ul className={lstyles.category_list}>
                        <li>
                          <input
                            type="checkbox"
                            id="nordic"
                            name="nordic"
                          />
                          <label htmlFor="nordic">北欧風</label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="natural"
                            name="natural"
                          />
                          <label htmlFor="natural">ナチュラル</label>
                        </li>
                      </ul>
                      <ul className={lstyles.category_list}>
                        <li>
                          <input
                            type="checkbox"
                            id="jmodern"
                            name="jmodern"
                          />
                          <label htmlFor="jmodern">和モダン</label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="feminine"
                            name="feminine"
                          />
                          <label htmlFor="feminine">フェミニン</label>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={lstyles.Breadcrumb}>
            <nav>
              <ol>
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
            <ItemList />
          </div>
        </main>
      </div>
    </>
  );
}

// tailwindcss：md;
// 1ページ表示（横*縦)：4*10
