import Link from "next/link";
import Image from "next/image";
import useSWR, { Fetcher } from 'swr';
import addCart from "@/lib/addCart";

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

export default function Recommend({ filteredItemData }: { filteredItemData: Item[] }) {
  const fetcher: Fetcher<Item[], string> = (...args) => fetch(...args).then((res) => res.json());
  
  const endCartItem = filteredItemData[filteredItemData.length - 1]
  const itemQuery = filteredItemData.reduce((query, item) => query + `,id.eq.${item.id}`, "").replace(",", "")
  const queryParams = `not.or=(${itemQuery})`
  const { data: recommendItem, error } = useSWR(`/api/getItems?genre=eq.${endCartItem.genre}&id=${queryParams}`, fetcher)

  if (error) return (
    <div className="w-4/5 mx-auto">
      <div className="block py-40 mx-auto my-10 bg-neutral-100 rounded">
        <h2 className="text-center text-3xl font-bold mb-10">おすすめ商品がありません</h2>
      </div>
    </div>
  )
  if (!recommendItem) return <div>loading...</div>

  return (
    <>
      <div className="mt-16 mb-5">
        <h2 className="text-3xl font-bold">こちらもいかがですか？</h2>
      </div>
      <div className="flex gap-3 mb-10">
        {recommendItem.slice(0, 2).map((item, index) => (
          <div key={index} className="border border-neutral-900 w-1/2 rounded p-3 mx-auto">
            <div className="flex gap-5">
              <Link href={'/'}>
                <Image src={item.imgurl} alt={item.name} width={100} height={100} className="rounded"/>
              </Link>
              <div className="px-2 py-2">
                <Link href={'/'}>
                  <p className="underline mb-1 text-sm">{item.name}</p>
                  <p className="mt-1">¥ {item.price.toLocaleString()}</p>
                </Link>
                <button
                  className="p-1.5 text-center text-white h-10 mt-3 rounded bg-blue-500 hover:bg-blue-700"
                  onClick={() => {
                    addCart(item.id, 1);
                  }}
                >
                  カートに入れる
                </button>
              </div>
            </div>
          </div>  
        ))}
      </div> 
    </>
  )
}
