import Head from 'next/head';

export default function Profile() {
  return (
    <>
      <Head>
        <title>お客様情報の編集</title>
      </Head>
      <main>
        <section>
          <div className="title">
            <h1>お客様情報の編集</h1>
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
                  value={"変更前の姓"}
                  className="border border-neutral-500 rounded pl-2.5"
                />
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={"変更前の名"}
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
                <br />
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="inputParts border border-neutral-500 rounded pl-2.5"
                  value={"変更前のメアド"}
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
                  value={"変更前の電話番号"}
                />
                <span>-</span>
                <input
                  type="tell"
                  name="tell"
                  id="tell2"
                  className="number border border-neutral-500 rounded pl-2.5"
                  value={"変更前の電話番号"}
                />
                <span>-</span>
                <input
                  type="tell"
                  name="tell"
                  id="tell3"
                  className="number border border-neutral-500 rounded pl-2.5"
                  value={"変更前の電話番号"}
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
                  value={"変更前の電話番号"}
                />
                <span>-</span>
                <input
                  type="text"
                  pattern="^[0-9]+$"
                  name="zipcode"
                  id="zipcode2"
                  className="number border border-neutral-500 rounded pl-2.5"
                  value={"変更前の郵便番号"}
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
                  value={"変更前の住所"}
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
