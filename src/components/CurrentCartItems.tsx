import Image from 'next/image';
import useSWR, { Fetcher } from 'swr';

// 型定義
type Items = {
  id: number;
  name: string;
  description: string;
  genre: string;
  category: string;
  price: number;
  imgurl: string;
  stock: number;
  delete: boolean;
}

type Carts = {
  id: number;
  user_id: number;
  delete: boolean;
}

type CartItemsData = {
  id: number;
  item_id: number;
  cart_id: number;
  date: Date;
  quantity: number;
  delete: boolean;
  items: Items;
  carts: Carts;
}

const fetcher: Fetcher<CartItemsData[], string> = (args: string) =>
  fetch(args).then((res) => res.json());

export default function CurrentCartItems({
  cookie,
}: {
  cookie: string;
}) {
  //   SWRでアイテムを取得
  const { data: cartItemData, error } = useSWR<CartItemsData[], Error>(
    `/api/getCart/items?id=${cookie}`,
    fetcher
  );

  // エラー文
  if (error)
    return (
      <>
        <style jsx>{`
          .container {
            width: 100%;
            height: 100px;
            margin: 10px auto;
            text-align: center;
          }
          .background {
            width: 80%;
            height: 80%;
            margin: auto;
            background-color: #f5f5f5;
            display: table;
          }
          p {
            display: table-cell;
            vertical-align: middle;
            text-align: center;
          }
        `}</style>
        <div className="container">
          <div className="background">
            <p>カートに商品がありません</p>
          </div>
        </div>
      </>
    );
  if (!cartItemData) {
    return (
      <>
        <style jsx>{`
          .container {
            width: 100%;
            height: 100px;
            margin: 10px auto;
            text-align: center;
          }
          .background {
            width: 80%;
            height: 80%;
            margin: auto;
            background-color: #f5f5f5;
            display: table;
          }
          p {
            display: table-cell;
            vertical-align: middle;
            text-align: center;
          }
        `}</style>
        <div className="container">
          <div className="background">
            <p>ロード中...</p>
          </div>
        </div>
      </>
    );
  }

  // 削除フラグがtrueは非表示
  const filteredItemData = cartItemData.filter(
    (item) => !item.delete
  );

  // 上位4つまで抽出(array.slice(0, 3))
  const currentCartItems = filteredItemData.slice(0, 4);

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
      <div className="cartItemsArea">
        {currentCartItems.map((cartItem) => {
            return (
              <div className="cartItems" key={cartItem.id}>
                <Image
                  src={cartItem.items.imgurl}
                  alt={'kagu'}
                  width={150}
                  height={150}
                />
                <p>{cartItem.items.name}</p>
                <p>{`${cartItem.items.price}円`}</p>
                <p>{`${cartItem.quantity}個`}</p>
              </div>
            );
        })}
      </div>
    </>
  );
}
