import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Cart() {
  // ダミーデータ作成
  const kaguData = {
    id: 1,
    url: '/images/accessory/accessory_nordic_3.jpeg',
    price: 5000,
    name: 'アニマルスツール',
    description: 'ふわふわな毛並み、今にも歩き出しそうな木の脚のスツール。'
  }
  const kaguArr = Array(4).fill(kaguData)
  // 合計金額
  const sumPrice = kaguArr.reduce((current, kagu) => current + kagu.price, 0)

  return (
    <>
      <Head>
        <title>カート</title>
      </Head>
      <main>
        <div className="flex mx-auto w-4/5 float-right gap-20">
          <div className="w-3/5 mt-10">
            <div className="flex">
              <h2 className="text-3xl font-bold">カート</h2>
              <span className="mt-2">{`(${kaguArr.length}点の商品)`}</span>
            </div>
            {kaguArr.map((item, index) => (
              <div key={index} className="border border-neutral-900 my-2 p-3 h-52">
                <div className="flex gap-5">
                  <Link href={'/'}>
                    <Image src={item.url} alt={item.name} width={150} height={150} className="rounded"/>
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

            <div className="mt-16 mb-5">
              <h2 className="text-3xl font-bold">こちらもいかがですか？</h2>
            </div>
            <div className="flex gap-3 mb-10">
              {kaguArr.slice(0, 2).map((item, index) => (
                <div key={index} className="border border-neutral-900 rounded p-3 mx-auto">
                  <div className="flex gap-5">
                    <Link href={'/'}>
                      <Image src={item.url} alt={item.name} width={120} height={120} className="rounded"/>
                    </Link>
                    <div className="px-2 py-2">
                      <Link href={'/'}>
                        <p className="underline mb-1">{item.name}</p>
                        <p className="mt-1">¥ {item.price.toLocaleString()}</p>
                      </Link>
                      <button className="p-1.5 text-center text-white h-10 mt-6 rounded bg-blue-500 hover:bg-blue-700">
                        カートに入れる
                      </button>
                    </div>
                  </div>
                </div>  
              ))}
            </div> 
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
            <Link href="/">
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
      </main>
    </>
  )
}
