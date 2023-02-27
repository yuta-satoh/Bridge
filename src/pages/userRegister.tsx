import Head from 'next/head';
import Link from 'next/link';
import urStyles from '../styles/userRegister.module.css';
import { useState, ChangeEvent, SyntheticEvent } from 'react';
import { useRouter } from 'next/router';

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

  const [userInfo, setUserInfo] = useState<User>(initUserInfo);
  const [errorText, setErrorText] = useState<User>(initUserInfo)
  const router = useRouter();

  const searchAddress = (e: React.FormEvent) => {
    const url = 'https://zipcoda.net/api?';
    if (userInfo.zipcode1 && userInfo.zipcode2) {
        const params = new URLSearchParams({ zipcode: `${userInfo.zipcode1}${userInfo.zipcode2}` })
        fetch(url + params)
            .then(response => response.json())
            .then(data => {
                const stateName: string = data.items[0].state_name;
                const townName: string = data.items[0].address;
                setUserInfo({...userInfo, address: `${stateName + townName}`})
            })
            .catch((err: ErrorEvent) => {
                console.log(err)
            });
    }
  }

  const nameValidation = (name: string) => {
    if (!name) return '※名前を入力して下さい';
    return '';
  }

  const genderValidation = (gender: string) => {
    if (!gender) return "※性別を選択して下さい"
  }

  const emailValidation = (email: string) => {
    if (!email) return "※メールアドレスを入力して下さい";
    if (email.indexOf('@') === -1 || email.indexOf('@') === 0 || email.indexOf('@') === email.length-1) {
      return '※メールアドレスの形式が不正です';
    }
    return '';
  }

  const zipcodeValidation = (key: string, zipcode: string) => {
    switch (key) {
      case 'zipcode1':
        if (zipcode.length !== 3) return '※郵便番号はXXX-XXXXの形式で入力してください';
        return '';
      case 'zipcode2':
        if (zipcode.length !== 4) return '※郵便番号はXXX-XXXXの形式で入力してください';
        return '';
    }
  }

  const addressValidation = (address: string) => {
    if (!address) return '※住所を入力して下さい';
    return '';
  }

  const telValidation = (tel: string) => {
    if (!tel) return '※電話番号はXXXX-XXXX-XXXXの形式で入力してください';
    return '';
  }

  const passwordValidation = (password: string) => {
    if (!password) return '※パスワードを入力して下さい';
    if (password.length < 8 || password.length > 20) return "※８文字以上２０文字以内で設定してください"
    return '';
  }

  const samePasswordValidation = (confirmationPassword: string) => {
    if (!confirmationPassword) return "※確認用パスワードを入力して下さい"
    if (confirmationPassword !== userInfo.password) return '※パスワードと確認用パスワードが不一致です';
    return '';
  }

  const formValidate = (key: string, value: string) => {
    switch (key) {
      case 'lastName':
      case 'firstName':
        return nameValidation(value);
      case 'gender':
        return genderValidation(value);
      case 'email':
        return emailValidation(value);
      case 'zipcode1':
      case 'zipcode2':
        return zipcodeValidation(key, value);
      case 'address':
        return addressValidation(value);
      case 'tel1':
      case 'tel2':
      case 'tel3':
        return telValidation(value);
      case 'password':
        return passwordValidation(value);
      case 'confirmationPassword':
        return samePasswordValidation(value);
    }
  }


  const handleChange = (e: ChangeEvent) => {
    if (!(e.target instanceof HTMLInputElement)) {
        return;
    }
    const key = e.target.name;
    const value = e.target.value;
    setUserInfo({...userInfo, [key]: value});
    setErrorText({...errorText, [key]: formValidate(key, value)})
  }

  const handleChangeGender = (e: ChangeEvent) => {
    if (!(e.target instanceof HTMLInputElement)) {
      return;
    }
    if (e.target.value === "female") {
      setUserInfo({...userInfo, gender: "女"})
      setErrorText({...errorText, gender: ""})
    } else if (e.target.value === "male") {
      setUserInfo({...userInfo, gender: "男"})
      setErrorText({...errorText, gender: ""})
    } else {
      setUserInfo({...userInfo, gender: "その他"})
      setErrorText({...errorText, gender: ""})
    }
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
      if (!userInfo.lastName || !userInfo.firstName) {
        setErrorText({...errorText, lastName: "※名前を入力して下さい"})
      }
      if (!userInfo.gender) {
        setErrorText({...errorText, gender: "※性別を選択して下さい"})
      }
      if (!userInfo.email) {
        setErrorText({...errorText, email: "※メールアドレスを入力して下さい"})
      }
      if (!userInfo.tell1 || !userInfo.tell2 || !userInfo.tell3) {
        setErrorText({...errorText, tell1: "※電話番号を入力して下さい"})
      }
      if (!userInfo.zipcode1 || !userInfo.zipcode2) {
        setErrorText({...errorText, zipcode1: "※郵便番号を入力して下さい"})
      }
      if (!userInfo.address) {
        setErrorText({...errorText, address: "※住所を入力して下さい"})
      }
      if (!userInfo.password) {
        setErrorText({...errorText, password: "※パスワードを入力して下さい"})
      }
      if (!userInfo.confirmationPassword) {
        setErrorText({...errorText, confirmationPassword: "※確認用パスワードを入力して下さい"})
      }
      return
    }

    const searchResult: {email: string, password: string} = await fetch("/api/register/search", {
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
        await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(postUser),
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
                className={`${urStyles.input} border border-neutral-500 rounded pl-2.5`}
                value={userInfo.lastName}
                onChange={handleChange}
              />
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="例：花子"
                className={`${urStyles.input} border border-neutral-500 rounded pl-2.5`}
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
                  className={`${urStyles.radioForm} border border-neutral-500 rounded pl-2.5`}
                >
                  <input
                    type="radio"
                    name="gender"
                    id="female"
                    value="female"
                    className={urStyles.radioButton}
                    onChange={handleChangeGender}
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
                    onChange={handleChangeGender}
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
                    onChange={handleChangeGender}
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
                className={`${urStyles.inputParts} border border-neutral-500 rounded pl-2.5`}
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
                className={`${urStyles.number} border border-neutral-500 rounded pl-2.5`}
                placeholder="xxx"
                value={userInfo.tell1}
                onChange={handleChange}
              />
              <span>-</span>
              <input
                type="text"
                name="tell2"
                id="tell2"
                className={`${urStyles.number} border border-neutral-500 rounded pl-2.5`}
                placeholder="xxxx"
                value={userInfo.tell2}
                onChange={handleChange}
              />
              <span>-</span>
              <input
                type="text"
                name="tell3"
                id="tell3"
                className={`${urStyles.number} border border-neutral-500 rounded pl-2.5`}
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
                className={`${urStyles.number} border border-neutral-500 rounded pl-2.5`}
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
                className={`${urStyles.number} border border-neutral-500 rounded pl-2.5`}
                placeholder="xxxx"
                value={userInfo.zipcode2}
                onChange={handleChange}
              />
              <button
               
                type='button'
                className={`${urStyles.zipButton} text-white bg-neutral-900 border border-neutral-900 rounded px-1`}
              
                onClick={searchAddress}
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
                className={`${urStyles.inputParts} border border-neutral-500 rounded pl-2.5`}
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
                className={`${urStyles.inputParts} border border-neutral-500 rounded pl-2.5`}
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
                className={`${urStyles.inputParts} border border-neutral-500 rounded pl-2.5`}
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
