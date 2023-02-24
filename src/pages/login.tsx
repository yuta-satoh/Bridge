import Head from 'next/head';
import Link from 'next/link';
import userRegisterStyles from '../styles/userRegister.module.css';

export default function userRegister() {
  return (
    <>
      <Head>
        <title>ログイン</title>
      </Head>
      <style jsx>{`
        main {
          background-color: ;
          background-image: url('/images/background_login/backgroundimage.jpeg');
          background-size: cover;
          width: 100%;
          max-height: 100%;
          display: flex;
        }
        .body {
          background-color: rgba(255, 255, 255, 0.9);
          margin: 50px auto;
          height: 900px;
          width: 45%;
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
        label {
          font-size: 13px;
          margin-bottom: 5px;
        }
        .inputParts {
          width: 100%;
        }
        .buttonArea {
          text-align: center;
          margin-top: 30px;
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
      `}</style>
      <main>
        <div className="body">
          <div className="title">
            <h1>LOGIN</h1>
            <p>ログイン</p>
          </div>
          <form>
            <div className="inputItems">
              <label htmlFor="email">メールアドレス</label>
              <br />
              <input
                type="email"
                name="email"
                id="email"
                className="inputParts border border-neutral-500 rounded pl-2.5"
                placeholder="例：bridge@example.com"
              />
            </div>
            <div className="inputItems">
              <label htmlFor="password">パスワード</label>
              <br />
              <input
                type="password"
                name="password"
                id="password"
                className="inputParts border border-neutral-500 rounded pl-2.5"
                placeholder="例：abcdef123456"
              />
            </div>
            <div className="buttonArea">
              <button type="button" className="submitButton">
                ログイン<span className="buttonSpan">→</span>
              </button>
            </div>
          </form>
          <div className="title">
            <h1 className="subTitle">はじめてのお客様はこちら</h1>
          </div>
          <div className="loginLink">
            <Link href="/userRegister">
              <button type="button" className="linkButton">
                新規会員登録<span className="buttonSpan">→</span>
              </button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
