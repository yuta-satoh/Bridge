import Head from 'next/head';
import Link from 'next/link';
import { ChangeEvent, SyntheticEvent, useState } from 'react';
import urStyles from '../styles/userRegister.module.css';
import { useRouter } from 'next/router';
import { handleSmoothScroll } from 'next/dist/shared/lib/router/router';
import Cookies from 'js-cookie';

export default function Login() {
  // email, passwordの値を格納するState
  const [loginData, setLoginData] = useState<{
    email: string;
    password: string;
  }>({
    email: '',
    password: '',
  });
  // エラー文
  const [errorText, setErrorText] = useState<string>("");

  // ルーターを定義
  const rooter = useRouter();

  // inputの値をstateに格納するチェンジイベント
  function updateLoginData(e: ChangeEvent<HTMLInputElement>) {
    setLoginData({
      ...loginData,
      [`${e.target.name}`]: e.target.value,
    });
  }

  // email, passwordの値がデータベースに存在するかを確認するSubmitイベント
  async function handleSubmitLogin(e: SyntheticEvent) {
    e.preventDefault();
    const responce = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });
    if (responce.status === 200) {
      setErrorText("");
      rooter.replace('/');
      Cookies.set('status', 'true');
    } else {
      setErrorText("メールアドレスかパスワードが間違っています");
    }
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
          <form
            className={urStyles.form}
            onSubmit={(e) => handleSubmitLogin(e)}
          >
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
            <p className={urStyles.error}>{errorText}</p>
              <button type="submit" className={urStyles.loginButton}>
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
