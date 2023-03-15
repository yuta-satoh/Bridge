import Head from 'next/head';
import Link from 'next/link';
import cModule from '../../../styles/coordination.module.css';
import Auth from '@/pages/auth/auth';
import cpStyles from '../../../styles/account/password/complete.module.css';

export default function PasswordComplete() {
  return (
    <>
      <Head>
        <title>パスワード変更完了</title>
      </Head>
      <Auth>
        <main className={cpStyles.main}>
          <div className={cpStyles.container}>
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
                  <Link href="/account/password">
                    パスワードの変更
                  </Link>
                  <span className={cModule.greaterThan}>&gt;</span>
                </li>
                <li className={cModule.pageLink}>
                  パスワード変更完了
                </li>
              </ol>
            </nav>
            <section className={cpStyles.section}>
              <p className={cpStyles.complete}>パスワードの変更が完了しました</p>
              <span className="link">
                <Link href="/mypage">マイページに戻る</Link>
              </span>
            </section>
          </div>
        </main>
      </Auth>
    </>
  );
}
