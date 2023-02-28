// 商品一覧ページを、アイテム数40ずつで次のページに遷移画面ver（id40ずつで)


import Image from 'next/image';
import Link from 'next/link';
import lstyles from '../styles/itemList.module.css';
import useSWR from 'swr';
import { useRouter } from 'next/router';

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

export default function ItemList({item}: {item: Item}): JSX.Element {
  const router = useRouter();
  const fetcher = (resource: string) =>
    fetch(resource).then((res) => res.json());

  const { data, error } = useSWR('/api/items', fetcher);
  if (error) return <p>エラー</p>;
  // ロード中のcss入れたい
  if (!data) return <p>ロード中...</p>;

  return (
    <>
      <form
        method="POST"
        action={`/api/items/${item.id}`}
        onSubmit={(e) => {
          e.preventDefault();

          fetch(`/api/items/${item.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
          })
            .then((res) => {
              if (res.ok) {
                // 次のページに移りたい
                router.push(`/items/itemlist/${item.id}`);
              } else {
                throw new Error('再実行してください');
              }
            })
            .catch((error) => {
              console.error(error);
            });
        }}
      >
        <div className={lstyles.list_outer}>
            {/* 以下を40個ずつまとめて、さらに配列に */}
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
      </form>
    </>
  );
}

{
  /* パス、データ取得 */
}
export async function getStaticPaths() {
  const res = await fetch('http://127.0.0.1:8000/items');
  const items = await res.json();

  const paths = items.map((item: { id: number }) => {
    return { params: { id: `${item.id}` } };
  });

  return {
    paths,
    fallback: true,
  };
}

type Params = {
  params: {
    id: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const res = await fetch(`http://127.0.0.1:8000/items/${params.id}`);
  const item = await res.json();

  return {
    props: { item },
  };
}
