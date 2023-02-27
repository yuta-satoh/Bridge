import Image from 'next/image';
import Link from 'next/link';
import lstyles from '../styles/itemList.module.css';
import useSWR from 'swr';
import { Key } from 'react';

type Item = {
  id: number;
  name: string;
  description: string;
  genre: string;
  category: string;
  price: number;
  imgUrl: string;
  stock: number;
  delete: boolean;
};

export default function ItemList({ item }: { item: Item }): JSX.Element {
  const fetcher = (resource: string) =>
    fetch(resource).then((res) => res.json());

  const { data, error } = useSWR('/api/items', fetcher);
  if (error) return <p>エラー</p>;
  // ロード中のcss入れたい
  if (!data) return <p>ロード中...</p>;

  return (
    <>
      <div className={lstyles.list_outer}>
        {data.map((item: Item) => {
          return (
            <div key={item.id}>
              <Link href={`/items/${item.id}`}>
                <div className={lstyles.image}>
                  <Image
                    src={item.imgUrl}
                    alt={item.name}
                    width={250}
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
