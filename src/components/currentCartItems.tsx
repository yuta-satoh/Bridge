import Image from 'next/image';
import useSWR, { Fetcher } from 'swr';

// 型定義
//カート
type Cart = {
  id: number;
  item_id: number;
  cart_id: number;
  date: string;
  quantity: number;
  delete: boolean;
};

// アイテム
// カートに入った時の状態を含めたいのでcartInfoプロパティも追加しています
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
  cartInfo: Cart;
};

const fetcher: Fetcher<Item[], string> = (args: string) =>
  fetch(args).then((res) => res.json());

export default function CurrentCartItems({
  cookie,
}: {
  cookie: string;
}) {
  //   SWRでアイテムを取得
  const { data: cartItemData, error } = useSWR<Item[], Error>(
    `/api/getCart/items?id=${cookie}`,
    fetcher
  );

  // エラー文
  if (error) return <div>Error.</div>;
  if (!cartItemData) return <div>loading...</div>;

  // 削除フラグがtrueは非表示
  const filteredItemData = cartItemData.filter(
    (item) => !item.delete
  );

  return (
    <>
      <style jsx>{`
        .cartItemsArea {
            margin: 0px auto;
        }
        .cartItems {
          margin: 8px 30px;
          float: left;
        }
      `}</style>
      <div className='cartItemsArea'>
        <div className="cartItems">
          <Image
            src={filteredItemData[filteredItemData.length - 1].imgurl}
            alt={'kagu'}
            width={150}
            height={150}
          />
          <p>{filteredItemData[filteredItemData.length - 1].name}</p>
          <p>{`${filteredItemData[filteredItemData.length - 1].price}円`}</p>
          <p>{`${filteredItemData[filteredItemData.length - 1].cartInfo.quantity}個`}</p>
        </div>
        <div className="cartItems">
          <Image
            src={filteredItemData[filteredItemData.length - 2].imgurl}
            alt={'kagu'}
            width={150}
            height={150}
          />
          <p>{filteredItemData[filteredItemData.length - 2].name}</p>
          <p>{`${filteredItemData[filteredItemData.length - 2].price}円`}</p>
          <p>{`${filteredItemData[filteredItemData.length - 2].cartInfo.quantity}個`}</p>
        </div>
        <div className="cartItems">
          <Image
            src={filteredItemData[filteredItemData.length - 3].imgurl}
            alt={'kagu'}
            width={150}
            height={150}
          />
          <p>{filteredItemData[filteredItemData.length - 3].name}</p>
          <p>{`${filteredItemData[filteredItemData.length - 3].price}円`}</p>
          <p>{`${filteredItemData[filteredItemData.length - 3].cartInfo.quantity}個`}</p>
        </div>
        <div className="cartItems">
          <Image
            src={filteredItemData[filteredItemData.length - 4].imgurl}
            alt={'kagu'}
            width={150}
            height={150}
          />
          <p>{filteredItemData[filteredItemData.length - 4].name}</p>
          <p>{`${filteredItemData[filteredItemData.length - 4].price}円`}</p>
          <p>{`${filteredItemData[filteredItemData.length - 4].cartInfo.quantity}個`}</p>
        </div>
      </div>
    </>
  );
}
