import Head from 'next/head';
import Link from 'next/link';
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

  const searchUser = async (email: string, password: string) => {
    const searchResult: {email: boolean, password: boolean} = await fetch("/api/register/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: email, password: password })
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
    return searchResult
  }

  const nameValidation = (name: string) => {
    if (!name) return '名前を入力して下さい';
    return '';
  }

  const genderValidation = (gender: string) => {
    if (!gender) return "性別を選択して下さい"
  }

  const emailValidation = (email: string) => {
    if (!email) return "メールアドレスを入力して下さい";
    if (email.indexOf('@') === -1 || email.indexOf('@') === 0 || email.indexOf('@') === email.length-1) {
      return 'メールアドレスの形式が不正です';
    }
    return '';
  }

  const zipcodeValidation = (key: string, zipcode: string) => {
    switch (key) {
      case 'zipcode1':
        if (zipcode.length !== 3) return '郵便番号はXXX-XXXXの形式で入力してください';
        return '';
      case 'zipcode2':
        if (zipcode.length !== 4) return '郵便番号はXXX-XXXXの形式で入力してください';
        return '';
    }
  }

  const addressValidation = (address: string) => {
    if (!address) return '住所を入力して下さい';
    return '';
  }

  const telValidation = (tel: string) => {
    if (!tel) return '電話番号はXXXX-XXXX-XXXXの形式で入力してください';
    return '';
  }

  const passwordValidation = (password: string) => {
    if (!password) return 'パスワードを入力して下さい';
    if (password.length < 8 || password.length > 20) return "８文字以上２０文字以内で設定してください"
    return '';
  }

  const samePasswordValidation = (confirmationPassword: string) => {
    if (!confirmationPassword) return "確認用パスワードを入力して下さい"
    if (confirmationPassword !== userInfo.password) return 'パスワードと確認用パスワードが不一致です';
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
    } else if (e.target.value === "male") {
      setUserInfo({...userInfo, gender: "男"})
    } else {
      setUserInfo({...userInfo, gender: "その他"})
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
        setErrorText({...errorText, lastName: "名前を入力して下さい"})
      }
      if (!userInfo.gender) {
        setErrorText({...errorText, gender: "性別を選択して下さい"})
      }
      if (!userInfo.email) {
        setErrorText({...errorText, email: "メールアドレスを入力して下さい"})
      }
      if (!userInfo.tell1 || !userInfo.tell2 || !userInfo.tell3) {
        setErrorText({...errorText, tell1: "電話番号を入力して下さい"})
      }
      if (!userInfo.zipcode1 || !userInfo.zipcode2) {
        setErrorText({...errorText, zipcode1: "郵便番号を入力して下さい"})
      }
      if (!userInfo.address) {
        setErrorText({...errorText, address: "住所を入力して下さい"})
      }
      if (!userInfo.password) {
        setErrorText({...errorText, password: "パスワードを入力して下さい"})
      }
      if (!userInfo.confirmationPassword) {
        setErrorText({...errorText, confirmationPassword: "確認用パスワードを入力して下さい"})
      }
      return
    }

    const searchResult = await searchUser(userInfo.email, userInfo.password);
    if (!searchResult.email && !searchResult.password) {
      setErrorText({...errorText, email: "このメールアドレスはすでに使用されています", password: "このパスワードはすでに使用されています"});
    } else if (searchResult.email) {
      setErrorText({...errorText, email: "このメールアドレスはすでに使用されています"})
    } else if (searchResult.password) {
      setErrorText({...errorText, password: "このパスワードはすでに使用されています"})
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
      
      await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(postUser),
      })
        .then((res) => res.json())
        .then((data) => {
          router.push("/login")
        })
        .catch((err) => {
          console.log(err)
        })
    }

  };

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
          <form action="/api/register" method="post" onSubmit={submitHandler}>
            <div className="inputItems">
              <label htmlFor="lastName">お名前</label>
              <span className="primary">必須</span>
              <span>{errorText.lastName || errorText.firstName}</span>
              <br />
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="例：山田"
                className="border border-neutral-500 rounded pl-2.5"
                value={userInfo.lastName}
                onChange={handleChange}
              />
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="例：花子"
                className="border border-neutral-500 rounded pl-2.5"
                value={userInfo.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="inputItems">
              <label htmlFor="female">性別</label>
              <span className="primary">必須</span>
              <span>{errorText.gender}</span>
              <br />
              <div className="radioField">
                <div className="radioForm border-neutral-500 rounded pl-2.5">
                  <input
                    type="radio"
                    name="gender"
                    id="female"
                    value="female"
                    className="radioButton"
                    onChange={handleChangeGender}
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
                    onChange={handleChangeGender}
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
                    onChange={handleChangeGender}
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
              <span>{errorText.email}</span>
              <br />
              <input
                type="email"
                name="email"
                id="email"
                className="inputParts border border-neutral-500 rounded pl-2.5"
                placeholder="例：bridge@example.com"
                value={userInfo.email}
                onChange={handleChange}
              />
            </div>
            <div className="inputItems">
              <label htmlFor="tell">電話番号</label>
              <span className="primary">必須</span>
              <span>{errorText.tell1 || errorText.tell2 || errorText.tell3}</span>
              <br />
              <input
                type="text"
                name="tell1"
                id="tell1"
                className="number border border-neutral-500 rounded pl-2.5"
                placeholder="xxx"
                value={userInfo.tell1}
                onChange={handleChange}
              />
              <span>-</span>
              <input
                type="text"
                name="tell2"
                id="tell2"
                className="number border border-neutral-500 rounded pl-2.5"
                placeholder="xxxx"
                value={userInfo.tell2}
                onChange={handleChange}
              />
              <span>-</span>
              <input
                type="text"
                name="tell3"
                id="tell3"
                className="number border border-neutral-500 rounded pl-2.5"
                placeholder="xxxx"
                value={userInfo.tell3}
                onChange={handleChange}
              />
            </div>
            <div className="inputItems">
              <label htmlFor="zipcode">郵便番号</label>
              <span className="primary">必須</span>
              <span>{errorText.zipcode1 || errorText.zipcode2}</span>
              <br />
              <input
                type="text"
                pattern="^[0-9]+$"
                name="zipcode1"
                id="zipcode1"
                className="number border border-neutral-500 rounded pl-2.5"
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
                className="number border border-neutral-500 rounded pl-2.5"
                placeholder="xxxx"
                value={userInfo.zipcode2}
                onChange={handleChange}
              />
              <button
                type='button'
                className="zipButton text-white bg-neutral-900 border border-neutral-900 rounded px-1"
                onClick={searchAddress}
              >
                住所検索
              </button>
            </div>
            <div className="inputItems">
              <label htmlFor="address">住所</label>
              <span className="primary">必須</span>
              <span>{errorText.address}</span>
              <br />
              <input
                type="text"
                name="address"
                id="address"
                className="inputParts border border-neutral-500 rounded pl-2.5"
                placeholder="例：東京都新宿区新宿2丁目x-x-x"
                value={userInfo.address}
                onChange={handleChange}
              />
            </div>
            <div className="inputItems">
              <label htmlFor="password">パスワード</label>
              <span className="primary">必須</span>
              <span>{errorText.password}</span>
              <br />
              <input
                type="password"
                name="password"
                id="password"
                className="inputParts border border-neutral-500 rounded pl-2.5"
                placeholder="例：abcdef123456"
                value={userInfo.password}
                onChange={handleChange}
              />
              <p>※8〜20文字で入力してください</p>
            </div>
            <div className="inputItems">
              <label htmlFor="confirmationPassword">
                パスワード確認用
              </label>
              <span className="primary">必須</span>
              <span>{errorText.confirmationPassword}</span>
              <br />
              <input
                type="password"
                name="confirmationPassword"
                id="confirmationPassword"
                className="inputParts border border-neutral-500 rounded pl-2.5"
                placeholder="例：abcdef123456"
                value={userInfo.confirmationPassword}
                onChange={handleChange}
              />
              <p>※確認のためパスワードを再入力して下さい</p>
              <br />
            </div>
            <div className="buttonArea">
              <button type="submit" className="submitButton">
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
