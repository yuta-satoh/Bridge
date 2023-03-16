import Link from "next/link";
import Image from "next/image";
import useSWR, { Fetcher } from 'swr';
import addCart from "@/lib/addCart";
import { useRouter } from "next/router";
import Button from "./utils/Button";

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

type Recommend = {
  id: number,
  genre: string,
}

export default function Recommend({ recommend, reloadStrage }: { recommend: Recommend[], reloadStrage?: () => void }) {
  const fetcher: Fetcher<Item[], string> = (...args) => fetch(...args).then((res) => res.json());
  const router = useRouter()

  const itemQuery = recommend.reduce((query, item) => query + `,id.eq.${item.id}`, "").replace(",", "")
  const queryParams = `not.or=(${itemQuery})`
  const { data: recommendItem, error } = useSWR(`/api/getItems?genre=${recommend[0].genre}&id=${queryParams}`, fetcher)

  if (error) return (
    <div className="w-4/5 mx-auto">
      <div className="block py-40 mx-auto my-10 bg-neutral-100 rounded">
        <h2 className="text-center text-3xl font-bold mb-10">おすすめ商品がありません</h2>
      </div>
    </div>
  )
  if (!recommendItem) return <div>loading...</div>

  const addCartReload = async (itemId: number) => {
    await addCart(itemId, 1);
    // ローカルストレージを空にする処理が入っていないので更新処理できない
    if (reloadStrage === undefined) {
      router.reload()
      return
    }
    // ゲストユーザーの更新処理のみ可能
    reloadStrage();
  }

  return (
    <>
      <div className="mt-16 mb-5">
        <h2 className="text-3xl font-bold">こちらもいかがですか？</h2>
      </div>
      <div className="flex gap-3 mb-10">
        {recommendItem.slice(0, 2).map((item, index) => (
          <div key={index} className="border border-neutral-900 w-1/2 rounded p-3 mx-auto">
            <div className="flex gap-5">
              <Link href={`/items/itemlist/${item.id}`}>
                <Image src={item.imgurl} alt={item.name} width={100} height={100} className="rounded"/>
              </Link>
              <div className="px-2 py-2">
                <Link href={`/items/itemlist/${item.id}`}>
                  <p className="underline mb-1 text-sm">{item.name}</p>
                  <p className="mt-1 mb-5">¥ {item.price.toLocaleString()}</p>
                </Link>
                <Button
                  type="button"
                  color="pink"
                  shadow
                  onClick={() => {
                    addCartReload(item.id)
                  }}
                >
                  カートに入れる
                </Button>
              </div>
            </div>
          </div>  
        ))}
      </div> 
    </>
  )
}
