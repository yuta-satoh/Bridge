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
          background-image: url('/images/curtain/curtain_jmodern_1.jpeg');
          background-size: cover;
          width: 100%;
          margin: 0;
          max-height: 100%;
          display: flex;
        }
        .body {
          background-color: rgba(255, 255, 255, 0.9);
          margin: auto;
          height: 1200px;
        }
        .title {
          text-align: center;
          border-bottom: 2px black solid;
          max-width: 425px;
          margin: auto;
        }
        form {
          padding: 50px 100px;
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
          font-size: 19px;
        }
        .inputParts {
          width: 100%;
        }
        .buttonArea {
          text-align: center;
          margin-top: 70px;
        }
        .primary {
          font-size: 7px;
          margin-left: 5px;
          padding: 3px 9px;
          color: red;
          border: 1px red solid;
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
              <input type="text" name="lastName" id="lastName" placeholder='例：山田'/>
              <input type="text" name="firstName" id="firstName" placeholder='例：花子'/>
            </div>
            <div className="inputItems">
              <fieldset>
                <label htmlFor="female">性別</label>
                <span className="primary">必須</span>
                <br />
                <input
                  type="radio"
                  name="gender"
                  id="female"
                  value="female"
                />
                <label htmlFor="female" className="genderLabel">
                  女性
                </label>
                <input
                  type="radio"
                  name="gender"
                  id="male"
                  value="male"
                />
                <label htmlFor="male" className="genderLabel">
                  男性
                </label>
                <input
                  type="radio"
                  name="gender"
                  id="other"
                  value="other"
                />
                <label htmlFor="other" className="genderLabel">
                  その他
                </label>
              </fieldset>
            </div>
            <div className="inputItems">
              <label htmlFor="email">メールアドレス</label>
              <span className="primary">必須</span>
              <br />
              <input
                type="email"
                name="email"
                id="email"
                className="inputParts"
                placeholder='例：bridge@example.com'
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
                className="number"
                placeholder='xxx'
              />
              <span>-</span>
              <input
                type="tell"
                name="tell"
                id="tell2"
                className="number"
                placeholder='xxxx'
              />
              <span>-</span>
              <input
                type="tell"
                name="tell"
                id="tell3"
                className="number"
                placeholder='xxxx'
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
                className="number"
                placeholder='xxx'
              />
              <span>-</span>
              <input
                type="text"
                pattern="^[0-9]+$"
                name="zipcode"
                id="zipcode2"
                className="number"
                placeholder='xxxx'
              />
              <button>住所検索</button>
            </div>
            <div className="inputItems">
              <label htmlFor="address">住所</label>
              <span className="primary">必須</span>
              <br />
              <input
                type="text"
                name="address"
                id="address"
                className="inputParts"
                placeholder='例：東京都新宿区新宿2丁目x-x-x'
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
                className="inputParts"
                placeholder='例：abcdef123456'
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
                className="inputParts"
                placeholder='例：abcdef123456'
              />
              <p>※確認のためパスワードを再入力して下さい</p>
              <br />
              <div className="buttonArea">
                <button type="button">会員登録をする</button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
