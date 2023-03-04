// モーダルウィンドウ
// 検索ボックス部分一致で渡す
// ruter.push
// クエリで渡してpage表示時に、SSRで引っ張ってくる

import lstyles from '../styles/itemList.module.css';
import fstyles from '../styles/Footer.module.css';
import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';

export default function SearchBoxTest() {
    const router = useRouter();
    const [genres, setGenres] = useState<string[]>([]);
    const [categories, setCategories] = useState<string[]>([]);

    const categorydatas = [
        '椅子',
        'テーブル',
        'カーテン',
        '照明',
        'カーペット/ラグ',
        'ソファ',
        '収納棚',
        'ベッド/寝具',
        '小物/雑貨',
    ];

    const genredatas = [
        '北欧風',
        'ナチュラル',
        '和モダン',
        'フェミニン',
    ];

  // チェンジイベントの関数はシンプルに配列に追加するタイプ
    const handleGenreChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const isChecked = e.target.checked;

        setGenres((prevGenres) => {
            if (isChecked) {
                return [...prevGenres, value];
            } else {
                return prevGenres.filter((genre) => genre !== value);
            }
        });
    }
    const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const isChecked = e.target.checked;

        setCategories((prevCategories) => {
            if (isChecked) {
                return [...prevCategories, value];
            } else {
                return prevCategories.filter((category) => category !== value);
            }
        });
    }

    // 絞り込みクリア
    const handleClearClick = () => {
        setCategories([]);
        setGenres([]);
    };

    // 検索後ページ遷移
    const handleSubmit = () => {
            // ジャンルやカテゴリが空の時は全要素をクエリに渡す
            if (genres.length === 0 && categories.length === 0) {
                router.push({
                    pathname: '/search',
                    query: { genre: genredatas, category: categorydatas },
                });
            } else if (genres.length === 0 && categories.length !== 0) {
                router.push({
                    pathname: '/search',
                    query: { genre: genredatas, category: categories },
                });
            } else if (genres.length !== 0 && categories.length == 0) {
                router.push({
                    pathname: '/search',
                    query: { genre: genres, category: categorydatas },
                });
            } else if (genres.length !== 0 && categories.length !== 0) {
                router.push({
                    pathname: '/search',
                    query: { genre: genres, category: categories },
                });
            }  
        }

  return (
    <>
      <div className={lstyles.serch_boxes}>
        {/* 検索欄 */}
        <div className={lstyles.serchbox}>
          <input
            className={lstyles.serch}
            type="text"
            placeholder="何をお探しですか？"
          />
          <button
            className={lstyles.serch_button}
            type="button"
            onClick={handleSubmit}
          >
            検索
          </button>
        </div>

        {/* スライド開くボタン */}
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

          {/* ここから検索ボックス */}
          <div className={lstyles.serchmenu_itembox}>
            {/* 検索したもの表示 */}
            <div className={lstyles.itemboxes}>
              <div className={lstyles.itembox}>
                <p>絞り込み条件</p>
                <button
                  className={lstyles.itembox_clear}
                  type="button"
                  onClick={handleClearClick}
                >
                  クリア
                </button>
              </div>

              <div className={lstyles.itembox_item}>
                <ul className={lstyles.itembox_categories}>
                  <li className={lstyles.itembox_list}>
                    <p>商材カテゴリー：{categories.join(', ')}</p>
                  </li>
                </ul>
                <ul className={lstyles.itembox_genres}>
                  <li className={lstyles.itembox_list}>
                    <p>インテリアジャンル：{genres.join(', ')}</p>
                  </li>
                </ul>
              </div>
            </div>

            {/* チェックボックス */}
            <div className={lstyles.categorybox}>
              <div className={fstyles.category}>
                <p className={lstyles.menu_contents_title}>
                  インテリアジャンルから探す
                </p>
                <div className={lstyles.category_lists}>
                  <ul className={lstyles.category_list}>
                    {genredatas.map((genredata, index) => {
                      return (
                        <li key={genredata}>
                          <label>
                            <input
                              id={index.toString()}
                              type="checkbox"
                              name='categorydatas'
                              value={genredata}
                              onChange={(e)=>handleGenreChange(e)}
                              // checked={genres.includes(genredata)}
                            />
                            {genredata}
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              <div className={fstyles.category}>
                <p className={lstyles.menu_contents_title}>
                  商品カテゴリから探す
                </p>
                <div className={lstyles.category_lists}>
                  <ul className={lstyles.category_list}>
                    {categorydatas.map((categorydata, index) => {
                      return (
                        <li key={categorydata}>
                          <label>
                            <input
                              type="checkbox"
                              id={index.toString()}
                              name='genredatas'
                              value={categorydata}
                              onChange={handleCategoryChange}
                              // checked={categories.includes(
                              //   categorydata
                              // )}
                            />
                            {categorydata}
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
