//  カテゴリーとジャンルごとのページ
// 受け取ったクエリをもとにSSR絞り込み（データはすべて取得した後）

import lstyles from '../../../styles/itemList.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { GetServerSideProps } from 'next';

// 以下query
// const path = or=`genre.eq.${sendCategory}`

export const getServerSideProps:GetServerSideProps = async ({query}) => {
  const realsendCategory = `?or=(${query.name})`;
  const respons = await fetch(`http://127.0.0.1:8000/items${realsendCategory}`)
  const filter:Item[] = await respons.json();

  // const filter = [{genre:query.genre}];

  console.log(realsendCategory);

  return {
    props: {
      filter,
    },
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

//確認用 
  console.log(filter);

  return(
    <>
       {/* <div className={lstyles.list_outer}>
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
      </div> */}
    </>
  );
} 
