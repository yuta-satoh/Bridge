import useSWR, { Fetcher } from "swr";
import Link from "next/link";
import Image from "next/image";
import Recommend from "./Recommend";
import deleteCart from "@/lib/deleteCart";
import { ChangeEvent } from "react";

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

type Cart = {
  id: number,
  items: Item,
  cart_id: number,
  date: string,
  quantity: number,
  delete: boolean,
}

const fetcher: Fetcher<Cart[], string> = (...args) => fetch(...args).then((res) => res.json());

export default function UserCart({ userId }: { userId: string }) {
  // SWRでアイテムを取得
  const { data: cartItemData, error, mutate } = useSWR(`/api/getCart/items?id=${userId}`, fetcher)

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

  const filtercartItems = cartItemData.filter((cart) => cart.delete === false)

  const recommend = filtercartItems.map((cart) => {
    return {
      id: cart.items.id,
      genre: cart.items.genre
    }
  })
  console.log(recommend);

  // 合計金額
  const sumPrice = filtercartItems.reduce((current, cart) => current + (cart.items.price * cart.quantity), 0)

  const handleDelete = async (itemId: number, cartId: number) => {
    console.log(itemId, cartId);
    await deleteCart(itemId, cartId);
    mutate(filtercartItems);
  }

  const handleChange = async (ev: ChangeEvent<HTMLSelectElement>, itemId: number, cartId: number) => {
    const value = ev.target.value
    console.log(value)
    await fetch("/api/selectQuantity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        item_id: itemId,
        cart_id: cartId,
        quantity: Number(value),
      })
    }).then((res) => console.log("ステータス:", res.status))
    mutate(filtercartItems)
  }

	return (
    <>
      {filtercartItems.length !== 0 ? (
        <div className="flex mx-auto w-4/5 gap-32">
          <div className="w-3/5 mt-10">
            <div className="flex">
              <h2 className="text-3xl font-bold">カート</h2>
              <span className="mt-2">{`(${filtercartItems.length}点の商品)`}</span>
            </div>
            {filtercartItems.map((cart, index) => (
              <div key={index} className="border border-neutral-900 my-2 py-3 px-8 h-52">
                <div className="flex gap-5">
                  <Link href={`/items/itemlist/${cart.items.id}`}>
                    <Image src={cart.items.imgurl} alt={cart.items.name} width={150} height={150} className="rounded"/>
                  </Link>
                  <div className="px-3 py-4">
                    <Link href={`/items/itemlist/${cart.items.id}`}>
                      <p className="underline mb-1 text-xl">{cart.items.name}</p>
                    </Link>
                    <p className="text-sm mt-1">{cart.items.description}</p>
                    <p className="mt-1 text-lg">¥ {cart.items.price.toLocaleString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <button
                    className="text-white bg-neutral-900 border border-neutral-900 rounded px-1"
                    onClick={() => handleDelete(cart.items.id, cart.cart_id)}  
                  >
                    削除
                  </button>
                  {/* 個数を変えたら金額も変更したい（CSRで） */}
                  <select
                    name="quantity"
                    id="cart_quantity"
                    className="ml-5 border border-neutral-900 rounded p-1"
                    defaultValue={cart.quantity}
                    onChange={(ev) => handleChange(ev, cart.items.id, cart.cart_id)}
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
            <Recommend recommend={recommend} />
          </div>
          <div className="w-1/4 h-80 mt-20 p-10 border-2 border-neutral-900 rounded bg-gray-100 sticky top-10">
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
            <Link href="/purchase">
              <div className="container pt-1.5 text-center h-10 border-2 border-neutral-900 bg-white mt-8">
                <span>ご注文手続き</span>
              </div>
            </Link>
            <Link href="/">
              <div className="container pt-1.5 text-center h-10 border-2 border-neutral-900 bg-white mt-4">
                <span>お買い物を続ける</span>
              </div>
            </Link>
          </div>
        </div>
      ) : (
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
      )}
    </>
  )
}
