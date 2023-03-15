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

export default function Stars({ itemId }: { itemId: number }) {
  const { data, error } = useSWR<Reviews[], Error>(
    // id=itemIdのreviewsを取得
    `/api/getReview?itemId=${itemId}`,
    fetcher
  );

  if (error) return <></>;
  if (!data) return <></>;
  if (data?.length === 0) return <p></p>;

  // 平均評価
  const totalEvaluation = data
    .map((data: Reviews) => data.evaluation)
    .reduce((a, b) => a + b);
  const averageEvaluation = totalEvaluation / data.length;
  const roundAverageEvaluation = averageEvaluation.toFixed(1);

  // 星の黄色部分の幅を算出
  const yStarWidth = Number(roundAverageEvaluation) * 20 + '%';

  return (
    <p className="evaluation">
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
  );
}
