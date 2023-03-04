import lstyles from '../styles/itemList.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { GetServerSideProps } from "next";

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

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    if (query.genre === undefined || query.category === undefined) {
        return {
            props: {}
        }
    }
    const genre = query.genre;
    const category = query.category;

    // ジャンルとカテゴリを/api/searchに渡す
    const response = await fetch(`http://localhost:3000/api/search?genre=${genre}&category=${category}`)
    const filter = await response.json()
    return {
        props: {
            filter
        }
    }
}

const Search = ({ filter }: { filter: Item[] }) => {
    if (!filter || filter.length === 0) {
        return <div>検索結果がありません</div>
    }

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

export default Search;
