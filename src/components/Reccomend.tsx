import Image from 'next/image';
import Link from 'next/link';
import lstyles from '../styles/itemList.module.css';
import istyles from '../styles/item.module.css';
import useSWR from 'swr';

type Item = {
  id: number;
  name: string;
  description: string;
  genre: string;
  category: string;
  price: number;
  imgurl: string;
  stock: number;
  delete: boolean;
};

// 商品レコメンド用：商品カテゴリとジャンルが合致したものを取得
export default function Reccomend(): JSX.Element {
  const fetcher = (resource: string) =>
    fetch(resource).then((res) => res.json());

  const { data, error } = useSWR('/api/items', fetcher);
  if (error) return <p>エラー</p>;
  // ロード中のcss入れたい・画面中央に表示したい
  if (!data) return <p>ロード中...</p>;

  // console.log(data);

  return (
    <>
      <div className={lstyles.list_outer}>
        <div className={istyles.recommend}>
          <h2>この商品のシリーズ</h2>
          {data.map((item: Item) => {
            return (
              <div key={item.id}>
                <Link href={`/items/${item.id}`}>
                  <div className={istyles.image}>
                    <Image
                      src={item.imgurl}
                      alt={item.name}
                      width={150}
                      height={150}
                    />
                  </div>
                  <div className={istyles.detail}>
                    <p className={lstyles.itemname}>{item.name}</p>
                    <p>{item.price}円</p>
                    <p>{item.description}</p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
