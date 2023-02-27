import Head from 'next/head';
import Link from 'next/link';
import urStyles from '../styles/userRegister.module.css';

export default function completeRegister() {
  return (
    <>
      <Head>
        <title>会員登録完了</title>
      </Head>
      <main className={urStyles.main}>
        <div className={urStyles.combody}>
          <div className={urStyles.title}>
            <h1 className={urStyles.h1}>会員登録完了</h1>
          </div>
          <div className={urStyles.welcome}>
            <h2 className={urStyles.h1}>Welcome&nbsp;To&nbsp;Bridge!</h2>
          </div>
          <div className={urStyles.loginLink}>
            <Link href="/login">
              <button type="button" className={urStyles.linkButton}>
                ログイン<span className={urStyles.buttonSpan}>→</span>
              </button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
