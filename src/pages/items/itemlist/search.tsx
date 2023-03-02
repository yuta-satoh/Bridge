//  カテゴリーとジャンルごとのページ
// 受け取ったクエリをもとにSSR絞り込み（データはすべて取得した後）

import lstyles from '../../../styles/itemList.module.css';
import Link from 'next/link';
import Image from 'next/image';

export async function getServerSideProps(context:any) {
  const genres = context.query.genre;
  const categories = context.query.category;
  // const theme = Cookies.get('genre');
  // Router.push({ query: { name: theme } });

  const TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoid2ViX2Fub24ifQ.kiTZsh70Ir2nvvv3SDXEHwAMdwgVyGiQFDt3HROGqPg';
  const request = await fetch(
    `http://127.0.0.1:8000/items?genre=or.${genres}&category=or.${categories}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
  return {
    props: { filter },
  };

}

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

export default function SearchItem({filter}:{filter:Item[]}) {

  const fetcher = (resource:string) => 
    fetch(resource).then((res) => res.json());

  //確認用 
  console.log(filter);

  return(
    <>
       <div className={lstyles.list_outer}>
        {filter.map((fil:Item) => {
          return (
            <div key={fil.id}>
              <Link href={`/items/itemlist/${fil.id}`}>
                <div className={lstyles.image}>
                  <Image
                    src={fil.imgurl}
                    alt={fil.name}
                    width={280}
                    height={250}
                  />
                </div>
                <div className={lstyles.detail}>
                  <p className={lstyles.itemname}>{fil.name}</p>
                  <p>{fil.price}円</p>
                  <p>{fil.description}</p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
} 
