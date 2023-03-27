import useSWR, { Fetcher } from 'swr';
import rlStyles from '../styles/reviewList.module.css';

type Reviews = {
  id: number;
  item_id: number;
  user_id: number;
  nickname: string;
  anonymous: boolean;
  evaluation: number;
  title: string;
  description: string;
  date: Date;
  delete: boolean;
  users: { lastname: string; firstname: string };
};

// フェッチャー
const fetcher: Fetcher<Reviews[], string> = (args: string) =>
  fetch(args).then((res) => res.json());

export default function ReviewList({ itemId }: { itemId: string }) {
  const { data, error } = useSWR<Reviews[], Error>(
    // id=itemIdのreviewsとusers(lastname, firstname)を取得し、投稿日の降順にソート
    `/api/getReview?itemId=${itemId}`,
    fetcher
  );

  // エラー
  if (error) {
    return (
      <>
        <div className={rlStyles.reviwsArea}>
          <div className={rlStyles.title}>
            <h2>みんなのレビュー</h2>
          </div>
          <div className={rlStyles.background}>
            <p>エラーが発生しました</p>
          </div>
        </div>
      </>
    );
  }
  // ロード中
  if (!data) {
    return (
      <>
        <div className={rlStyles.reviwsArea}>
          <div className={rlStyles.title}>
            <h2>みんなのレビュー</h2>
          </div>
          <div className={rlStyles.background}>
            <p>ロード中...</p>
          </div>
        </div>
      </>
    );
  }

  if (data.length === 0) {
    return (
      <>
        <div className={rlStyles.reviwsArea}>
          <div className={rlStyles.title}>
            <h2>みんなのレビュー</h2>
          </div>
          <div className={rlStyles.background}>
            <p>レビューはまだ投稿されていません</p>
          </div>
        </div>
      </>
    );
  }

  // dateを"/"区切りで返す関数
  function shapingDate(date: Date) {
    const dateStr = date.toString();
    const shapedDate = dateStr.replace(/-/g, '/');
    return shapedDate;
  }

  // 平均評価(小数点第2位で四捨五入)
  const totalEvaluation = data
    .map((data: Reviews) => data.evaluation)
    .reduce((a, b) => a + b);
  const averageEvaluation = totalEvaluation / data.length;
  const roundAverageEvaluation = averageEvaluation.toFixed(1);

  // descriptionを正しく改行して返す関数(CSSで出来るので削除予定)
  function shapingDescription(description: string) {
    if (description.length === 0) {
      return '';
    } else {
      const shapedDescriptionJSX = description
        .split(/(\n)/)
        .map((elm) => {
          return <>{elm.match(/\n/) ? <br /> : elm}</>;
        });
      return <p>{shapedDescriptionJSX}</p>;
    }
  }

  // 星の黄色部分の幅を算出
  const yStarWidth = Number(roundAverageEvaluation) * 20 + '%';

  return (
    <>
      <div className={rlStyles.reviwsArea}>
        <div className={rlStyles.title}>
          <h2>みんなのレビュー</h2>
        </div>
        <div className={rlStyles.evaluation_area}>
          <p className={rlStyles.evaluation}>
            平均評価:&nbsp;
            <span className={rlStyles.stars_gray}>
              ★★★★★
              <span
                className={rlStyles.stars_yellow}
                style={{ width: yStarWidth }}
              >
                ★★★★★
              </span>
            </span>
            <span className="averageEvaluation">
              {roundAverageEvaluation}
            </span>
          </p>
        </div>
        <div className={rlStyles.scroll}>
          {data.map((review, index) => {
            return (
              <>
                <div className={rlStyles.review} key={index}>
                  <div className={rlStyles.review_head} key={index}>
                    <h3>
                      {review.anonymous ? '非公開' : review.nickname}
                    </h3>
                    <p>
                      評価:&nbsp;
                      <span className={rlStyles.stars_gray}>
                        ★★★★★
                        <span
                          className={rlStyles.stars_yellow}
                          style={{ width: `${review.evaluation * 20}%` }}
                        >
                          ★★★★★
                        </span>
                      </span>
                      {review.evaluation}
                    </p>
                    <p>{shapingDate(review.date)}</p>
                  </div>
                  <hr />
                  <div className={rlStyles.review_container}>
                    <h4>{review.title}</h4>
                    <p>{shapingDescription(review.description)}</p>
                  </div>
                  <hr className={rlStyles.black_hr} />
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
