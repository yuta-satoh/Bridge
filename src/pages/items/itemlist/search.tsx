//  カテゴリーとジャンルごとのページ
import lstyles from '../../../styles/itemList.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { GetServerSideProps } from 'next';

// 以下query
// query:{ genre: genrePath, category: categoryPath}}

export const getServerSideProps:GetServerSideProps = async ({query}) => {
  const[realsendGenre,realsendCategory] = [`(${query.genre})`,`(${query.category})`];

  // 商品カテゴリー和訳
  const categoryValue = (() => {
    const categoryArr = realsendCategory.split(",");
    const japanizeCategory = categoryArr.map((category) => {
      if (category === "chair") {
        return "椅子";
      } if (category === "table") {
        return "テーブル";
      } if (category === "cartain") {
        return "カーテン";
      } if (category === "rug") {
        return "カーペット/ラグ";
      } if (category === "sofa") {
        return "ソファ";
      } if (category === "chest") {
        return "収納棚";
      } if (category === "bed") {
        return "ベッド/寝具";
      } if (category === "accessory") {
        return "小物/雑貨";
      } else {
        return "";
      }
    });
    return japanizeCategory.toString();
  })();

  // インテリアジャンル和訳
  const genreValue = (() => {
    const genreArr = realsendGenre.split(",");
    const japanizeGenre = genreArr.map((genre) => {
      if (genre === "nordic") {
        return "北欧風";
      } if (genre === "natural") {
        return "ナチュラル";
      } if (genre === "jmodern") {
        return "和モダン";
      } if (genre === "feminine") {
        return "フェミニン";
      } else {
        return "";
      }
    });
    return japanizeGenre.toString();
  })();

  // `items?${genreValue.length !== 0 ? `or=(${genreValue}) : ""`}&...`
  const respons = await fetch(`http://127.0.0.1:8000/items?${genreValue.length !== 0 ? `or=(${genreValue})` : ""}&${categoryValue.length !== 0 ? `or=(${categoryValue})` : ""}`);
  const filter:Item[] = await respons.json();

  // 確認用
  console.log(genreValue);
  console.log(categoryValue);

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
