import { ChangeEvent, SyntheticEvent, useState } from 'react';
import urStyles from '../../../styles/userRegister.module.css';
import prStyles from '../../../styles/postReview.module.css';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import hModule from '../../../styles/history.module.css';
import { useRouter } from 'next/router';
import cModule from '../../../styles/coordination.module.css';

type postReviews = {
  item_id: number;
  user_id: number;
  nickname: string;
  anonymous: boolean;
  evaluation: number;
  title: string;
  description: string;
  date: string;
};

type History = {
  id: number;
  item_id: number;
  user_id: number;
  name: string;
  description: string;
  genre: string;
  category: string;
  price: number;
  imgurl: string;
  date: string;
  quantity: number;
  delete: boolean;
};

// 今日の日付をyyyy-mm-dd形式で出力する関数
function getToday() {
  const dt = new Date();
  const y = dt.getFullYear();
  const m = ('00' + (dt.getMonth() + 1)).slice(-2);
  const d = ('00' + dt.getDate()).slice(-2);
  return y + '-' + m + '-' + d;
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
}) => {
  // order_historiesのidを受け取る
  const id = query.id;
  // idがundefinedなら空のpropsを渡す
  if (id === undefined) {
    return {
      props: {},
    };
  }

  // 取得したidと一致するhistoryデータを取得し、propsに渡す
  const res = await fetch(
    `${process.env.SUPABASE_URL}/order_histories?id=eq.${id}`,
    {
      method: 'GET',
      headers: {
        apikey: `${process.env.SUPABASE_API_KEY}`,
        Authorization: `Bearer ${process.env.SUPABASE_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );
  const data: History[] = await res.json();
  const hisotry_data = data[0];
  return {
    props: {
      history_data: hisotry_data,
    },
  };
};

export default function Review({
  history_data,
}: {
  history_data: History;
}) {
  // reviewの初期値
  const initReview = {
    item_id: Number(history_data.item_id),
    user_id: Number(history_data.user_id),
    nickname: '',
    anonymous: false,
    evaluation: 4,
    title: '',
    description: '',
    date: getToday(),
  };
  // inputの値を格納するstate
  const [review, setReview] = useState<postReviews>(initReview);
  // nicknameはerrorじゃないか
  const [isNicknameError, setIsNicknameError] =
    useState<boolean>(false);

  // ルーター
  const rooter = useRouter();

  // inputのvalueをstateに格納するチェンジイベントハンドラ(anonymous以外)
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setReview({
      ...review,
      [`${e.target.name}`]: e.target.value,
    });
  };

  // 匿名ボタンのクリックイベントハンドラ
  const handleAnonymousClick = (e: ChangeEvent<HTMLInputElement>) => {
    // クリック時にanonymousがtrueなら、nicknameを初期値に戻してanonymousをfalseにする
    if (review.anonymous) {
      setReview({
        ...review,
        nickname: '',
        anonymous: false,
      });
      // クリック時にanonymousがfalseなら、nicknameを"匿名"にしてanonymousをtrueにする
    } else {
      setReview({
        ...review,
        nickname: '匿名',
        anonymous: true,
      });
    }
  };

  // reviewsにPUTするサブミットイベントハンドラ
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!review.anonymous && review.nickname.length === 0) {
      setIsNicknameError(true);
    } else {
      setIsNicknameError(false);
      const res = await fetch(`/api/account/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(review),
      });
      if (res.ok) {
        rooter.replace('/account/review/complete');
      } else {
        setIsNicknameError(true);
        console.log('error');
      }

    }
  };

  return (
    <>
      <Head>
        <title>レビュー投稿</title>
      </Head>
      <main className={prStyles.main}>
        <div className={hModule.breadList}>
          <ol className={cModule.links} id="top">
            <li className={cModule.pageLink}>
              <Link href="/">Bridge</Link>
              <span className={cModule.greaterThan}>&gt;</span>
            </li>
            <li className={cModule.pageLink}>
              <Link href="/mypage">マイページ</Link>
              <span className={cModule.greaterThan}>&gt;</span>
            </li>
            <li className={cModule.pageLink}>
              <Link href="/account/history">購入履歴</Link>
              <span className={cModule.greaterThan}>&gt;</span>
            </li>
            <li className={cModule.pageLink}>レビュー投稿</li>
          </ol>
        </div>
        <div className={prStyles.body}>
          <div className={prStyles.itemInfo}>
            <table className={hModule.tableBody}>
              <thead>
                <tr>
                  <th></th>
                  <th>商品名</th>
                  <th className={hModule.tableCell}>購入数</th>
                  <th className={hModule.tableCell}>単価</th>
                  <th className={hModule.tableCell}>小計</th>
                </tr>
              </thead>
              <tbody key={history_data.item_id}>
                <tr
                  key={history_data.item_id}
                  className={hModule.tableLine}
                >
                  <td className={hModule.tableCellCenter}>
                    <Link
                      href={`../items/itemlist/${history_data.item_id}`}
                    >
                      <Image
                        src={history_data.imgurl}
                        alt={history_data.name}
                        width={100}
                        height={100}
                        className={hModule.cardImage}
                      />
                    </Link>
                  </td>
                  <td className={hModule.tableCellCenter}>
                    <Link
                      href={`../items/itemlist/${history_data.item_id}`}
                    >
                      {history_data.name}
                    </Link>
                  </td>
                  <td className={hModule.tableCell}>
                    {history_data.quantity}個
                  </td>
                  <td className={hModule.tableCell}>
                    ¥ {(history_data.price * 1.1).toLocaleString()}
                  </td>
                  <td className={hModule.tableCell}>
                    ¥{' '}
                    {(
                      history_data.quantity *
                      history_data.price *
                      1.1
                    ).toLocaleString()}
                  </td>
                </tr>
                <tr>
                  <td colSpan={4}></td>
                  <td className={hModule.tableCellCenterSub}>
                    購入日：{history_data.date}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <form>
              <div className={prStyles.nickname}>
                {/* anonymousがtrueかつnicknameが空欄ならエラーを表示 */}
                {isNicknameError ? (
                  <p className={urStyles.error}>
                    ニックネームを入力してください
                  </p>
                ) : (
                  <></>
                )}
              </div>
              <div className={prStyles.nickname}>
                <label htmlFor="nickname">ニックネーム</label>
                {/* anonymousがtrueならreadOnly、falseなら入力欄を表示する */}
                {review.anonymous ? (
                  <input
                    className={prStyles.inputBorder}
                    type="text"
                    name="nickname"
                    id="nickname"
                    value={review.nickname}
                    readOnly
                  />
                ) : (
                  <input
                    className={prStyles.inputBorder}
                    type="text"
                    name="nickname"
                    id="nickname"
                    value={review.nickname}
                    onChange={(e) => handleChange(e)}
                    placeholder="ニックネームを記入"
                  />
                )}
                <span>
                  <label htmlFor="anonymous">匿名</label>
                  <input
                    type="checkbox"
                    name="anonymous"
                    id="anonymous"
                    onChange={(e) => handleAnonymousClick(e)}
                  />
                </span>
              </div>
              <div className={prStyles.starArea}>
                <p>評価&nbsp;</p>
                <div>
                  <span className={prStyles.stars}>
                    <input
                      className={prStyles.inputStar}
                      type="radio"
                      id="review05"
                      name="evaluation"
                      value={5}
                      onChange={(e) => handleChange(e)}
                    />
                    <label htmlFor="review05">★</label>
                    <input
                      className={prStyles.inputStar}
                      type="radio"
                      id="review04"
                      name="evaluation"
                      value={4}
                      onChange={(e) => handleChange(e)}
                      defaultChecked
                    />
                    <label htmlFor="review04">★</label>
                    <input
                      className={prStyles.inputStar}
                      type="radio"
                      id="review03"
                      name="evaluation"
                      value={3}
                      onChange={(e) => handleChange(e)}
                    />
                    <label htmlFor="review03">★</label>
                    <input
                      className={prStyles.inputStar}
                      type="radio"
                      id="review02"
                      name="evaluation"
                      value={2}
                      onChange={(e) => handleChange(e)}
                    />
                    <label htmlFor="review02">★</label>
                    <input
                      className={prStyles.inputStar}
                      type="radio"
                      id="review01"
                      name="evaluation"
                      value={1}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                    <label htmlFor="review01">★</label>
                  </span>
                </div>
              </div>
              <div className={prStyles.review_title}>
                <label htmlFor="title">タイトル</label>
                <input
                  className={prStyles.inputBorder}
                  type="text"
                  name="title"
                  id="title"
                  placeholder="未記入可"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className={prStyles.descriptionArea}>
                <div>
                  <label htmlFor="description">説明</label>
                </div>
                <div>
                  <textarea
                    className={prStyles.textarea}
                    name="description"
                    id="description"
                    cols={50}
                    rows={5}
                    placeholder="未記入可"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
              <div className={prStyles.prButton}>
                <button
                  type="button"
                  onClick={(e) => handleSubmit(e)}
                >
                  レビューを投稿
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
