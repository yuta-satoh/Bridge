import Image from 'next/image';
import Link from 'next/link';
import istyles from '../styles/item.module.css';
import useSWR, { Fetcher, useSWRConfig } from 'swr';

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

export default function ItemdetailReccomend(props:{
  genre:string;
  category:string
}): JSX.Element {
  const fetcher = (resource: string) =>
    fetch(resource).then((res) => res.json());

  // propsで持ってきた内容
  // console.log(props);
  
  const { data, error } = useSWR<Item[], Error>(`/api/getItemListData?genre=${props.genre}&category=${props.category}`, fetcher);
    
  if (error) return <p>エラー</p>;
  // ロード中のcss入れたい・画面中央に表示したい
  if (!data) return <p>ロード中...</p>;

  // console.log(data);
  
   return (
    <>
      <div>
        <h2 className={istyles.recommend_title}>この商品のシリーズ</h2>
        <div className={istyles.recommend}>
          {data.map((item) => {
            return (
              <div key={item.id}>
                <Link href={`/items/itemlist/${item.id}`}>
                  <div className={istyles.images}>
                    <Image
                      src={item.imgurl}
                      alt={item.name}
                      fill
                    />
                  </div>
                  <div className={istyles.detail}>
                    <p className={istyles.itemname}>{item.name}</p>
                    <p className={istyles.itemname}>¥ {(item.price * 1.1).toLocaleString()}</p>
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
