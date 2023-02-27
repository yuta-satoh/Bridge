import Head from 'next/head';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import urStyles from '../styles/userRegister.module.css';

export default function Login() {
  // email, passwordの値を格納するState
  const [loginData, setLoginData] = useState<{email: string; password: string;}>({
    email: "",
    password: "",
  });

  // inputの値をstateに格納するチェンジイベント
  function updateLoginData(e: ChangeEvent<HTMLInputElement>) {
    setLoginData({
      ...loginData,
      [`${e.target.name}`]: e.target.value,
    });
    console.log('loginData', loginData);
  }

  return (
    <>
      <Head>
        <title>ログイン</title>
      </Head>
      <main className={urStyles.main}>
        <div className={urStyles.body}>
          <div className={urStyles.title}>
            <h1 className={urStyles.h1}>LOGIN</h1>
            <p className={urStyles.p}>ログイン</p>
          </div>
          <form className={urStyles.form}>
            <div className={urStyles.inputItems}>
              <label htmlFor="email" className={urStyles.label}>
                メールアドレス
              </label>
              <br />
              <input
                type="email"
                name="email"
                id="email"
                className={`${urStyles.inputParts} border border-neutral-500 rounded pl-2.5`}
                placeholder="例：bridge@example.com"
                onChange={(e) => updateLoginData(e)}
              />
              <p className={urStyles.nope}>
                ※メールアドレスを入力して下さい
              </p>
            </div>
            <div className={urStyles.inputItems}>
              <label htmlFor="password" className={urStyles.label}>
                パスワード
              </label>
              <br />
              <input
                type="password"
                name="password"
                id="password"
                className={`${urStyles.inputParts} border border-neutral-500 rounded pl-2.5`}
                placeholder="例：abcdef123456"
                onChange={(e) => updateLoginData(e)}
              />
              <p className={urStyles.nope}>
                ※パスワードを入力して下さい
              </p>
            </div>
            <div className={urStyles.buttonArea}>
              <button type="button" className={urStyles.loginButton}>
                ログイン<span className={urStyles.buttonSpan}>→</span>
              </button>
            </div>
          </form>
          <div className={urStyles.title}>
            <h2 className={`${urStyles.subTitle}`}>
              はじめてご利用のお客様はこちら
            </h2>
          </div>
          <div className={urStyles.loginLink}>
            <Link href="/userRegister">
              <button type="button" className={urStyles.linkButton}>
                新規会員登録
                <span className={urStyles.buttonSpan}>→</span>
              </button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
