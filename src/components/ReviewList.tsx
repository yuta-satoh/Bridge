import useSWR, { Fetcher } from 'swr';

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
    `http://127.0.0.1:8000/reviews?select=*,users(lastname,firstname)&item_id=eq.${itemId}&order=date.desc`,
    fetcher
  );

  // エラー
  if (error) {
    return (
      <>
        <div className="reviwsArea">
          <div className="background">
            <p>レビューはまだ投稿されていません</p>
          </div>
        </div>
      </>
    );
  }
  // ロード中
  if (!data) {
    return (
      <>
        <div className="reviwsArea">
          <div className="background">
            <p>ロード中...</p>
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

  // 総合評価
  const totalEvaluation = data.map((data: Reviews) => data.evaluation).reduce((a, b) => a + b);
  console.log('totalEvaluation', totalEvaluation);

  // descriptionを正しく改行して返す関数(CSSで出来るので削除予定)
  // function shapingDescription(description: string) {
  //   if (description.length === 0) {
  //     return '';
  //   } else {
  //     const shapedDescriptionJSX = description
  //       .split(/(\n)/)
  //       .map((elm, index) => {
  //         return <>{elm.match(/\n/) ? <br /> : elm}</>;
  //       });
  //     return <p>{shapedDescriptionJSX}</p>;
  //   }
  // }

  return (
    <>
      <div className="reviwsArea">
        <div className="title">
          <h2>みんなのレビュー</h2>
        </div>
        <div>

        </div>
        <div className="scroll">
          {data.map((review) => {
            return (
              <>
                <div className="review">
                  <div className="reviewHead">
                    <h3>
                      {review.anonymous
                        ? '匿名'
                        : review.nickname}
                    </h3>
                    <p>{review.evaluation}</p>
                    <p>{review.title}</p>
                    <p>{shapingDate(review.date)}</p>
                  </div>
                  <div className="reviewContainer">
                    <p className='reviewDescription'>{review.description}</p>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
