import { url } from 'inspector';
import Head from 'next/head';
import Link from 'next/link';
import urStyles from '../styles/userRegister.module.css';

export default function userRegister() {
  return (
    <>
      <Head>
        <title>新規会員登録</title>
      </Head>
      <main className={urStyles.main}>
        <div className={urStyles.urbody}>
          <div className={urStyles.title}>
            <h1 className={urStyles.h1}>JOIN TO Bridge</h1>
            <p className={urStyles.p}>Bridge会員に登録する</p>
          </div>
          <form className={urStyles.form}>
            <div className={urStyles.inputItems}>
              <label htmlFor="lastName" className={urStyles.label}>
                お名前
              </label>
              <span className={urStyles.primary}>必須</span>
              <br />
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="例：山田"
                className={`${urStyles.input} border border-neutral-500 rounded pl-2.5`}
              />
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="例：花子"
                className={`${urStyles.input} border border-neutral-500 rounded pl-2.5`}
              />
              <p className={urStyles.nope}>※名前を入力して下さい</p>
            </div>
            <div className={urStyles.inputItems}>
              <label htmlFor="female" className={urStyles.label}>
                性別
              </label>
              <span className={urStyles.primary}>必須</span>
              <br />
              <div className={urStyles.radioField}>
                <div
                  className={`${urStyles.radioForm} border border-neutral-500 rounded pl-2.5`}
                >
                  <input
                    type="radio"
                    name="gender"
                    id="female"
                    value="female"
                    className={urStyles.radioButton}
                  />
                  <label
                    htmlFor="female"
                    className={urStyles.genderLabel}
                  >
                    女性&emsp;
                  </label>
                </div>
                <div
                  className={`${urStyles.radioForm} border border-neutral-500 rounded pl-2.5`}
                >
                  <input
                    type="radio"
                    name="gender"
                    id="male"
                    value="male"
                    className={urStyles.radioButton}
                  />
                  <label
                    htmlFor="male"
                    className={urStyles.genderLabel}
                  >
                    男性&emsp;
                  </label>
                </div>
                <div
                  className={`${urStyles.radioForm} border border-neutral-500 rounded pl-2.5`}
                >
                  <input
                    type="radio"
                    name="gender"
                    id="other"
                    value="other"
                    className={urStyles.radioButton}
                  />
                  <label
                    htmlFor="other"
                    className={urStyles.genderLabel}
                  >
                    その他
                  </label>
                </div>
              </div>
              <p className={urStyles.nope}>※性別を選択して下さい</p>
            </div>
            <div className={urStyles.inputItems}>
              <label htmlFor="email" className={urStyles.label}>
                メールアドレス
              </label>
              <span className={urStyles.primary}>必須</span>
              <br />
              <input
                type="email"
                name="email"
                id="email"
                className={`${urStyles.inputParts} border border-neutral-500 rounded pl-2.5`}
                placeholder="例：bridge@example.com"
              />
              <p className={urStyles.nope}>
                ※メールアドレスを入力して下さい
              </p>
            </div>
            <div className={urStyles.inputItems}>
              <label htmlFor="tell" className={urStyles.label}>
                電話番号
              </label>
              <span className={urStyles.primary}>必須</span>
              <br />
              <input
                type="tell"
                name="tell"
                id="tell"
                className={`${urStyles.number} border border-neutral-500 rounded pl-2.5`}
                placeholder="xxx"
              />
              <span>-</span>
              <input
                type="tell"
                name="tell"
                id="tell2"
                className={`${urStyles.number} border border-neutral-500 rounded pl-2.5`}
                placeholder="xxxx"
              />
              <span>-</span>
              <input
                type="tell"
                name="tell"
                id="tell3"
                className={`${urStyles.number} border border-neutral-500 rounded pl-2.5`}
                placeholder="xxxx"
              />
              <p className={urStyles.nope}>
                ※電話番号を入力して下さい
              </p>
            </div>
            <div className={urStyles.inputItems}>
              <label htmlFor="zipcode" className={urStyles.label}>
                郵便番号
              </label>
              <span className={urStyles.primary}>必須</span>
              <br />
              <input
                type="text"
                pattern="^[0-9]+$"
                name="zipcode"
                id="zipcode"
                className={`${urStyles.number} border border-neutral-500 rounded pl-2.5`}
                placeholder="xxx"
              />
              <span>-</span>
              <input
                type="text"
                pattern="^[0-9]+$"
                name="zipcode"
                id="zipcode2"
                className={`${urStyles.number} border border-neutral-500 rounded pl-2.5`}
                placeholder="xxxx"
              />
              <button
                className={`${urStyles.zipButton} text-white bg-neutral-900 border border-neutral-900 rounded px-1`}
              >
                住所検索
              </button>
              <p className={urStyles.nope}>
                ※郵便番号を入力して下さい
              </p>
            </div>
            <div className={urStyles.inputItems}>
              <label htmlFor="address" className={urStyles.label}>
                住所
              </label>
              <span className={urStyles.primary}>必須</span>
              <br />
              <input
                type="text"
                name="address"
                id="address"
                className={`${urStyles.inputParts} border border-neutral-500 rounded pl-2.5`}
                placeholder="例：東京都新宿区新宿2丁目x-x-x"
              />
              <p className={urStyles.nope}>※住所を入力して下さい</p>
            </div>
            <div className={urStyles.inputItems}>
              <label htmlFor="password" className={urStyles.label}>
                パスワード
              </label>
              <span className={urStyles.primary}>必須</span>
              <br />
              <input
                type="password"
                name="password"
                id="password"
                className={`${urStyles.inputParts} border border-neutral-500 rounded pl-2.5`}
                placeholder="例：abcdef123456"
              />
              <p className={urStyles.nope}>
                ※パスワードを入力して下さい
              </p>
              <p className={urStyles.p}>
                ※8〜20文字で入力してください
              </p>
            </div>
            <div className={urStyles.inputItems}>
              <label
                htmlFor="confirmationPassword"
                className={urStyles.label}
              >
                パスワード確認用
              </label>
              <span className={urStyles.primary}>必須</span>
              <br />
              <input
                type="password"
                name="confirmationPassword"
                id="confirmationPassword"
                className={`${urStyles.inputParts} border border-neutral-500 rounded pl-2.5`}
                placeholder="例：abcdef123456"
              />
              <p className={urStyles.nope}>
                ※パスワード確認用を入力してください
              </p>
              <p className={urStyles.p}>
                ※確認のためパスワードを再入力して下さい
              </p>
              <br />
            </div>
            <div className={urStyles.buttonArea}>
              <button type="button" className={urStyles.submitButton}>
                会員登録をする
                <span className={urStyles.buttonSpan}>→</span>
              </button>
            </div>
            <div className={urStyles.buttonArea}>
              <button type="button" className={urStyles.clearButton}>
                入力クリア
              </button>
            </div>
          </form>
          <div className={urStyles.title}>
            <h2 className={urStyles.subTitle}>会員の方はこちら</h2>
          </div>
          <div className={urStyles.loginLink}>
            <Link href="/login">
              <button type="button" className={urStyles.linkButton}>
                ログイン<span className={urStyles.buttonSpan}>→</span>
              </button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
