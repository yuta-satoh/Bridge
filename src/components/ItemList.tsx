import Image from 'next/image';
import Link from 'next/link';
import lstyles from '../styles/itemList.module.css';
import useSWR, { Fetcher, useSWRConfig } from "swr";

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

export default function ItemList():JSX.Element {

  const TOKEN = "4sMMKOV6enyXJraF0AyWlrJ1GFRq4Yqf";
  const fetcher:Fetcher<Item[]> = (resource:string) => fetch(resource,
    { 
      method:'GET',
      headers:{
        "Authorization": `Bearer ${TOKEN}`,
        "Content-Type": 'application/json',
      },
    })
    .then(async(res) =>  await res.json());

  const { data, error } = useSWR('http://127.0.0.1:8000', fetcher);
  if (error) return <p>エラー</p>;
  if (!data) return <p>ロード中...</p>;

  return (
    <>
    {data.map((item: Item,index) => {
    return (
        <div key={index} className={lstyles.list_outer}>
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
                <p>{item.name}</p>
                <p>{item.price}</p>
                <p>{item.description}</p>
              </div>
            </Link>
          </div>
        </div>
    )
  })}
  </>
  )
}
