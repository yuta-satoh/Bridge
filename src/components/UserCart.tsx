import useSWR, { Fetcher } from "swr";
import Link from "next/link";
import Image from "next/image";
import Recommend from "./Recommend";
import deleteCart from "@/lib/deleteCart";
import { ChangeEvent } from "react";
import Button from "./utils/Button";
import SelectBox from "./utils/SelectBox";
import { useRouter } from "next/router";
import Loading from "./utils/Loading";
import { useWindowSize } from "@/lib/useWindowSize";

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
  const windowSize = useWindowSize()
  const router = useRouter();
  // SWRでアイテムを取得
  const { data: cartItemData, error, mutate } = useSWR(`/api/getCart/items`, fetcher)

  // カートにデータがない時の表示
	if (error) return (
    <div className="w-3/4 min-w-full">
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

	if (!cartItemData) return <Loading height={500} />

  const filtercartItems = cartItemData.filter((cart) => cart.delete === false)

  const recommend = filtercartItems.map((cart) => {
    return {
      id: cart.items.id,
      genre: cart.items.genre
    }
  })

  // 合計金額
  const sumPrice = filtercartItems.reduce((current, cart) => current + (cart.items.price * cart.quantity), 0)

  const handleDelete = async (itemId: number, cartId: number) => {
    await deleteCart(itemId, cartId);
    mutate(filtercartItems);
  }

  const handleChange = async (ev: ChangeEvent<HTMLSelectElement>, itemId: number, cartId: number) => {
    const value = ev.target.value
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
    }).then((res) => res.status)
    mutate(filtercartItems)
  }

	return (
    <>
      {filtercartItems.length !== 0 ? (
        <div className="pc:flex pc:flex-row-reverse mx-auto w-fit sp:w-4/5 pc:w-4/5 gap-32">
          {windowSize.width < 1080 ? 
          <div className="flex w-4/5 mx-auto mt-10">
              <h2 className="text-3xl font-bold">合計</h2>
              <span className="mt-2">{`(${filtercartItems.length}点の商品)`}</span>
          </div>
          : <></> }
          <div className="mx-auto w-4/5 pc:w-1/4 h-80 mt-4 pc:mt-20 p-10 border-2 border-neutral-900 rounded bg-gray-100 pc:sticky top-10 min-w-max">
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
            <div className="flex flex-col items-center gap-5 mt-5">
              <Button
                type="button"
                color="white"
                onClick={() => router.push("/purchase")}
              >
                ご注文手続き
              </Button>
              <Button
                type="button"
                color="white"
                onClick={() => router.push("/")}
              >
                お買い物を続ける
              </Button>
            </div>
          </div>
          <div className="mx-auto w-4/5 sp:w-full pc:w-3/5 mt-10">
            <div className="flex">
              <h2 className="text-3xl font-bold">カート</h2>
              <span className="mt-2">{`(${filtercartItems.length}点の商品)`}</span>
            </div>
            {filtercartItems.map((cart, index) => (
              <div key={index} className="border border-neutral-900 my-2 py-3 px-8 w-full min-h-max">
                <div className="sp:flex sp:gap-5">
                  <Link href={`/items/itemlist/${cart.items.id}`}>
                    <Image src={cart.items.imgurl} alt={cart.items.name} width={150} height={150} className="rounded w-36 h-36 mx-auto"/>
                  </Link>
                  <div className="px-3 py-4">
                    <Link href={`/items/itemlist/${cart.items.id}`}>
                      <p className="underline mb-1 text-xl">{cart.items.name}</p>
                    </Link>
                    <p className="text-sm mt-1">{cart.items.description}</p>
                    <p className="mt-1 text-lg">¥ {cart.items.price.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    color="black"
                    onClick={() => handleDelete(cart.items.id, cart.cart_id)}  
                  >
                    削除
                  </Button>
                  <SelectBox
                    arr={Array(10).fill(0).map((arr, index) => arr + index + 1 )}
                    name="quantity"
                    id="cart_quantity"
                    defaultValue={cart.quantity}
                    onChange={(ev) => handleChange(ev, cart.items.id, cart.cart_id)}
                  />
                </div>
              </div>  
            ))}
            <Recommend recommend={recommend} />
          </div>
        </div>
      ) : (
        <div className="w-4/5 mx-auto">
          <h2 className="text-3xl font-bold mt-10">カート</h2>
          <div className="block py-40 mx-auto my-10 bg-neutral-100 rounded">
            <h2 className="text-center text-3xl font-bold mb-10">カートに商品がありません</h2>
            <Link href="/">
              <div className="container mx-auto pt-1.5 text-center h-10 w-1/2 sp:w-1/3 sp:min-w-max border-2 border-neutral-900 bg-white mt-4">
                お買い物はこちらから
              </div>
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
