import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Cookies from 'js-cookie';
import Auth from './auth/auth';
// import Logout from '../components/Logout';
import cModule from '../styles/coordination.module.css';
import myStyles from '../styles/mypage.module.css';
import { GetServerSideProps } from 'next';
import CurrentCartItems from '@/components/CurrentCartItems';

export const getServerSideProps: GetServerSideProps = async (
  context
) => {
  // クッキーの値の取得
  const cookie = context.req.headers.cookie;
  const cookieValue = ((cookie: string | undefined) => {
    if (typeof cookie !== 'undefined') {
      const cookies = cookie.split(';');
      // 配列cookiesを=で分割して代入し、
      // 0番目の要素が"id"なら1番目の要素(cookieの値)を返す
      for (let cookie of cookies) {
        const cookiesArray = cookie.split('=');
        if (cookiesArray[0].trim() === 'id') {
          return cookiesArray[1]; // (key[0],value[1])
        }
      }
    }
    // 上記の処理で何もリターンされなければ空文字を返す
    return '';
  })(cookie);
  // クッキーの値をpropsに渡す
  if (cookieValue === undefined) return { props: {} };
  return {
    props: { cookieValue },
  };
};

export default function Mypage({
  cookieValue,
}: {
  cookieValue: string;
}) {
  async function clickEvent() {
    document.cookie =
      'id=;path=/;expires=Thu, 1-Jan-1970 00:00:00 GMT;';
    Cookies.remove('status');
    await fetch('/api/logoutIron');
    location.href = '/login';
  }
  return (
    <>
      <Head>
        <title>マイページ</title>
      </Head>
      <main className={myStyles.main}>
        <section className={myStyles.section}>
          <div className={myStyles.head}>
            <nav>
              <ol className={cModule.links} id="top">
                <li className={cModule.pageLink}>
                  <Link href="/">Bridge</Link>
                  <span className={cModule.greaterThan}>&gt;</span>
                </li>
                <li className={cModule.pageLink}>マイページ</li>
              </ol>
            </nav>
            <h1 className={myStyles.title}>マイページ</h1>
          </div>
          <div className={myStyles.body}>
            <div className={myStyles.container}>
              <div className={myStyles.cartTitle}>
                <div>
                  <h2>カートの商品</h2>
                </div>
              </div>
              <div className={myStyles.cartList}>
                <CurrentCartItems cookie={cookieValue} />
              </div>
              <div className={myStyles.cartLink}>
                <Link href="/cart">&gt;&gt;カート一覧</Link>
              </div>
            </div>
            <div className={myStyles.container}>
              <div className={myStyles.subtitle}>
                <h2>会員メニュー</h2>
              </div>
              <div className={myStyles.updateProfArea}>
                <button
                  type="button"
                  className={myStyles.updateProfButton}
                  onClick={() => (location.href = '/account/profile')}
                >
                  会員情報の確認/変更
                </button>
                <button
                  type="button"
                  className={myStyles.updateProfButton}
                  onClick={() =>
                    (location.href = '/account/password')
                  }
                >
                  パスワードの変更
                </button>
                <button
                  type="button"
                  className={myStyles.updateProfButton}
                  onClick={() => (location.href = '/account/history')}
                >
                  購入履歴
                </button>
              </div>
              <div className={myStyles.logout}>
                {/* <Link href="/login" className="logout"> */}
                  <button onClick={() => clickEvent()}>
                    ログアウト
                  </button>
                {/* </Link> */}
                {/* &gt;&gt;
                <Logout /> */}
                {/* <div>
                    <Link href="#">退会手続き</Link>
                  </div> */}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
