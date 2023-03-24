import Head from 'next/head';
import Link from 'next/link';
import { ChangeEvent, SyntheticEvent, useState } from 'react';
import urStyles from '../styles/userRegister.module.css';
import { useRouter } from 'next/router';

export default function RememberPass() {
  // email, passwordの値を格納するState
  const [email, setEmail] = useState('');
  // エラー文
  const [errorText, setErrorText] = useState<string>('');

  const [buttonText, setButtonText] =
    useState('再登録用メールを送る');

  // ルーターを定義
  const rooter = useRouter();

  // inputの値をstateに格納するチェンジイベント
  function updateLoginData(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  // email, passwordの値がデータベースに存在するかを確認するSubmitイベント
  async function handleSubmitLogin(e: SyntheticEvent) {
    e.preventDefault();
    if (email.length === 0) {
      setErrorText('メールアドレスを入力してください');
      return;
    }
    const responce = await fetch('/api/checkEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(email),
    });
    if (responce.status === 200) {
      setErrorText('');
      setButtonText('メールを再送信する');
      try {
        await fetch('api/mailtrapForPass', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(email),
        }).then((res) => res.json());
      } catch (error) {
        console.error(error);
      }
      //   rooter.replace('/login');
    } else {
      setErrorText('登録されていないメールアドレスです');
    }
  }

  return (
    <>
      <Head>
        <title>再設定用メールを送る</title>
      </Head>
      <main className={urStyles.main}>
        <div className={urStyles.body}>
          <div className={urStyles.title}>
            <h1 className={urStyles.h1}>再設定用メールを送る</h1>
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
            <div className={urStyles.buttonArea}>
              <p className={urStyles.error}>{errorText}</p>
              <button type="submit" className={urStyles.loginButton}>
                {buttonText}
                <span className={urStyles.buttonSpan}>→</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
