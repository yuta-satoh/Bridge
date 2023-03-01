import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Logout from '@/components/Logout';
import cModule from '../styles/coordination.module.css';
import { GetServerSideProps } from 'next';
import CurrentCartItems from '@/components/currentCartItems';

export const getServerSideProps: GetServerSideProps = async( context ) => {
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
  if (cookieValue === undefined) return { props: {}, };
  return {
    props: {cookieValue}
  };
}

export default function Mypage( {cookieValue}: { cookieValue: string } ) {
  return (
    <>
      <Head>
        <title>マイページ</title>
      </Head>
      <style jsx>{`
        main {
          background-color: ;
          background-image: url('/images/background/backImg_mypage.jpg');
          background-size: cover;
          width: 100%;
          max-height: 100%;
          display: flex;
        }
        section {
          background-color: rgba(255, 255, 255, 0.9);
          margin: 50px auto;
          width: 90%;
        }
        .body {
          width: 80%;
          margin: auto;
        }
        .head {
          width: 80%;
          margin: 20px auto;
        }
        .container {
          margin: 50px auto;
        }
        h1 {
          font-size: 30px;
          font-weight: bold;
        }
        p {
          font-size: 12px;
          padding-bottom: 2px;
        }
        .subtitle {
          font-size: 25px;
        }
        .cartTitle {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid black;
          font-size: 25px;
        }
        .cartLink {
          color: rgb(29, 198, 245);
          font-size: 12px;
          font-weight: bold;
        }
        .cartList {
          margin: 10px auto;
          display: flex;
        }
        .subtitle {
          border-bottom: 1px solid black;
        }
        .updateProfArea {
          display: grid;
          grid-auto-columns: 1fr;
          grid-auto-flow: column;
          width: fit-content;
          gap: 1rem;
          place-items: center;
        }
        .updateProfButton {
          background-color: white;
          color: black;
          font-weight: bold;
          border: 2.3px black solid;
          padding: 10px 40px;
          font-size: 14px;
          text-decoration: underline;
          margin: 20px auto;
        }
      `}</style>
      <main>
        <section>
          <div className="head">
          <nav>
            <ol className={cModule.links} id="top">
              <li className={cModule.pageLink}>
                <Link href="/">Bridge</Link>
                <span className={cModule.greaterThan}>&gt;</span>
              </li>
              <li className={cModule.pageLink}>マイページ</li>
            </ol>
          </nav>
            <h1>マイページ</h1>
          </div>
          <div className="body">
            <div className="container">
              <div className="cartTitle">
                <div>
                  <h2>カートの商品</h2>
                </div>
              </div>
              <div className="cartList">
               <CurrentCartItems cookie={cookieValue}/>
              </div>
              <div>
                  <span className="cartLink">
                    <Link
                      href="/cart"
                      className="textBottom"
                    >
                      すべて見る
                    </Link>
                  </span>
                </div>
            </div>
            <div className="container">
              <div className="subtitle">
                <h2>会員情報</h2>
              </div>
              <div className='updateProfArea'>
                  <button type="button" className='updateProfButton' onClick={() => location.href='/account/profile'}>
                      会員情報の確認/変更
                  </button>
                  <button type="button" className='updateProfButton' onClick={() => location.href='/account/password'}>
                      パスワードの変更
                  </button>
              </div>
            </div>
            <div className="container">
              <div className="subtitle">
                <h2>ログアウト/退会</h2>
              </div>
              <div>
                <Logout />
              </div>
              <div>
                <Link href="#">
                  退会手続き
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
