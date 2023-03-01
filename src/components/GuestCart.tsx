import useSWR, { Fetcher } from "swr";
import Link from "next/link";
import Image from "next/image";
import Recommend from "./Recommend";

// カートに入った時の状態を含めたいのでcartInfoプロパティも追加しています
type Item = {
  id: number,
  name: string,
  description: string,
  genre: string,
  category: string,
  price: number,
  imgurl: string,
  stock: number,
  delete: boolean,
}

const fetcher: Fetcher<Item[], string> = (...args) => fetch(...args).then((res) => res.json());

export default function GuestCart({ guestCart }: { guestCart: string[] }) {
  // 受け取ったゲストカートからクエリパラメータを作成
  const itemQuery = guestCart.reduce((query, cartItem) => query + `,id.eq.${cartItem}`, "").replace(",", "");
  const queryParams = `or=(${itemQuery})`

	// SWRでアイテムを取得
  const { data: cartItemData, error } = useSWR(`/api/getItems?id=${queryParams}`, fetcher)

  // カートにデータがない時の表示
	if (error) return (
    <div className="w-4/5 mx-auto">
      <h2 className="text-3xl font-bold mt-10">カート</h2>
      <div className="block py-40 mx-auto my-10 bg-neutral-100 rounded">
        <h2 className="text-center text-3xl font-bold mb-10">カートに商品がありません</h2>
        <Link href="/">
          <div className="container mx-auto pt-1.5 text-center h-10 w-1/3 border-2 border-neutral-900 bg-white mt-4">
            お買い物はこちらから
          </div>
        </Link>
      </div>
    </div>
  )

	if (!cartItemData) return <div>loading...</div>
  
  // deleteフラグの立っているアイテムを除去
  const filteredItemData = cartItemData.filter((item) => !item.delete)
  
  // 合計金額
  const sumPrice = filteredItemData.reduce((current, item) => current + item.price, 0)

	return (
    <div className="flex mx-auto w-4/5 gap-32">
      <div className="w-3/5 mt-10">
        <div className="flex">
          <h2 className="text-3xl font-bold">カート</h2>
          <span className="mt-2">{`(${filteredItemData.length}点の商品)`}</span>
        </div>
        {filteredItemData.map((item, index) => (
          <div key={index} className="border border-neutral-900 my-2 py-3 px-8 h-52">
            <div className="flex gap-5">
              <Link href={'/'}>
                <Image src={item.imgurl} alt={item.name} width={150} height={150} className="rounded"/>
              </Link>
              <div className="px-3 py-4">
                <Link href={'/'}>
                  <p className="underline mb-1 text-xl">{item.name}</p>
                </Link>
                <p className="text-sm mt-1">{item.description}</p>
                <p className="mt-1 text-lg">¥ {item.price.toLocaleString()}</p>
              </div>
            </div>
            <div className="text-right">
              <button className="text-white bg-neutral-900 border border-neutral-900 rounded px-1">
                削除
              </button>
              {/* 個数を変えたら金額も変更したい（CSRで） */}
              <select
                name="quantity"
                id="cart_quantity"
                className="ml-5 border border-neutral-900 rounded p-1"
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
              </select>
            </div>
          </div>  
        ))}

        <Recommend filteredItemData={filteredItemData} />
      </div>
      <div className="w-1/4 h-80 mt-10 p-10 border-2 border-neutral-900 rounded bg-gray-100">
        <p>
          <span>商品合計</span>
          <span className="float-right">¥ {sumPrice.toLocaleString()}</span>
        </p>
        <p>
          <span>消費税</span>
          <span className="float-right">¥ {(sumPrice * 0.1).toLocaleString()}</span>
        </p>
        <div className="border-b border-black">
          <p className="mt-10 text-lg font-bold">
            <span>合計</span>
            <span className="float-right">¥ {(sumPrice + (sumPrice * 0.1)).toLocaleString()}</span>
          </p>
        </div>
        <Link href="/login">
          <div className="container pt-1.5 text-center h-10 border-2 border-neutral-900 bg-white mt-8">
            <span>ログイン</span>
          </div>
        </Link>
        <Link href="/">
          <div className="container pt-1.5 text-center h-10 border-2 border-neutral-900 bg-white mt-4">
            <span>お買い物を続ける</span>
          </div>
        </Link>
      </div>
    </div>
  )
}
