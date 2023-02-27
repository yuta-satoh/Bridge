import Head from 'next/head';

export default function Password() {
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
      `}</style>
      <main>
        <section>
          <div className='title'>
            <h1>パスワードの変更</h1>
          </div>
          <form>
          <div className="inputItems">
              <label htmlFor="password">現在のパスワード</label>
              <span className="primary">必須</span>
              <br />
              <input
                type="password"
                name="password"
                id="password"
                className="inputParts border border-neutral-500 rounded pl-2.5"
              />
            </div>
            <div className="inputItems">
              <label htmlFor="password">新しいパスワード</label>
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
                  パスワードを変更
                </button>
              </div>
          </form>
        </section>
      </main>
    </>
  );
}
