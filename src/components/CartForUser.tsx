import Image from 'next/image';
import Link from 'next/link';
import headModule from '../styles/header.module.css';
import Cookies from 'js-cookie';
import useSWR from 'swr';

type items = {
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

type cart = {
  id: number;
  item_id: number;
  items: items;
  cart_id: number;
  date: string;
  quantity: number;
  delete: boolean;
}[];

export default function UserCart() {
  const userId = Cookies.get('id');
  const fetcher = (url: string) =>
    fetch(url).then((res) => res.json());

  const { data, error }: { data: cart; error: any } = useSWR(
    `/api/cart_items?select=*,items(*),carts(*)&cart_id=eq.${userId}`,
    fetcher,
    { refreshInterval: 1000 }
  );
  if (error) return <p>エラー</p>;
  if (!data) return <p>ロード中...</p>;

  const total = data.reduce(function (sum, element) {
    return sum + element.quantity;
  }, 0);

  return (
    <>
      <Link href={'/cart'} className={headModule.iconModule}>
        {total === 0 ? (
          <></>
        ) : (
          <div className={headModule.cartCounter}>{total}</div>
        )}
        <Image
          className={headModule.iconimg}
          src="/images/icon/cart.png"
          alt=""
          width={25}
          height={25}
        />
        <span
          className={`${headModule.menuLabel} inline-block mt-1 whitespace-nowrap`}
        >
          カート
        </span>
      </Link>
    </>
  );
}
