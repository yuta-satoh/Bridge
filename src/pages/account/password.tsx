import Head from 'next/head';

export default function Password() {
  return (
    <>
      <Head>
        <title>パスワードの変更</title>
      </Head>
      <main>
        <section>
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
