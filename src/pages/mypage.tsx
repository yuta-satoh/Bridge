import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

export default function Mypage() {
  return (
    <>
      <Head>
        <title>マイページ</title>
      </Head>
      <style jsx>{`
        main {
          background-color: ;
          background-image: url('/images/background/backImg_mypage.jpg');
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
        .container {
          margin: 50px auto;
        }
        h1 {
          font-size: 30px;
        }
        p {
          font-size: 12px;
          padding-bottom: 15px;
        }
        .subtitle {
          font-size: 25px;
        }
        .cartTitle {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .cartLink {
          color: rgb(29, 198, 245);
          font-size: 12px;
          font-weight: bold;
        }
      `}</style>
      <main>
        <section>
          <div className="title">
            <h1>マイページ</h1>
          </div>
          <div className="body">
            <div className="container">
              <div className="cartTitle">
                <div className="subtitle">
                  <h2>カートの商品</h2>
                </div>
                <div>
                  <span className="cartLink">
                    <Link
                      href="ここにカートページへのリンクを追加"
                      className="textBottom"
                    >
                      すべて見る
                    </Link>
                  </span>
                </div>
              </div>
              <div className="cartImgs">
                  <div>
                    <Image src={"/images/chair/chair_feminine_1.jpg"} alt={'kagu'} width={120} height={120}/>
                  </div>
              </div>
            </div>
            <div className="container">
              <div className="subtitle">
                <h2>会員情報</h2>
              </div>
              <div>
                <Link href="/account/profile">会員情報の確認/変更</Link>
              </div>
              <div>
                <Link href="/account/password">パスワードの変更</Link>
              </div>
            </div>
            <div className="container">
              <div className="subtitle">
                <h2>ログアウト/退会</h2>
              </div>
              <div>
                <Link href="ここにトップページへのリンクを追加">
                  ログアウト
                </Link>
              </div>
              <div>
                <Link href="ここに退会ページへのリンクを追加">
                  退会手続き
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
