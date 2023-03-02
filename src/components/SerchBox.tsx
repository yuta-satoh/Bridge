// モーダルウィンドウ
// 検索ボックス部分一致で渡す
// ruter.push
// クエリで渡してpage表示時に、SSRで引っ張ってくる

import lstyles from '../styles/itemList.module.css';
import fstyles from '../styles/Footer.module.css';
import { useState } from 'react';
import router, { useRouter } from 'next/router';

export default function SearchBox() {
  const router = useRouter();
  const [genres, setGenres] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const genredatas = [
    '椅子',
    'テーブル',
    'カーテン',
    'カーペット/ラグ',
    'ソファ',
    '収納棚',
    'ベッド/寝具',
    '小物/雑貨',
  ];

  const categorydatas = [
    '北欧風',
    'ナチュラル',
    '和モダン',
    'フェミニン',
  ];

  // チェックされたら検索対象にする
  // インテリアジャンル
  const handleGenreChange = (e: any) => {
    if (genres.includes(e.target.value)) {
      setGenres(genres.filter((genre) => genre !== e.target.value));
    } else {
      setGenres([...genres, e.target.value]);
      // router.push({ query: { genre: genres } });
      // router.push({
      //   pathname:"items",       
      //   query: {gnere :e.target.value}
      // });
    }
  };

  // 商品カテゴリ
  const handleCategoryChange = (e: any) => {
    if (categories.includes(e.target.value)) {
      setCategories(
        categories.filter((category) => category !== e.target.value)
      );
    } else {
      setCategories([...categories, e.target.value]);
      // router.push({ query: { category: categories } });
      // router.push({
      //   pathname:"items",       
      //   query: {category :e.target.value }
      // });
    }
  };

  // 絞り込みクリア
  const handleClearClick = (e: any) => {
    setCategories([]);
    setGenres([]);
    // router.push({});
  };

  // 検索後ページ遷移
  const handleLinkClick = () => {
    if (genres.length !== 0 || categories.length !== 0) {
      router.push(`/items/itemlist/search`);
    } else {
      alert('絞り込みを実施してください');
    }
  };

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
            type="submit"
            onClick={handleLinkClick}
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
                  商材カテゴリから探す
                </p>
                <div className={lstyles.category_lists}>
                  <ul className={lstyles.category_list}>
                    {genredatas.map((genredata) => {
                      return (
                        <li key={genredata}>
                          <label>
                            <input
                              type="checkbox"
                              value={genredata}
                              onChange={handleGenreChange}
                              checked={genres.includes(genredata)}
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
                  インテリアジャンルから探す
                </p>
                <div className={lstyles.category_lists}>
                  <ul className={lstyles.category_list}>
                    {categorydatas.map((categorydata) => {
                      return (
                        <li key={categorydata}>
                          <label>
                            <input
                              type="checkbox"
                              value={categorydata}
                              onChange={handleCategoryChange}
                              checked={categories.includes(
                                categorydata
                              )}
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
