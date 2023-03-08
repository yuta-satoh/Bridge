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
    if (!gender) return "※性別を選択して下さい";
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
        if (zipcode.length !== 3) return '※郵便番号はXXX-XXXXの形式で入力して下さい';
        return '';
      case 'zipcode2':
        if (zipcode.length !== 4) return '※郵便番号はXXX-XXXXの形式で入力して下さい';
        return '';
    }
  }

  const addressValidation = (address: string) => {
    if (!address) return '※住所を入力して下さい';
    return '';
  }

  const telValidation = (tell: string) => {
    if (!tell) return '※電話番号はXXXX-XXXX-XXXXの形式で入力してください';
    return '';
  }

  const passwordValidation = (password: string) => {
    const regax = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9!"#$%]{0,100}$/;
    const regaxInput = /^[a-zA-Z0-9!"#$%]{0,100}$/;
    if (!password) return '※パスワードを入力して下さい';
    if (!regaxInput.test(password)) return '※半角英数字の大文字と小文字、数字、記号(!"#$%)のみ使用可能です'
    if (!regax.test(password)) return "※英数字を組み合わせたパスワードにして下さい"
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
      case 'tell1':
      case 'tell2':
      case 'tell3':
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

  const checkInput = () => {
    const keys = Object.keys(userInfo);
    const values = Object.values(userInfo);
    const valueIndex = values.flatMap((value, index) => !value ? index : [])
    const filterKeys = keys.flatMap((key, index) => valueIndex.includes(index) ? key : [])
    const newObjText = initUserInfo
    const newObjIsError = initBorderError
    filterKeys.forEach((key) => {
      switch (key) {
        case 'lastName':
          newObjText.lastName = '※名前を入力して下さい'
          newObjIsError.lastName = true;
        case 'firstName':
          newObjText.firstName = '※名前を入力して下さい'
          newObjIsError.firstName = true;
          break
        case 'gender':
          newObjText.gender = '※性別を選択して下さい'
          newObjIsError.gender = true;
          break
        case 'email':
          newObjText.email = '※メールアドレスを入力して下さい'
          newObjIsError.email = true;
          break
        case 'zipcode1':
          newObjText.zipcode1 = '※郵便番号を入力して下さい'
          newObjIsError.zipcode1 = true;
        case 'zipcode2':
          newObjText.zipcode2 = '※郵便番号を入力して下さい'
          newObjIsError.zipcode2 = true;
          break
        case 'address':
          newObjText.address = '※住所を入力して下さい'
          newObjIsError.address = true;
          break
        case 'tell1':
          newObjText.tell1 = '※電話番号を入力して下さい'
          newObjIsError.tell1 = true;
        case 'tell2':
          newObjText.tell2 = '※電話番号を入力して下さい'
          newObjIsError.tell2 = true;
        case 'tell3':
          newObjText.tell3 = '※電話番号を入力して下さい'
          newObjIsError.tell3 = true;
          break
        case 'password':
          newObjText.password = '※パスワードを入力して下さい'
          newObjIsError.password = true;
          break
        case 'confirmationPassword':
          newObjText.confirmationPassword = '※確認用パスワードを入力して下さい'
          newObjIsError.confirmationPassword = true;
          break
      }
    })
    setErrorText(newObjText);
    setBorderError(newObjIsError);
  }

  const submitHandler = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    checkInput();

    if (!canSubmit()) {
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
              <button type="submit" disabled={!canSubmit()} className={urStyles.submitButton}>
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
