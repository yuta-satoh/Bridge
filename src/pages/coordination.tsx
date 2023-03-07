import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import cModule from '../styles/coordination.module.css';
import Cookies from 'js-cookie';
import Router from 'next/router';

export default function coordination() {
  const genre = { genre: 'ナチュラル' };
  const loupe = '/images/icon/loupe.png';

  function selectTheme(e: React.ChangeEvent<HTMLSelectElement>) {
    genre.genre = e.target.value;
  }
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    Cookies.set('genre', genre.genre);
    Router.push({
      pathname: '/coordinationRes',
      query: { name: genre.genre },
    });
  };

  return (
    <>
      <Head>
        <title>コーディネートジェネレーター</title>
      </Head>
      <div className={cModule.selectbody}>
        <main>
          <ol className={cModule.links} id="top">
            <li className={cModule.pageLink}>
              <Link href="/">Bridge</Link>
              <span className={cModule.greaterThan}>&gt;</span>
            </li>
            <li className={cModule.pageLink}>ジェネレーター</li>
          </ol>
          {/* <div className={cModule.titleItems}>
            <h1 className={cModule.title}>
              コーディネートジェネレーター
            </h1>
            <form action="" onSubmit={handleSubmit}>
              <div className={cModule.selectTheme}>
                <label htmlFor="select" className={cModule.theme}>
                  テーマ選択：
                </label>
                <select
                  id="select"
                  name="example"
                  className={cModule.select}
                  onChange={selectTheme}
                >
                  <option value="ナチュラル">ナチュラル</option>
                  <option value="北欧風">北欧風</option>
                  <option value="フェミニン">フェミニン</option>
                  <option value="和モダン">和モダン</option>
                </select>
              </div>
              <div className={cModule.button}>
                <button className={cModule.buttonStyle}>
                  生成する
                </button>
              </div>
            </form>
          </div> */}
          <div className={cModule.article}>
            <div className={cModule.imageBox}>
              <div className={cModule.imageBoxUpper}>
                <Image
                  src={'/images/accessory/accessory_nordic_3.jpeg'}
                  width={200}
                  height={200}
                  alt=""
                  className={cModule.articleImageA}
                />
                <Image
                  src={'/images/chest/chest_feminine_3.jpg'}
                  width={200}
                  height={200}
                  alt=""
                  className={cModule.articleImageB}
                />
              </div>
              <Image
                src={'/images/table/table_jmodern_1.jpeg'}
                width={200}
                height={200}
                alt=""
                className={cModule.articleImageC}
              />
              <div className={cModule.imageBoxBottom}>
                <Image
                  src={'/images/bed/bed_natural_2.jpg'}
                  width={200}
                  height={200}
                  alt=""
                  className={cModule.articleImageD}
                />
              </div>
            </div>
            <div className={cModule.articleContent}>
              <h2 className={cModule.articleTitle}>
                素敵な家具との出会いをあなたに
              </h2>
              <p className={cModule.articleSentence}>
                お部屋を彩る素敵な家具たちが
              </p>
              <p className={cModule.articleSentence}>
                あなたとの出会いを待っています
              </p>
              <div className={cModule.buttonArea}>
              <button onClick={handleSubmit} className={cModule.tryButton}>今すぐ試す</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
