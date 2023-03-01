import Head from 'next/head';
import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import urStyles from '../../styles/userRegister.module.css';

// userデータの型を定義
type User = {
  id: number;
  lastname: string;
  firstname: string;
  gender: 'male' | 'female' | 'other';
  tell: string;
  email: string;
  zipcode: string;
  address: string;
  password: string;
  delete: Boolean;
};
// errorTextの型定義
type ErrorText = {
    lastname: string,
    firstname: string,
    gender: string,
    tell: string,
    tell2: string,
    tell3: string,
    email: string,
    zipcode: string,
    zipcode2: string,
    address: string,
}

export const getServerSideProps: GetServerSideProps = async (
  context
) => {
  // クッキーの値の取得
  const cookie = context.req.headers.cookie;
  const cookieValue = ((cookie: string | undefined) => {
    if (typeof cookie !== 'undefined') {
      const cookies = cookie.split(';');

      // 配列cookiesを=で分割して代入し、
      // 0番目の要素が"id"なら1番目の要素(cookieの値)を返す
      for (let cookie of cookies) {
        const cookiesArray = cookie.split('=');
        if (cookiesArray[0].trim() === 'id') {
          return cookiesArray[1]; // (key[0],value[1])
        }
      }
    }

    // 上記の処理で何もリターンされなければ空文字を返す
    return '';
  })(cookie);
  
  // TOKEN定義
  const TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYXBpX3VzZXIifQ.OOP7yE5O_2aYFQG4bgMBQ9r0f9sikNqXbhJqoS9doTw';

  // クッキーの値を元にuserデータを取得
  const res = await fetch(
    `http://127.0.0.1:8000/users?id=eq.${cookieValue}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  );
  const rawData: User[] = await res.json();
  const data: User = rawData[0]

  // ユーザーをpropsに渡す
  return {
    props: { data, cookieValue },
  };
};

export default function Profile({ data, cookieValue }: { data: User; cookieValue: string }) {
  const [profile, setProfile] = useState<User>(data);
  const [tell, setTell] = useState<string[]>(data.tell.split("-"));
  const [zipcode, setZipcode] = useState<string[]>(data.zipcode.split("-"));
  const [errorText, setErrorText] = useState<ErrorText>({
    lastname: "",
    firstname: "",
    gender: "",
    tell: "",
    tell2: "",
    tell3: "",
    email: "",
    zipcode: "",
    zipcode2: "",
    address: "",
  });
  const [completeText, setCompleteText] = useState<string>("");

    // エラー検証
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
        case 'zipcode':
          if (Number.isNaN(Number(zipcode))) return '※郵便番号は半角数字で入力してください';
          if (zipcode.length !== 3) return '※郵便番号はXXX-XXXXの形式で入力してください';
          return '';
        case 'zipcode2':
          if (Number.isNaN(Number(zipcode))) return '※郵便番号は半角数字で入力してください'
          if (zipcode.length !== 4) return '※郵便番号はXXX-XXXXの形式で入力してください';
          return '';
      }
    }
  
    const addressValidation = (address: string) => {
      if (!address) return '※住所を入力して下さい';
      return '';
    }
  
    const telValidation = (tell: string) => {
      if (!tell) return '※電話番号はXXXX-XXXX-XXXXの形式で入力してください';
      if (Number.isNaN(Number(tell))) return '※電話番号は半角数字で入力してください'
      return '';
    }
  
    const formValidate = (key: string, value: string) => {
      switch (key) {
        case 'lastname':
        case 'firstname':
          return nameValidation(value);
        case 'gender':
          return genderValidation(value);
        case 'email':
          return emailValidation(value);
        case 'zipcode':
        case 'zipcode2':
          return zipcodeValidation(key, value);
        case 'address':
          return addressValidation(value);
        case 'tell':
        case 'tell2':
        case 'tell3':
          return telValidation(value);
      }
    }

  // valueをstateに格納するonChangeハンドラ
  // tell/zipcodeは別の関数を使用
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setProfile({
      ...profile,
      [`${e.target.name}`]: e.target.value,
    });
    setErrorText({
      ...errorText,
      [`${e.target.name}`]: formValidate(e.target.name, e.target.value),
    }); 
  }

  // tellを"-"で結合してprofileに格納するonChangeハンドラ
  function handleTellChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.name === "tell") {
      setTell([
        tell[0] = e.target.value,
        tell[1] = tell[1],
        tell[2] = tell[2],
      ]);
    } else if (e.target.name === "tell2") {
      setTell([
        tell[0] = tell[0],
        tell[1] = e.target.value,
        tell[2] = tell[2],
      ]);
    } else {
      setTell([
        tell[0] = tell[0],
        tell[1] = tell[1],
        tell[2] = e.target.value,
      ]);
    }
    setProfile({
      ...profile,
      tell: `${tell[0] + "-" + tell[1] + "-" + tell[2]}`
    });
    setErrorText({
      ...errorText,
      [`${e.target.name}`]: formValidate(e.target.name, e.target.value),
    }); 
  }

  // zipcodeを"-"で結合してprofileに格納するonChangeハンドラ
  function handleZipcodeChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.name === "zipcode") {
      setZipcode([
        zipcode[0] = e.target.value,
        zipcode[1] = zipcode[1],
      ]);
    } else {
      setZipcode([
        zipcode[0] = zipcode[0],
        zipcode[1] = e.target.value,
      ]);
    }
    setProfile({
      ...profile,
      zipcode: `${zipcode[0] + "-" + zipcode[1]}`
    });
    setErrorText({
      ...errorText,
      [`${e.target.name}`]: formValidate(e.target.name, e.target.value),
    }); 
  }

  // 郵便番号検索
  function searchAddress() {
    const url = 'https://zipcoda.net/api?';
    if (zipcode[0] && zipcode[1]) {
      const params = new URLSearchParams({ zipcode: `${zipcode[0]}${zipcode[1]}` })
      fetch(url + params)
          .then(response => response.json())
          .then(data => {
              const stateName: string = data.items[0].state_name;
              const townName: string = data.items[0].address;
              setProfile({...profile, address: `${stateName + townName}`})
          })
          .catch((err: ErrorEvent) => {
              console.log(err)
          });
    }
  }

  // 送信チェック
  const canSubmit = (): boolean => {
    const validInfo = Object.values(profile).filter(value => {
        return value === '';
      }).length === 0;
    const validError = Object.values(errorText).filter(value => {
        return value !== '' && value !== undefined;
      }).length === 0;
    return validInfo && validError
  };

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    if (!canSubmit()) {
      if (!profile.lastname || !profile.firstname) {
        setErrorText({...errorText, lastname: "※名前を入力して下さい"})
      }
      if (!profile.gender) {
        setErrorText({...errorText, gender: "※性別を選択して下さい"})
      }
      if (!profile.email) {
        setErrorText({...errorText, email: "※メールアドレスを入力して下さい"})
      }
      if (!tell[0] || !tell[1] || !tell[2]) {
        setErrorText({...errorText, tell: "※電話番号を入力して下さい"})
      }
      if (!zipcode[0] || !zipcode[1]) {
        setErrorText({...errorText, zipcode: "※郵便番号を入力して下さい"})
      }
      if (!profile.address) {
        setErrorText({...errorText, address: "※住所を入力して下さい"})
      }
      setCompleteText("不正な項目があります");
      return
    } else {
      setCompleteText("変更が完了しました");
      const TOKEN =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYXBpX3VzZXIifQ.OOP7yE5O_2aYFQG4bgMBQ9r0f9sikNqXbhJqoS9doTw';
      const res = await fetch(`http://127.0.0.1:8000/users?id=eq.${cookieValue}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      })
    }
    
  }

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
          height: 1000px;
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
        .completeText {
          color: red;
          margin-top: 10px;
          font-size: 15px;
          font-weight: bold;
        }
      `}</style>
      <main>
        <section>
          <div className="title">
            <h1>会員情報の確認/変更</h1>
          </div>
          <div className="body">
            <form method='put' onSubmit={(e) => handleSubmit(e)}>
              <div className="inputItems">
                <label htmlFor="lastname">お名前</label>
                <br />
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  value={profile.lastname}
                  className="border border-neutral-500 rounded pl-2.5"
                  onChange={(e) => handleChange(e)}
                />
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  value={profile.firstname}
                  className="border border-neutral-500 rounded pl-2.5"
                  onChange={(e) => handleChange(e)}
                />
                <p className={urStyles.error}>{errorText.lastname || errorText.firstname}</p>
              </div>
              <div className="inputItems">
                <label htmlFor="female">性別</label>
                <br />
                <div className="radioField">
                  <div className="radioForm border-neutral-500 rounded pl-2.5">
                    <input
                      type="radio"
                      name="gender"
                      id="female"
                      value="female"
                      className="radioButton"
                      checked={profile.gender === "female"}
                      onChange={(e) => handleChange(e)}
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
                      checked={profile.gender === "male"}
                      onChange={(e) => handleChange(e)}
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
                      checked={profile.gender === "other"}
                      onChange={(e) => handleChange(e)}
                    />
                    <label htmlFor="other" className="genderLabel">
                      その他
                    </label>
                  </div>
                </div>
                <p className={urStyles.error}>{errorText.gender}</p>
              </div>
              <div className="inputItems">
                <label htmlFor="email">メールアドレス</label>
                <br />
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="inputParts border border-neutral-500 rounded pl-2.5"
                  value={profile.email}
                  onChange={(e) => handleChange(e)}
                />
                <p className={urStyles.error}>{errorText.email}</p>
              </div>
              <div className="inputItems">
                <label htmlFor="tell">電話番号</label>
                <br />
                <input
                  type="tell"
                  name="tell"
                  id="tell"
                  className="number border border-neutral-500 rounded pl-2.5"
                  value={tell[0]}
                  onChange={(e) => handleTellChange(e)}
                />
                <span>-</span>
                <input
                  type="tell"
                  name="tell2"
                  id="tell2"
                  className="number border border-neutral-500 rounded pl-2.5"
                  value={tell[1]}
                  onChange={(e) => handleTellChange(e)}
                />
                <span>-</span>
                <input
                  type="tell"
                  name="tell3"
                  id="tell3"
                  className="number border border-neutral-500 rounded pl-2.5"
                  value={tell[2]}
                  onChange={(e) => handleTellChange(e)}
                />
              <p className={urStyles.error}>{errorText.tell || errorText.tell2 || errorText.tell3}</p>
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
                  value={zipcode[0]}
                  onChange={(e) => handleZipcodeChange(e)}
                />
                <span>-</span>
                <input
                  type="text"
                  pattern="^[0-9]+$"
                  name="zipcode2"
                  id="zipcode2"
                  className="number border border-neutral-500 rounded pl-2.5"
                  value={zipcode[1]}
                  onChange={(e) => handleZipcodeChange(e)}
                />
                <button type="button" className="zipButton text-white bg-neutral-900 border border-neutral-900 rounded px-1" onClick={() => searchAddress()}>
                  住所検索
                </button>
                <p className={urStyles.error}>{errorText.zipcode || errorText.zipcode2}</p>
              </div>
              <div className="inputItems">
                <label htmlFor="address">住所</label>
                <br />
                <input
                  type="text"
                  name="address"
                  id="address"
                  className="inputParts border border-neutral-500 rounded pl-2.5"
                  value={profile.address}
                  onChange={(e) => handleChange(e)}
                />
                <p className={urStyles.error}>{errorText.address}</p> 
              </div>
              <div className="buttonArea">
                <button type="submit" className="submitButton">
                  会員情報を変更
                </button>
                { completeText && <p className="completeText">{completeText}</p>}
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
