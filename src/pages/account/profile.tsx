import getCookieValue from '@/lib/getCookieValue';
import Head from 'next/head';

export async function getServerSideProps() {
  const cookie = getCookieValue();
  const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYXBpX3VzZXIifQ.OOP7yE5O_2aYFQG4bgMBQ9r0f9sikNqXbhJqoS9doTw';
  const res = await fetch(`http://127.0.0.1:8000/users?id=${cookie}`, {
    method: 'GET',
      headers: {
        "Authorization": `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
  });
}

export default function Profile() {
  return (
    <>
      <Head>
        <title>会員情報の確認/変更</title>
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
          height: 800px;
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
      `}</style>
      <main>
        <section>
          <div className="title">
            <h1>会員情報の確認/変更</h1>
          </div>
          <div className="body">
            <form>
              <div className="inputItems">
                <label htmlFor="lastName">お名前</label>
                <br />
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  // value={"変更前の姓"}
                  className="border border-neutral-500 rounded pl-2.5"
                />
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  // value={"変更前の名"}
                  className="border border-neutral-500 rounded pl-2.5"
                />
              </div>
              <div className="inputItems">
                <label htmlFor="female">性別</label>
                <br />
                <div className="radioField">
                  <div className="radioForm border-neutral-500 rounded pl-2.5">
                    {/* 変更前の性別を規定値に設定 */}
                    <input
                      type="radio"
                      name="gender"
                      id="female"
                      // value="female"
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
                      // value="male"
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
                      // value="other"
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
                <br />
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="inputParts border border-neutral-500 rounded pl-2.5"
                  // value={"変更前のメアド"}
                />
              </div>
              <div className="inputItems">
                <label htmlFor="tell">電話番号</label>
                <br />
                <input
                  type="tell"
                  name="tell"
                  id="tell"
                  className="number border border-neutral-500 rounded pl-2.5"
                  // value={"変更前の電話番号"}
                />
                <span>-</span>
                <input
                  type="tell"
                  name="tell"
                  id="tell2"
                  className="number border border-neutral-500 rounded pl-2.5"
                  // value={"変更前の電話番号"}
                />
                <span>-</span>
                <input
                  type="tell"
                  name="tell"
                  id="tell3"
                  className="number border border-neutral-500 rounded pl-2.5"
                  // value={"変更前の電話番号"}
                />
              </div>
              <div className="inputItems">
                <label htmlFor="zipcode">郵便番号</label>
                <br />
                <input
                  type="text"
                  pattern="^[0-9]+$"
                  name="zipcode"
                  id="zipcode"
                  className="number border border-neutral-500 rounded pl-2.5"
                  // value={"変更前の電話番号"}
                />
                <span>-</span>
                <input
                  type="text"
                  pattern="^[0-9]+$"
                  name="zipcode"
                  id="zipcode2"
                  className="number border border-neutral-500 rounded pl-2.5"
                  // value={"変更前の郵便番号"}
                />
                <button className="zipButton text-white bg-neutral-900 border border-neutral-900 rounded px-1">
                  住所検索
                </button>
              </div>
              <div className="inputItems">
                <label htmlFor="address">住所</label>
                <br />
                <input
                  type="text"
                  name="address"
                  id="address"
                  className="inputParts border border-neutral-500 rounded pl-2.5"
                  // value={"変更前の住所"}
                />
              </div>
              <div className="buttonArea">
                <button type="button" className="submitButton">
                  会員情報を変更
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
