// モーダルウィンドウ
// 検索ボックス部分一致で渡す
// ruter.push
// クエリで渡してpage表示時に、SSRで引っ張ってくる

import lstyles from '../styles/itemList.module.css';
import fstyles from '../styles/Footer.module.css';
import { useState } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router';
import path from 'path';
import { arrayBuffer } from 'stream/consumers';

export default function SearchBox() {
  const router = useRouter();
  const [genres, setGenres] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  // trueのもののみ、queryに含める
  const [genreClicked, setGenreClicked] = useState<boolean[]>(Array(4).fill(false));
  const [categoryClicked, setCategoryClicked] = useState<boolean[]>(Array(8).fill(false));

  const categorydatas = [
    '椅子',
    'テーブル',
    'カーテン',
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

  const categoryEdatas = [
    'chair',
    'table',
    'cartain',
    'rug',
    'sofa',
    'chest',
    'bed',
    'accessory',
  ];

  const genreEdatas = [
    'nordic',
    'natural',
    'jmodern',
    'feminine',
  ];

  // インテリアジャンル
  const handleGenreChange = (e: any) => {
    const { value } = e.target;
    const isChecked = e.target.checked;
    const index = Number(e.target.id);

    setGenres((prevGenres) => {
      if (isChecked) {
        return [...prevGenres, `genre.eq.${value}`];
        // setGenreClicked(genreClicked[n] = true);
      } else {
        return prevGenres.filter((genre) => genre !== value);
        // setGenreClicked(genreClicked[n] = false);
      }
    });

    // query追加有無の作業後、さらに送信データに含めるかをindexをもとに
    let copyGenreClicked = genreClicked;
    copyGenreClicked[index] = !copyGenreClicked[index]
    setGenreClicked(copyGenreClicked);
  }

  // 商品カテゴリ 
  const handleCategoryChange = (e: any) => {
    const { value } = e.target;
    const isChecked = e.target.checked;
    const index = Number(e.target.id);

    setCategories((prevCategories) => {
      if (isChecked) {
        return [...prevCategories, `category.eq.${value}`];
      } else {
        return prevCategories.filter((category) => category !== value);
      }
    });
      let copyCategoryClicked = categoryClicked;
      copyCategoryClicked[index] =  !copyCategoryClicked[index]
      setCategoryClicked(copyCategoryClicked);
  }


  // 絞り込みクリア
  const handleClearClick = (e: any) => {
    setCategories([]);
    setGenres([]);
  };

  // 検索後ページ遷移
  // ruterで絞り込み条件渡す
  const handleSubmit = (e: any) => {
    if (genres.length !== 0 || categories.length !== 0) {
      e.preventDefault();

      // ?or=(genre.eq.${genres},genre.eq.${genres})&or.(category.eq.${categories},category=eq.${categories})`
      
      // サーバー側で組み立てる必要
      function sendGenre() {
        return genres.toString();
      };

      function sendCategory() {
        return categories.toString();
      };

      // queryに含むフラグがtrueかどうかを確認し、trueならsendGenre関数でqueryを返す
      const genrePath = genreClicked.includes(true) ? sendGenre() : "";
      const categoryPath = categoryClicked.includes(true) ? sendCategory() : "";  

      // 検索ページディレクトリに遷移
      // 何も入っていない時はpushしない。条件を追記
      router.push({pathname: "/items/itemlist/search"},{query:{ genre: genrePath, category: categoryPath}});
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
                              value={genreEdatas[index]}
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
                              value={categoryEdatas[index]}
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
