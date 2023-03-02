import useSWR, { Fetcher } from 'swr';

type Reviews = {
  id: number;
  item_id: number;
  user_id: number;
  anonymous: boolean;
  evaluation: string;
  title: string;
  description: string;
  date: Date;
  delete: boolean;
};

const fetcher: Fetcher<Reviews[], string> = (args: string) =>
  fetch(args).then((res) => res.json());

export default function ReviewList({ itemId }: { itemId: string }) {
  const { data, error } = useSWR<Reviews[], Error>(
    `http://127.0.0.1:8000/reviews?item_id=eq.${itemId}`,
    fetcher
  );

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
  if (!data) {
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

  return (
    <>
      <div className="reviwsArea">
        <div className="background">
          <p></p>
        </div>
      </div>
    </>
  );
}
