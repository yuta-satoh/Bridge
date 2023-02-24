import Head from 'next/head';
import Link from 'next/link';

export default function Mypage() {
  return (
    <>
      <Head>
        <title>マイページ</title>
      </Head>
      <main>
        <section>
          <div className="title">
            <h1>マイページ</h1>
          </div>
          <div className="body">
            <div>
              <div className="subtitle">
                <h2>カートの商品</h2>
                <Link
                  href="ここにカートページへのリンクを追加"
                  className="cartLink"
                >
                  すべて見る
                </Link>
              </div>
              <div>{/* 商品情報を表示 */}</div>
            </div>
            <div>
              <div className="subtitle">
                <h2>会員情報</h2>
              </div>
              <div>
                <Link href="/account/profile">
                  会員情報の確認/変更
                </Link>
              </div>
              <div>
                <Link href="/account/password">パスワードの変更</Link>
              </div>
            </div>
            <div>
              <div className="subtitle">
                <h2>ログアウト/退会</h2>
              </div>
              <div>
                <Link href="ここにトップページへのリンクを追加">
                  ログアウト
                </Link>
              </div>
              <div>
                <Link href="ここに退会ページへのリンクを追加">
                  退会
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
