import Image from 'next/image';
import Link from 'next/link';
import lstyles from '../styles/itemList.module.css';
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

// 商品一覧用：商品カテゴリとジャンル問わず取得関数
export default function ItemList(): JSX.Element {
  const fetcher = (resource: string) =>
    fetch(resource).then((res) => res.json());

  const { data, error } = useSWR('/api/items', fetcher);
  if (error) return <p>エラー</p>;
  // ロード中のcss入れたい・画面中央に表示したい
  if (!data) return <p>ロード中...</p>;

  console.log(data);

  return (
    <>
      <div className={lstyles.list_outer}>
        {data.map((item: Item) => {
          return (
            <div key={item.id}>
              <Link href={`/items/itemlist/${item.id}`}>
                <div className={lstyles.image}>
                  <Image
                    src={item.imgurl}
                    alt={item.name}
                    width={280}
                    height={250}
                  />
                </div>
                <div className={lstyles.detail}>
                  <p className={lstyles.itemname}>{item.name}</p>
                  <p>{item.price}円</p>
                  <p>{item.description}</p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
