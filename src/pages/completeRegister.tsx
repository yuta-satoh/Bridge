import Head from 'next/head';
import Link from 'next/link';

export default function completeRegister() {
  return (
    <>
      <Head>
        <title>会員登録完了</title>
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
          height: 600px;
          width: 45%;
        }
        .welcome {
          text-align: center;
          max-width: 425px;
          margin: 50px auto;
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
      `}</style>
      <main>
        <div className="body">
          <div className="title">
            <h1 className="subTitle">会員登録完了</h1>
          </div>
          <div className="welcome">
            <h1>Welcome&nbsp;To&nbsp;Bridge!</h1>
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
