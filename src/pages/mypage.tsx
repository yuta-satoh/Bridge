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
          <h1>マイページ</h1>
          <div>
            <div>
            <h2>カートの商品</h2>
            <Link href="ここにカートページへのリンクを追加">すべて見る</Link>
            </div>
            <div>
                {/* 商品情報を表示 */}
            </div>
          </div>
          <div>
            <h2>お客様の会員情報</h2>
            <table className="userInfo">
              <tbody>
                <tr>
                  <th>姓</th>
                  <td>楽須</td>
                </tr>
                <tr>
                  <th>名</th>
                  <td>太郎</td>
                </tr>
                <tr>
                  <th>性別</th>
                  <td>男</td>
                </tr>
                <tr>
                  <th>電話番号</th>
                  <td>111-111-1111</td>
                </tr>
                <tr>
                  <th>e-mail</th>
                  <td>rakus@example.com</td>
                </tr>
                <tr>
                  <th>郵便番号</th>
                  <td>160-0022</td>
                </tr>
                <tr>
                  <th>住所</th>
                  <td>東京都新宿区新宿2-5-12 8F</td>
                </tr>
                <tr>
                  <th>パスワード</th>
                  <td>*******</td>
                </tr>
              </tbody>
            </table>
            <button type="button">
              <Link href="ここに会員情報編集画面へのリンクを追加">編集</Link>
            </button>
          </div>
          <div>
            <h2>ログアウト/退会</h2>
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
        </section>
      </main>
    </>
  );
}
