import Head from 'next/head';
import Link from 'next/link';
import userRegisterStyles from '../styles/userRegister.module.css';

export default function userRegister() {
  return (
    <>
      <Head>
        <title>新規会員登録</title>
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
          height: 1500px;
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
      `}</style>
      <main>
        <div className="body">
          <div className="title">
            <h1>JOIN TO Bridge</h1>
            <p>Bridge会員に登録する</p>
          </div>
          <form>
            <div className="inputItems">
              <label htmlFor="lastName">お名前</label>
              <span className="primary">必須</span>
              <br />
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="例：山田"
                className="border border-neutral-500 rounded pl-2.5"
              />
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="例：花子"
                className="border border-neutral-500 rounded pl-2.5"
              />
            </div>
            <div className="inputItems">
              <label htmlFor="female">性別</label>
              <span className="primary">必須</span>
              <br />
              <div className="radioField">
                <div className="radioForm border-neutral-500 rounded pl-2.5">
                  <input
                    type="radio"
                    name="gender"
                    id="female"
                    value="female"
                    className="radioButton"
                  />
                  <label htmlFor="female" className="genderLabel">
                    女性&emsp;
                  </label>
                </div>
                <div className="radioForm border-neutral-500 rounded pl-2.5">
                  <input
                    type="radio"
                    name="gender"
                    id="male"
                    value="male"
                    className="radioButton"
                  />
                  <label htmlFor="male" className="genderLabel">
                    男性&emsp;
                  </label>
                </div>
                <div className="radioForm border-neutral-500 rounded pl-2.5">
                  <input
                    type="radio"
                    name="gender"
                    id="other"
                    value="other"
                    className="radioButton"
                  />
                  <label htmlFor="other" className="genderLabel">
                    その他
                  </label>
                </div>
              </div>
            </div>
            <div className="inputItems">
              <label htmlFor="email">メールアドレス</label>
              <span className="primary">必須</span>
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
              <label htmlFor="tell">電話番号</label>
              <span className="primary">必須</span>
              <br />
              <input
                type="tell"
                name="tell"
                id="tell"
                className="number border border-neutral-500 rounded pl-2.5"
                placeholder="xxx"
              />
              <span>-</span>
              <input
                type="tell"
                name="tell"
                id="tell2"
                className="number border border-neutral-500 rounded pl-2.5"
                placeholder="xxxx"
              />
              <span>-</span>
              <input
                type="tell"
                name="tell"
                id="tell3"
                className="number border border-neutral-500 rounded pl-2.5"
                placeholder="xxxx"
              />
            </div>
            <div className="inputItems">
              <label htmlFor="zipcode">郵便番号</label>
              <span className="primary">必須</span>
              <br />
              <input
                type="text"
                pattern="^[0-9]+$"
                name="zipcode"
                id="zipcode"
                className="number border border-neutral-500 rounded pl-2.5"
                placeholder="xxx"
              />
              <span>-</span>
              <input
                type="text"
                pattern="^[0-9]+$"
                name="zipcode"
                id="zipcode2"
                className="number border border-neutral-500 rounded pl-2.5"
                placeholder="xxxx"
              />
              <button className="zipButton text-white bg-neutral-900 border border-neutral-900 rounded px-1">
                住所検索
              </button>
            </div>
            <div className="inputItems">
              <label htmlFor="address">住所</label>
              <span className="primary">必須</span>
              <br />
              <input
                type="text"
                name="address"
                id="address"
                className="inputParts border border-neutral-500 rounded pl-2.5"
                placeholder="例：東京都新宿区新宿2丁目x-x-x"
              />
            </div>
            <div className="inputItems">
              <label htmlFor="password">パスワード</label>
              <span className="primary">必須</span>
              <br />
              <input
                type="password"
                name="password"
                id="password"
                className="inputParts border border-neutral-500 rounded pl-2.5"
                placeholder="例：abcdef123456"
              />
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
              />
              <p>※確認のためパスワードを再入力して下さい</p>
              <br />
            </div>
            <div className="buttonArea">
              <button type="button" className="submitButton">
                会員登録をする<span className="buttonSpan">→</span>
              </button>
            </div>
            <div className="buttonArea">
              <button type="button" className="clearButton">
                入力クリア
              </button>
            </div>
          </form>
          <div className="title">
            <h1 className="subTitle">会員の方はこちら</h1>
          </div>
          <div className="loginLink">
            <Link href="/login">
              <button type="button" className="linkButton">
                ログイン<span className="buttonSpan">→</span>
              </button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
