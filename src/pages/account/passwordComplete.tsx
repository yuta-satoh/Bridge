import Head from 'next/head';
import Link from 'next/link';
import cModule from '../../styles/coordination.module.css';

export default function PasswordComplete() {
  return (
    <>
      <Head>
        <title>パスワード変更完了</title>
      </Head>
      <style jsx>{`
        main {
          background-color: ;
          background-size: cover;
          width: 100%;
          max-height: 100%;
          display: flex;
        }
        .container {
          background-color: rgba(255, 255, 255, 0.9);
          margin: 50px auto;
          width: 70%;
        }
        section {
          text-align: center;
          margin: 70px auto;
        }
        p {
          font-size: 30px;
          padding-bottom: 10px;
        }
        .link {
          color: rgb(29, 198, 245);
          text-decoration: underline;
        }
      `}</style>
      <main>
        <div className="container">
          <nav>
            <ol className={cModule.links} id="top">
              <li className={cModule.pageLink}>
                <Link href="/">Bridge</Link>
                <span className={cModule.greaterThan}>&gt;</span>
              </li>
              <li className={cModule.pageLink}>
                <Link href="/mypage">マイページ</Link>
                <span className={cModule.greaterThan}>&gt;</span>
              </li>
              <li className={cModule.pageLink}>
                <Link href="/account/password">パスワードの変更</Link>
                <span className={cModule.greaterThan}>&gt;</span>
              </li>
              <li className={cModule.pageLink}>パスワード変更完了</li>
            </ol>
          </nav>
          <section>
            <p>パスワードの変更が完了しました</p>
            <span className="link">
              <Link href="/mypage">マイページに戻る</Link>
            </span>
          </section>
        </div>
      </main>
    </>
  );
}
