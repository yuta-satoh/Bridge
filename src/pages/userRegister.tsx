import Head from 'next/head';
import Link from 'next/link';
import urStyles from '../styles/userRegister.module.css';
import { useState, ChangeEvent, SyntheticEvent } from 'react';
import { useRouter } from 'next/router';
import { searchAddress, formValidate, checkInput } from '@/lib/register';

type User = {
  lastName: string,
  firstName: string,
  gender: string,
  tell1: string,
  tell2: string,
  tell3: string,
  email: string,
  zipcode1: string,
  zipcode2: string,
  address: string,
  password: string,
  confirmationPassword: string,
}

export default function UserRegister() {
  const initUserInfo = {
    lastName: "",
    firstName: "",
    gender: "",
    tell1: "",
    tell2: "",
    tell3: "",
    email: "",
    zipcode1: "",
    zipcode2: "",
    address: "",
    password: "",
    confirmationPassword: "",
  }

  const initBorderError = {
    lastName: false,
    firstName: false,
    gender: false,
    tell1: false,
    tell2: false,
    tell3: false,
    email: false,
    zipcode1: false,
    zipcode2: false,
    address: false,
    password: false,
    confirmationPassword: false,
  }

  const [userInfo, setUserInfo] = useState<User>(initUserInfo);
  const [errorText, setErrorText] = useState<User>(initUserInfo);
  const [borderError, setBorderError] = useState(initBorderError)
  const router = useRouter();

  const handleChange = (e: ChangeEvent) => {
    if (!(e.target instanceof HTMLInputElement)) {
        return;
    }
    const key = e.target.name;
    const value = e.target.value;
    setUserInfo({...userInfo, [key]: value});
    setErrorText({...errorText, [key]: formValidate(key, value, userInfo.password)})
    setBorderError({...borderError, [key]: false})
  }

  const canSubmit = (): boolean => {
    const validInfo = Object.values(userInfo).filter(value => {
        return value === '';
      }).length === 0;
    const validError = Object.values(errorText).filter(value => {
        return value !== '' && value !== undefined;
      }).length === 0;
    return validInfo && validError
  };

  const submitHandler = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!canSubmit()) {
      const check = checkInput(userInfo);
      setErrorText(check.newObjText)
      setBorderError(check.newObjIsError)
      return
    }

    if (
      userInfo.tell1.length + userInfo.tell2.length + userInfo.tell3.length < 10
      || userInfo.tell1.length + userInfo.tell2.length + userInfo.tell3.length >= 12
    ) {
      setErrorText({...errorText, tell1: "電話番号はXXXX-XXXX-XXXXの形式で入力して下さい"})
      return
    }


    const searchResult: {email: string, password: string} = await fetch("/api/userResister/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: userInfo.email, password: userInfo.password })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        return data;
      })

    if (searchResult.email !== "" && searchResult.password !== "") {
      setErrorText({...errorText, email: searchResult.email, password: searchResult.password});
    } else if (searchResult.email !== "") {
      setErrorText({...errorText, email: searchResult.email})
      setBorderError({...borderError, email: true})
    } else if (searchResult.password !== "") {
      setErrorText({...errorText, password: searchResult.password})
    } else {
      const postUser = {
        lastname: userInfo.lastName,
        firstname: userInfo.firstName,
        gender: userInfo.gender,
        tell: `${userInfo.tell1}-${userInfo.tell2}-${userInfo.tell3}`,
        email: userInfo.email,
        zipcode: `${userInfo.zipcode1}-${userInfo.zipcode2}`,
        address: userInfo.address,
        password: userInfo.password,
        delete: false,
      }
      
      try {
        await fetch("/api/userResister", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(postUser),
        })
        await fetch(`/api/userResister/createCart?email=${postUser.email}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
        })
        router.push("/completeRegister")
      } catch(e) {
        console.log(e);
      }
    }
  };

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
          <form className={urStyles.form} action="/api/register" method="post" onSubmit={submitHandler}>
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
                className={`${urStyles.input} border ${borderError.lastName ? urStyles.inputError : 'border-neutral-500'} rounded pl-2.5`}
                value={userInfo.lastName}
                onChange={handleChange}
              />
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="例：花子"
                className={`${urStyles.input} border ${borderError.firstName ? urStyles.inputError : 'border-neutral-500'} rounded pl-2.5`}
                value={userInfo.firstName}
                onChange={handleChange}
              />
              <p className={urStyles.error}>{errorText.lastName || errorText.firstName}</p>
            </div>
            <div className={urStyles.inputItems}>
              <label htmlFor="female" className={urStyles.label}>
                性別
              </label>
              <span className={urStyles.primary}>必須</span>
              <br />
              <div className={urStyles.radioField}>
                <div
                  className={`${urStyles.radioForm} border ${borderError.gender ? urStyles.inputError : 'border-neutral-500'} rounded pl-2.5`}
                >
                  <input
                    type="radio"
                    name="gender"
                    id="female"
                    value="female"
                    className={urStyles.radioButton}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="female"
                    className={urStyles.genderLabel}
                  >
                    女性&emsp;
                  </label>
                </div>
                <div
                  className={`${urStyles.radioForm} border ${borderError.gender ? urStyles.inputError : 'border-neutral-500'} rounded pl-2.5`}
                >
                  <input
                    type="radio"
                    name="gender"
                    id="male"
                    value="male"
                    className={urStyles.radioButton}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="male"
                    className={urStyles.genderLabel}
                  >
                    男性&emsp;
                  </label>
                </div>
                <div
                  className={`${urStyles.radioForm} border ${borderError.gender ? urStyles.inputError : 'border-neutral-500'} rounded pl-2.5`}
                >
                  <input
                    type="radio"
                    name="gender"
                    id="other"
                    value="other"
                    className={urStyles.radioButton}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="other"
                    className={urStyles.genderLabel}
                  >
                    その他
                  </label>
                </div>
              </div>
              <p className={urStyles.error}>{errorText.gender}</p>
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
                className={`${urStyles.inputParts} border ${borderError.email ? urStyles.inputError : 'border-neutral-500'} rounded pl-2.5`}
                placeholder="例：bridge@example.com"
                value={userInfo.email}
                onChange={handleChange}
              />
              <p className={urStyles.error}>{errorText.email}</p>
            </div>
            <div className={urStyles.inputItems}>
              <label htmlFor="tell" className={urStyles.label}>
                電話番号
              </label>
              <span className={urStyles.primary}>必須</span>
              <br />
              <input
                type="text"
                name="tell1"
                id="tell1"
                className={`${urStyles.number} border ${borderError.tell1 ? urStyles.inputError : 'border-neutral-500'} rounded pl-2.5`}
                placeholder="xxx"
                value={userInfo.tell1}
                onChange={handleChange}
              />
              <span>-</span>
              <input
                type="text"
                name="tell2"
                id="tell2"
                className={`${urStyles.number} border ${borderError.tell2 ? urStyles.inputError : 'border-neutral-500'} rounded pl-2.5`}
                placeholder="xxxx"
                value={userInfo.tell2}
                onChange={handleChange}
              />
              <span>-</span>
              <input
                type="text"
                name="tell3"
                id="tell3"
                className={`${urStyles.number} border ${borderError.tell3 ? urStyles.inputError : 'border-neutral-500'} rounded pl-2.5`}
                placeholder="xxxx"
                value={userInfo.tell3}
                onChange={handleChange}
              />
              <p className={urStyles.error}>{errorText.tell1 || errorText.tell2 || errorText.tell3}</p>
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
                name="zipcode1"
                id="zipcode1"
                className={`${urStyles.number} border ${borderError.zipcode1 ? urStyles.inputError : 'border-neutral-500'} rounded pl-2.5`}
                placeholder="xxx"
                value={userInfo.zipcode1}
                onChange={handleChange}
              />
              <span>-</span>
              <input
                type="text"
                pattern="^[0-9]+$"
                name="zipcode2"
                id="zipcode2"
                className={`${urStyles.number} border ${borderError.zipcode2 ? urStyles.inputError : 'border-neutral-500'} rounded pl-2.5`}
                placeholder="xxxx"
                value={userInfo.zipcode2}
                onChange={handleChange}
              />
              <button
                type='button'
                className={`${urStyles.zipButton} text-white bg-neutral-900 border border-neutral-900 rounded px-1`}
                onClick={async () => {
                  const result = await searchAddress(`${userInfo.zipcode1}${userInfo.zipcode2}`)
                  setUserInfo({...userInfo, address: result.address})
                  setErrorText({...errorText, zipcode1: result.error})
                }}
              >
                住所検索
              </button>
              <p className={urStyles.error}>{errorText.zipcode1 || errorText.zipcode2}</p>
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
                className={`${urStyles.inputParts} border ${borderError.address ? urStyles.inputError : 'border-neutral-500'} rounded pl-2.5`}
                placeholder="例：東京都新宿区新宿2丁目x-x-x"
                value={userInfo.address}
                onChange={handleChange}
              />
              <p className={urStyles.error}>{errorText.address}</p>
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
                data-testid="password"
                className={`${urStyles.inputParts} border ${borderError.password ? urStyles.inputError : 'border-neutral-500'} rounded pl-2.5`}
                placeholder="例：abcdef123456"
                value={userInfo.password}
                onChange={handleChange}
              />
              <p className={urStyles.error}>{errorText.password}</p>
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
                data-testid="confirmationPassword"
                className={`${urStyles.inputParts} border ${borderError.confirmationPassword ? urStyles.inputError : 'border-neutral-500'} rounded pl-2.5`}
                placeholder="例：abcdef123456"
                value={userInfo.confirmationPassword}
                onChange={handleChange}
              />
              <p className={urStyles.error}>{errorText.confirmationPassword}</p>
              <p className={urStyles.p}>
                ※確認のためパスワードを再入力して下さい
              </p>
              <br />
            </div>
            <div className={urStyles.buttonArea}>
              <button type="submit" className={urStyles.submitButton}>
                会員登録をする
                <span className={urStyles.buttonSpan}>→</span>
              </button>
            </div>
            <div className={urStyles.buttonArea}>
              <button type="button" className={urStyles.clearButton} onClick={() => setUserInfo(initUserInfo)}>
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
