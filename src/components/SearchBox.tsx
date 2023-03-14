import lstyles from '../styles/itemList.module.css';
import fstyles from '../styles/Footer.module.css';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/router';

export default function SearchBox() {
  const router = useRouter();
  const [genres, setGenres] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [input, setInput] = useState("")

  const categoryDatas = [
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
  const genreDatas = [
    '北欧風',
    'ナチュラル',
    '和モダン',
    'フェミニン',
  ];

  // チェンジイベントの関数はシンプルに配列に追加するタイプ
  const handleGenreChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setGenres((prevGenres) => {
      if (genres.includes(value)) {
        return prevGenres.filter((genre) => genre !== value);

      } else {
        return [...prevGenres, value];
      }
    });
  }
  const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCategories((prevCategories) => {
      if (categories.includes(value)) {
        return prevCategories.filter((category) => category !== value);
      } else {
        return [...prevCategories, value];
      }
    });
  }


  // 絞り込みクリア
  const handleClearClick = () => {
    setCategories([]);
    setGenres([]);
  };

  // 検索後ページ遷移
  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault()
    // ジャンルやカテゴリが空の時は全要素をクエリに渡す、orderはデフォルトで新着順
    if (genres.length === 0 && categories.length === 0) {
      router.push({
        pathname: '/items/itemlist/search',
        query: { genre: genreDatas, category: categoryDatas, input: input, order: 'id.desc', page: '0' },
      });
    } else if (genres.length === 0 && categories.length !== 0) {
      router.push({
        pathname: '/items/itemlist/search',
        query: { genre: genreDatas, category: categories, input: input, order: 'id.desc', page: '0' },
      });
    } else if (genres.length !== 0 && categories.length == 0) {
      router.push({
        pathname: '/items/itemlist/search',
        query: { genre: genres, category: categoryDatas, input: input, order: 'id.desc', page: '0' },
      });
    } else if (genres.length !== 0 && categories.length !== 0) {
      router.push({
        pathname: '/items/itemlist/search',
        query: { genre: genres, category: categories, input: input, order: 'id.desc', page: '0' },
      });
    }  
  }

  return (
    <>
      <div className={lstyles.serch_boxes}>
        {/* 検索欄 */}
        <form className={lstyles.serchbox} onSubmit={handleSubmit} >
          <input
            className={lstyles.serch}
            type="text"
            placeholder="何をお探しですか？"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className={lstyles.serch_button}
            type="submit"
          >
            検索
          </button>
        </form>

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
            クリックで開く
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
                    {genreDatas.map((genreData, index) => {
                      return (
                        <li key={genreData}>
                          <label>
                            <input
                              id={index.toString()}
                              type="checkbox"
                              name='categorydatas'
                              value={genreData}
                              onChange={(e)=>handleGenreChange(e)}
                              checked={genres.includes(genreData)}
                            />
                            {genreData}
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
                    {categoryDatas.map((categoryData, index) => {
                      return (
                        <li key={categoryData}>
                          <label>
                            <input
                              type="checkbox"
                              id={index.toString()}
                              name='categorydata'
                              value={categoryData}
                              onChange={handleCategoryChange}
                              checked={categories.includes(categoryData)}
                            />
                            {categoryData}
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
