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

    if (typeof genre === 'string' && typeof category === 'string') {
        const response = await fetch(`http://127.0.0.1:8000/items?genre=eq.${genre}&category=eq.${category}`)
        const filter = await response.json()
        return {
            props: {
                filter
            }
        }
    } else if (typeof genre === 'string' && typeof category !== 'string') {
        const categoryQuery = category.reduce((current, query) => current + `,category.eq.${query}`, '').replace(',', '')
        console.log(categoryQuery)
        const response = await fetch(`http://127.0.0.1:8000/items?genre=eq.${genre}&or=(${categoryQuery})`)
        const filter = await response.json()
        return {
            props: {
                filter
            }
        }
    } else if (typeof genre !== 'string' && typeof category === 'string') {
        const genreQuery = genre.reduce((current, query) => current + `,genre.eq.${query}`, '').replace(',', '')
        console.log(genreQuery)
        const response = await fetch(`http://127.0.0.1:8000/items?category=eq.${category}&or=(${genreQuery})`)
        const filter = await response.json()
        return {
            props: {
                filter
            }
        }
    } else if (typeof genre !== 'string' && typeof category !== 'string') {
        const genreQuery = genre.reduce((current, query) => current + `,genre.eq.${query}`, '').replace(',', '');
        const categoryQuery = category.reduce((current, query) => current + `,category.eq.${query}`, '').replace(',', '');
        console.log(genreQuery, categoryQuery)
        const response = await fetch(`http://127.0.0.1:8000/items?and=(or(${genreQuery}),or(${categoryQuery}))`);
        const filter = await response.json();
        return {
            props: {
                filter
            }
        }
    }

    const response = await fetch(`http://127.0.0.1:8000/items`)
    const filter = await response.json()
    return {
        props: {
            filter
        }
    }
}

const Search = ({ filter }: { filter: Item[] }) => {
    console.log("データ", filter);

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
