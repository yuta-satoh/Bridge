import Head from 'next/head';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { ChangeEvent, SyntheticEvent, useState } from 'react';
import urStyles from '../styles/userRegister.module.css';
import { useRouter } from 'next/router';
import { withIronSessionSsr } from 'iron-session/next';
import { sessionOptions } from '@/lib/session';

// userデータの型を定義
type User = {
  id: number;
  lastname: string;
  firstname: string;
  gender: 'male' | 'female' | 'other';
  tell: string;
  email: string;
  zipcode: string;
  address: string;
  password: string;
  delete: Boolean;
};

export const getServerSideProps: GetServerSideProps =
  withIronSessionSsr(async ({ req }) => {
    // クッキーの値の取得
    const email = req.session.email?.email;
    const res = await fetch(
      `${process.env.SUPABASE_URL}/users?email=eq.${email}`,
      {
        method: 'GET',
        headers: {
          apikey: `${process.env.SUPABASE_API_KEY}`,
          Authorization: `Bearer ${process.env.SUPABASE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    const rawData: User[] = await res.json();
    const Data: User = rawData[0];

    return {
      props: Data,
    };
  }, sessionOptions);

export default function RenewPass(Data: User) {
  // passwordの値を格納するState
  const [password, setPassword] = useState({
    password: '',
    Cpassword: '',
  });
  // エラー文
  const [errorTextPass, setErrorTextPass] = useState<string>();
  const [errorTextCPass, setErrorTextCPass] = useState<string>();

  // ルーターを定義
  const rooter = useRouter();

  // inputの値をstateに格納するチェンジイベント
  function updatePass(e: ChangeEvent<HTMLInputElement>) {
    setPassword({
      ...password,
      [`${e.target.name}`]: e.target.value,
    });
    setErrorTextPass(passwordValidation(e.target.value))
  }
  function updateCPass(e: ChangeEvent<HTMLInputElement>) {
    setPassword({
      ...password,
      [`${e.target.name}`]: e.target.value,
    });
  }

  const passwordValidation = (password: string) => {
    const regax =
      /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9!"#$%]{0,100}$/;
    const regaxInput = /^[a-zA-Z0-9!"#$%]{0,100}$/;
    if (!password) return '※パスワードを入力して下さい';
    if (!regaxInput.test(password))
      return '※半角英数字の大文字と小文字、数字、記号(!"#$%)のみ使用可能です';
    if (!regax.test(password))
      return '※英数字を組み合わせたパスワードにして下さい';
    if (password.length < 8 || password.length > 20)
      return '※８文字以上２０文字以内で設定してください';
    return '';
  };

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    if (password.password !== password.Cpassword) {
      setErrorTextCPass('確認用パスワードと一致しません');
      return;
    }
    const error = errorTextPass;
    if (!password.password) {
      setErrorTextPass('※パスワードを入力して下さい')
      return;
    } else if (
      error !== '' &&
      password.password !== password.Cpassword
    ) {
      setErrorTextCPass('確認用パスワードと一致しません');
      return;
    } else if (error !== '') {
      setErrorTextCPass('');
      return;
    }
    const res = await fetch('/api/renewPass', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...Data,
        password: password.password,
      }),
    });
    if (res.ok) {
      setErrorTextPass('');
      setErrorTextCPass('');
      rooter.replace('/renewComplete');
    }
  }

  return (
    <>
      <Head>
        <title>パスワード再設定</title>
      </Head>
      <main className={urStyles.main}>
        <div className={urStyles.body}>
          <div className={urStyles.title}>
            <h1 className={urStyles.h1}>パスワード再設定</h1>
          </div>
          <form
            className={urStyles.form}
            onSubmit={(e) =>  handleSubmit(e)}
          >
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
                onChange={(e) => updatePass(e)}
              />
              <p className={urStyles.error}>{errorTextPass}</p>
            </div>
            <div className={urStyles.inputItems}>
              <label htmlFor="Cpassword" className={urStyles.label}>
                確認用パスワード
              </label>
              <br />
              <input
                type="password"
                name="Cpassword"
                id="Cpassword"
                className={`${urStyles.inputParts} border border-neutral-500 rounded pl-2.5`}
                placeholder="例：abcdef123456"
                onChange={(e) => updateCPass(e)}
              />
              <p className={urStyles.error}>{errorTextCPass}</p>
            </div>
            <div className={urStyles.buttonArea}>
              <button type="submit" className={urStyles.loginButton}>
                再設定する
                <span className={urStyles.buttonSpan}>→</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
