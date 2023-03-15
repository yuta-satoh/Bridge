import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChangeEvent, SyntheticEvent, useState } from 'react';
import cModule from '../../../styles/coordination.module.css';
import urStyles from '../../../styles/userRegister.module.css';
import Auth from '../../auth/auth';

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

// passwordデータの型を定義
type Password = {
  password: string;
  newPassword: string;
  confirmationPassword: string;
};

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
  // クッキーの値を元にuserデータを取得
  const res = await fetch(
    `${process.env.SUPABASE_URL}/users?id=eq.${cookieValue}`,
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
    props: { Data, cookieValue },
  };
};

export default function Password({
  Data,
  cookieValue,
}: {
  Data: User;
  cookieValue: string;
}) {
  const initPassword = {
    password: '',
    newPassword: '',
    confirmationPassword: '',
  };
  // input入力値を格納
  const [passwords, setPasswords] = useState<Password>(initPassword);
  // エラー文を格納
  const [errorText, setErrorText] = useState<Password>(initPassword);
  // 送信完了可否のメッセージを格納
  const [completeText, setCompleteText] = useState<string>("");

  const rooter = useRouter();

  // エラーを検証
  // 現在のパスワードのチェック
  function passwordValidation(password: string) {
    if (password !== Data.password) return 'パスワードが一致しません';
    return '';
  }
  // 新しいパスワードのチェック
  const newPasswordValidation = (newPassword: string) => {
    if (!newPassword) return '※パスワードを入力して下さい';
    if (newPassword.length < 8 || newPassword.length > 20)
      return '※８文字以上２０文字以内で設定してください';
    return '';
  };
  // 確認用パスワードのチェック
  const samePasswordValidation = (confirmationPassword: string) => {
    if (!confirmationPassword)
      return '※確認用パスワードを入力して下さい';
    if (confirmationPassword !== passwords.newPassword)
      return '※パスワードと確認用パスワードが不一致です';
    return '';
  };
  // 上記3つの関数を統合
  const formValidate = (key: string, value: string) => {
    switch (key) {
      case 'password':
        return passwordValidation(value);
      case 'newPassword':
        return newPasswordValidation(value);
      case 'confirmationPassword':
        return samePasswordValidation(value);
    }
  };

  // onChangeハンドラ
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setPasswords({
      ...passwords,
      [`${e.target.name}`]: e.target.value,
    });
    setErrorText({
      ...errorText,
      [`${e.target.name}`]: formValidate(
        e.target.name,
        e.target.value
      ),
    });
  }

  // 送信チェック
  const canSubmit = (): boolean => {
    const validInfo =
      Object.values(passwords).filter((value) => {
        return value === '';
      }).length === 0;
    const validError =
      Object.values(errorText).filter((value) => {
        return value !== '' && value !== undefined;
      }).length === 0;
    return validInfo && validError;
  };

  // onSubmitハンドラ
  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    // 重複チェック
    const res = await fetch('/api/account/re_search_password', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ password: passwords.newPassword, cookie: cookieValue })
    });
    const data: { password: string } = await res.json();
    if (!canSubmit()) {
      if (!passwords.password) {
        setErrorText({
          ...errorText,
          password: '現在のパスワードを入力してください',
        });
      }
      if (!passwords.newPassword) {
        setErrorText({
          ...errorText,
          newPassword: '新しいパスワードを入力してください',
        });
      }
      if (!passwords.confirmationPassword) {
        setErrorText({
          ...errorText,
          confirmationPassword: '確認用パスワードを入力してください',
        });
      }
      setCompleteText("不正な項目があります");
      return;
    } else if (data.password) {
      setErrorText({
        ...errorText,
        newPassword: data.password,
      });
      setPasswords({
        ...passwords,
      });
      setCompleteText("不正な項目があります");
      return;
    } else {
      const res = await fetch('/api/account/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...Data,
          password: passwords.newPassword
        }),
      })
      if (res.ok) {
        setCompleteText("");
        rooter.replace('/account/password/complete');
      };
    }
  }

  return (
    <>
      <Head>
        <title>パスワードの変更</title>
      </Head>
      <style jsx>{`
        main {
          background-color: ;
          background-size: cover;
          width: 100%;
          max-height: 100%;
          display: flex;
        }
        section {
          background-color: rgba(255, 255, 255, 0.9);
          margin: 50px auto;
          width: 70%;
        }
        .title {
          text-align: center;
          border-bottom: 2px black solid;
          max-width: 425px;
          margin: 50px auto;
        }
        form {
          padding: 5px 100px;
          margin: auto;
          border: 1px solod black;
        }
        h1 {
          font-size: 30px;
        }
        p {
          font-size: 12px;
          padding-bottom: 15px;
        }
        input {
          border: 1px grey solid;
          height: 40px;
          margin: 5px 5px;
          padding: 0 10px;
        }
        .inputItems {
          padding-bottom: 10px;
          padding-left: 25px;
        }
        .number {
          width: 110px;
        }
        label {
          font-size: 13px;
          margin-bottom: 5px;
        }
        .genderLabel {
          font-size: 17px;
          margin: 0px;
        }
        .inputParts {
          width: 100%;
        }
        .zipButton {
          border: 1px black solid;
          font-size: 11px;
          background-color: black;
          padding: 8px 20px;
          color: white;
          font-weight: bold;
        }
        .buttonArea {
          text-align: center;
          margin-top: 30px;
        }
        .primary {
          font-size: 7px;
          margin-left: 5px;
          padding: 3px 9px;
          color: red;
          border: 1px red solid;
        }
        .loginLink {
          margin-top: 40px;
          text-align: center;
          margin: auto;
        }
        .subTitle {
          font-size: 25px;
          padding-bottom: 15px;
        }
        .submitButton {
          background-color: black;
          color: white;
          font-weight: bold;
          padding: 20px 60px;
          font-size: 17px;
        }
        .buttonSpan {
          padding-left: 15px;
        }
        .linkButton {
          border: 2.3px black solid;
          padding: 8px 60px;
          background-color: white;
          font-size: 13px;
          font-weight: bold;
        }
        .radioField {
          display: flex;
          justify-content: space-around;
          margin-top: 10px;
        }
        .radioForm {
          display: flex;
          align-items: center;
          border: 1px grey solid;
          padding: 5px 20px;
          background-color: white;
        }
        .radioButton {
          width: 17px;
        }
        .clearButton {
          background-color: white;
          color: black;
          font-weight: bold;
          border: 2.3px black solid;
          padding: 10px 40px;
          font-size: 14px;
        }
        .completeText {
          color: red;
          margin-top: 10px;
          font-size: 15px;
          font-weight: bold;
        }
      `}</style>
      <Auth>
      <main>
        <section>
          <div>
            <ol className={cModule.links} id="top">
              <li className={cModule.pageLink}>
                <Link href="/">Bridge</Link>
                <span className={cModule.greaterThan}>&gt;</span>
              </li>
              <li className={cModule.pageLink}>
                <Link href="/mypage">マイページ</Link>
                <span className={cModule.greaterThan}>&gt;</span>
              </li>
              <li className={cModule.pageLink}>パスワードの変更</li>
            </ol>
          </div>
          <div className="title">
            <h1>パスワードの変更</h1>
          </div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="inputItems">
              <label htmlFor="password">現在のパスワード</label>
              <span className="primary">必須</span>
              <br />
              <input
                type="password"
                name="password"
                id="password"
                className="inputParts border border-neutral-500 rounded pl-2.5"
                onChange={(e) => handleChange(e)}
              />
              <p className={urStyles.error}>{errorText.password}</p>
            </div>
            <div className="inputItems">
              <label htmlFor="newPassword">新しいパスワード</label>
              <span className="primary">必須</span>
              <br />
              <input
                type="password"
                name="newPassword"
                id="newPassword"
                className="inputParts border border-neutral-500 rounded pl-2.5"
                placeholder="例：abcdef123456"
                onChange={(e) => handleChange(e)}
              />
              <p className={urStyles.error}>
                {errorText.newPassword}
              </p>
              <p>※8〜20文字で入力してください</p>
            </div>
            <div className="inputItems">
              <label htmlFor="confirmationPassword">
                パスワード確認用
              </label>
              <span className="primary">必須</span>
              <br />
              <input
                type="password"
                name="confirmationPassword"
                id="confirmationPassword"
                className="inputParts border border-neutral-500 rounded pl-2.5"
                placeholder="例：abcdef123456"
                onChange={(e) => handleChange(e)}
              />
              <p className={urStyles.error}>
                {errorText.confirmationPassword}
              </p>
              <p>※確認のためパスワードを再入力して下さい</p>
              <br />
            </div>
            <div className="buttonArea">
              <button type="submit" className="submitButton">
                パスワードを変更
              </button>
              { completeText && <p className="completeText">{completeText}</p>}
            </div>
          </form>
        </section>
      </main>
      </Auth>
    </>
  );
}
