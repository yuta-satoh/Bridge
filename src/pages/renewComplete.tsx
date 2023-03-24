import Head from 'next/head';
import Link from 'next/link';
import urStyles from '../styles/userRegister.module.css';



export default function renewComplete() {

  return (
    <>
      <Head>
        <title>パスワード再設定完了</title>
      </Head>
      <main className={urStyles.main}>
        <div className={urStyles.body}>
          <div className={urStyles.title}>
            <h1 className={urStyles.h1}>パスワード再設定完了</h1>
          </div>
          <div className={urStyles.loginLink}>
            <Link href="/login">
              <button type="button" className={urStyles.linkButton}>
                ログインへ<span className={urStyles.buttonSpan}>→</span>
              </button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
