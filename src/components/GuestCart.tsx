import useSWR, { Fetcher } from "swr";
import Link from "next/link";
import Image from "next/image";
import Recommend from "./Recommend";
import deleteCart from "@/lib/deleteCart";
import { ChangeEvent } from "react";
import { useRouter } from "next/router";
import Button from "./utils/Button";
import Loading from "./utils/Loading";
import { useWindowSize } from "@/lib/getWindowSize";

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

type GuestCartType = {
  itemId: number,
  quantity: number,
}

const fetcher: Fetcher<Item[], string> = (...args) => fetch(...args).then((res) => res.json());

export default function GuestCart({ guestCart, reloadStrage }: { guestCart: GuestCartType[], reloadStrage: () => void }) {
  const windowSize = useWindowSize()
  const router = useRouter();
  // 受け取ったゲストカートからクエリパラメータを作成
  const itemQuery = guestCart.reduce((query, cartItem) => query + `,id.eq.${cartItem.itemId}`, "").replace(",", "");
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
          <div className="container mx-auto pt-1.5 text-center h-10 w-1/2 sp:w-1/3 sp:min-w-max border-2 border-neutral-900 bg-white mt-4">
            お買い物はこちらから
          </div>
        </Link>
      </div>
    </div>
  )

	if (!cartItemData) return <Loading height={500} />
  
  // deleteフラグの立っているアイテムを除去
  const filteredItemData = cartItemData.filter((item) => !item.delete)
  const recommend = filteredItemData.map((item) => {
    return {
      id: item.id,
      genre: item.genre
    }
  })
  
  // 合計金額
  const sumPrice = filteredItemData.reduce((current, item) =>
    current + item.price * guestCart.filter((gitem) => gitem.itemId === item.id)[0].quantity, 0)

  const handleDelete = async (itemId: number) => {
    await deleteCart(itemId);
    reloadStrage()
  }

  const handleChange = async (ev: ChangeEvent<HTMLSelectElement>, itemId: number) => {
    const value = ev.target.value
    const strageData = localStorage.getItem("GuestCart");
    if (strageData === null) {
      return
    } else {
      const parseStrageData: GuestCartType[] = JSON.parse(strageData);
      const changeStrageData = parseStrageData.filter((gitem) => gitem.itemId === itemId)[0]
      changeStrageData.quantity = Number(value);
      const nextStrageData = parseStrageData.filter((gitem) => gitem.itemId !== itemId);
      nextStrageData.push(changeStrageData);
      localStorage.setItem("GuestCart", JSON.stringify(nextStrageData));
      reloadStrage()
    }
  }

	return (
    <div className="pc:flex pc:flex-row-reverse mx-auto w-screen sp:w-3/5 pc:w-4/5 gap-32">
      {windowSize.width < 1080 ? 
        <div className="flex w-4/5 mx-auto mt-10">
            <h2 className="text-3xl font-bold">合計</h2>
            <span className="mt-2">{`(${filteredItemData.length}点の商品)`}</span>
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
            onClick={() => router.push("/login")}
          >
            ログイン
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
          <span className="mt-2">{`(${filteredItemData.length}点の商品)`}</span>
        </div>
        {filteredItemData.map((item, index) => (
          <div key={index} className="border border-neutral-900 my-2 py-3 px-8 w-full min-h-max">
            <div className="sp:flex sp:gap-5">
              <Link href={`/items/itemlist/${item.id}`}>
                <Image src={item.imgurl} alt={item.name} width={150} height={150} className="rounded w-36 h-36 mx-auto"/>
              </Link>
              <div className="px-3 py-4">
                <Link href={`/items/itemlist/${item.id}`}>
                  <p className="underline mb-1 text-xl">{item.name}</p>
                </Link>
                <p className="text-sm mt-1">{item.description}</p>
                <p className="mt-1 text-lg">¥ {item.price.toLocaleString()}</p>
              </div>
            </div>
            <div className="text-right">
              <Button
                type="button"
                color="black"
                onClick={() => handleDelete(item.id)}  
              >
                削除
              </Button>
              {/* 個数を変えたら金額も変更したい（CSRで） */}
              <select
                name="quantity"
                id="cart_quantity"
                data-testid="select-option"
                className="ml-5 border border-neutral-900 rounded p-1"
                defaultValue={guestCart.filter((gitem) => gitem.itemId === item.id)[0].quantity}
                onChange={(ev) => handleChange(ev, item.id)}
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
        <Recommend recommend={recommend} reloadStrage={reloadStrage} />
      </div>
    </div>
  )
}
