import topStyle from '../styles/top.module.css';
import Link from 'next/link';
import Image from 'next/image';
import fetcher from '@/lib/fetcher';
import useSWR from 'swr';
import Loading from './utils/Loading';

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

export default function NewItems() {
  const { data, error } = useSWR<Item[], Error>(
    '/api/newItems',
    fetcher
  );
  if (!data) return <Loading height={200} />;
  if (error) return <div>エラー</div>;

  const newItems = data.slice(1);

  return (
    <>
      <div
        className={`${topStyle.categoryList} container mx-auto p-2 flex gap-5 justify-center`}
      >
        {/* 大きく表示する商品 */}
        <Link href={`/items/itemlist/${data[0].id}`}>
          <div>
            <Image
              src={data[0].imgurl}
              alt={data[0].name}
              width={285}
              height={285}
              className={`${topStyle.bigImage} rounded`}
            />
            <p className={`${topStyle.price} text-lg`}>
              ¥{(data[0].price * 1.1).toLocaleString()}
            </p>
          </div>
        </Link>
        <ul className={`${topStyle.itemlist} grid grid-cols-4 gap-4`}>
          {newItems.map((item, index) => (
            <Link href={`/items/itemlist/${item.id}`} key={index}>
              <li>
                <Image
                  src={item.imgurl}
                  alt={item.name}
                  width={120}
                  height={120}
                  className={`${topStyle.smallImage} rounded`}
                />
                <div className={topStyle.smallImagePrice}>
                  <p className={`${topStyle.price} text-lg`}>
                    ¥{(item.price * 1.1).toLocaleString()}
                  </p>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
}
