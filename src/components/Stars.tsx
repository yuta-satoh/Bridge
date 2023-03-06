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
    `http://127.0.0.1:8000/reviews?item_id=eq.${itemId}`,
    fetcher
  );

  if (error) <></>;

  if (!data) <></>;

  if (data?.length === 0) <></>;



  return <></>;
}
