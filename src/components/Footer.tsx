import Link from 'next/link';
import fstyles from '../styles/Footer.module.css';
import Image from 'next/image';

export default function Footer() {
  // サイト上部へ移動関数
  const returnTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={fstyles.menu}>
      <p className={fstyles.menu_title}>MENU</p>

      <div className={fstyles.menu_contents}>
        <div>
          <div className={fstyles.category}>
            <p className={fstyles.menu_contents_title}>
              商材カテゴリから探す
            </p>
            <div className={fstyles.category_lists}>
              <ul className={fstyles.category_list}>
                <li>
                  {/* SSRで再レンダリングした、カテゴリ検索結果リンクが入る想定です */}
                  <Link href="" className={fstyles.category_listItem}>
                    椅子
                  </Link>
                </li>
                <li>
                  <Link href="" className={fstyles.category_listItem}>
                    テーブル
                  </Link>
                </li>
                <li>
                  <Link href="" className={fstyles.category_listItem}>
                    カーテン
                  </Link>
                </li>
              </ul>
              <ul className={fstyles.category_list}>
                <li>
                  <Link href="" className={fstyles.category_listItem}>
                    カーペット/ラグ
                  </Link>
                </li>
                <li>
                  <Link href="" className={fstyles.category_listItem}>
                    ソファ
                  </Link>
                </li>
                <li>
                  <Link href="" className={fstyles.category_listItem}>
                    収納棚
                  </Link>
                </li>
              </ul>
              <ul className={fstyles.category_list}>
                <li>
                  <Link href="" className={fstyles.category_listItem}>
                    照明
                  </Link>
                </li>
                <li>
                  <Link href="" className={fstyles.category_listItem}>
                    ベッド/寝具
                  </Link>
                </li>
                <li>
                  <Link href="" className={fstyles.category_listItem}>
                    小物/雑貨
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className={fstyles.category}>
            <p className={fstyles.menu_contents_title}>
              インテリアジャンルから探す
            </p>
            <div className={fstyles.category_lists}>
              <ul className={fstyles.category_list}>
                <li>
                  <Link href="" className={fstyles.category_listItem}>
                    北欧風
                  </Link>
                </li>
                <li>
                  <Link href="" className={fstyles.category_listItem}>
                    ナチュラル
                  </Link>
                </li>
              </ul>
              <ul className={fstyles.category_list}>
                <li>
                  <Link href="" className={fstyles.category_listItem}>
                    和モダン
                  </Link>
                </li>
                <li>
                  <Link href="" className={fstyles.category_listItem}>
                    フェミニン
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* ガイドとその他はテキストのみとしてます（余裕があればページママコピペ？） */}
        <div className={fstyles.category}>
          <p className={fstyles.menu_contents_title}>ご利用ガイド</p>
          <div className={fstyles.category_lists}>
            <ul className={fstyles.guide_lists}>
              <li className={fstyles.guide_list}>はじめての方へ</li>
              <li className={fstyles.guide_list}>ご購入方法</li>
              <li className={fstyles.guide_list}>配送について</li>
              <li className={fstyles.guide_list}>お支払い方法</li>
              <li className={fstyles.guide_list}>返品・交換</li>
              <li className={fstyles.guide_list}>よくあるご質問</li>
            </ul>
            <ul className={fstyles.guide_lists}>
              <li className={fstyles.guide_list}>会社概要</li>
              <li className={fstyles.guide_list}>サービス利用規約</li>
              <li className={fstyles.guide_list}>個人情報保護方針</li>
              <li className={fstyles.guide_list}>
                特定商取引法に基づく表記
              </li>
              <li className={fstyles.guide_list}>サイトマップ</li>
            </ul>
          </div>
        </div>

        <div className={fstyles.message}>
          <form>
            <button type="submit">お問い合わせ　→</button>
          </form>
        </div>
      </div>

      <div className={fstyles.copybox}>
        <small>
          サイト内の文章、画像などの著作物は株式会社brigeに属します。複製、無断転載を禁止します。
        </small>
        <small>&copy;brige Inc.</small>
      </div>

      <div className={fstyles.top_btn}>
        <button onClick={returnTop}>
          <Image
            src="/arrow.png"
            alt=""
            width={30}
            height={30}
          />
        </button>
      </div>
    </footer>
  );
}
