import Image from "next/image"
import Link from "next/link"

export default function Home() {
  // ダミーデータ
  const kaguData = {
    url: '/images/accessory/accessory_nordic_3.jpeg',
    price: 5000
  }

  // ダミーデータ配列
  const newItems = Array(8).fill(kaguData)

  // カテゴリ用配列
  const category = [
    {name: 'テーブル', src: '/images/table/table_natural_1.jpg', alt: 'table'},
    {name: '椅子', src: '/images/chair/chair_natural_3.jpg', alt: 'chair'},
    {name: 'ソファ', src: '/images/sofa/sofa_natural_2.jpg', alt: 'sofa'},
    {name: 'ベッド', src: '/images/bed/bed_natural_3.jpg', alt: 'bed'},
    {name: '収納棚', src: '/images/chest/chest_nordic_3.jpeg', alt: 'chest'},
    {name: 'ラグ', src: '/images/rug/rug_nordic_2.jpeg', alt: 'rug'},
    {name: '照明', src: '/images/light/light_natural_3.jpg', alt: 'light'},
    {name: 'カーテン', src: '/images/curtain/curtain_natural_3.jpg', alt: 'curtain'},
    {name: 'インテリア雑貨', src: '/images/accessory/accessory_jmodern_3.jpeg', alt: 'accessory'},
  ]

  return (
    <main className="mx-auto">
      <div className="relative">
        {/* 背景イメージは後から変えてください（３枚だけ用意してます） */}
        <Image src={'/images/background/top_image_2.jpeg'} alt={'top-image'} width={1920} height={800} />
        {/* ロゴは後で作成予定 */}
        <Image
          src={''} alt={'top-logo'} width={400} height={200}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border"
        />
        <div className="absolute left-1/2 top-3/4 -translate-x-1/2 -translate-y-1/2">
          <button className="bg-white">
            <Link href="/">
              <div className="mx-auto pt-1.5 text-center w-96 h-10 border-2 border-neutral-900">
                <span>コーディネートをランダム生成する</span><span className="float-right mr-1">→</span>
              </div>
            </Link>
          </button>
        </div>
      </div>
      <div className="mt-10">
        <h2 className="text-center text-xl font-bold">新着商品</h2>
        <div className="container mx-auto p-2 flex gap-5 justify-center">
          {/* 大きく表示する商品 */}
          <Link href={'/'}>
            <div>
              <Image src={kaguData.url} alt={'kagu'} width={285} height={285} className="rounded"/>
              <p className="text-lg">¥{kaguData.price.toLocaleString()}</p>
            </div>
          </Link>
          <ul className="grid grid-cols-4 gap-4">
            {newItems.map((item,index) => (
              <Link href={'/'} key={index}>
                <li>
                  <Image src={item.url} alt={'kagu'} width={120} height={120} className="rounded" />
                  <p className="text-lg">¥{item.price.toLocaleString()}</p>
                </li>
              </Link>
            ))}
          </ul>
        </div>
        <button className="absolute left-1/2 -translate-x-1/2">
          <Link href="/">
            <div className="mx-auto pt-1.5 text-center w-96 h-10 border-2 border-neutral-900">
              <span>商品一覧へ</span><span className="float-right mr-1">→</span>
            </div>
          </Link>
        </button>
      </div>
      <div className="mx-auto mt-20 justify-center">
        {/* カテゴリの表示は２段で別々にmap()を使っています */}
        <h2 className="text-center text-xl font-bold">商品カテゴリから探す</h2>
        <ul className="grid grid-cols-5 gap-8 w-4/5 mx-auto mt-5">
          {category.slice(0, 5).map((item) => (
            <li key={item.alt}>
              <Link href={'/'}>
                <div className="relative block h-16 border-2 border-neutral-500">
                  <div className="absolute flex ml-2 top-1/2 -translate-y-1/2">
                    <Image src={item.src} alt={item.alt} width={50} height={50}/>
                    <span className="my-auto mx-2">{item.name}</span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <ul className="grid grid-cols-4 gap-7 w-3/5 mx-auto mt-5">
          {category.slice(5, 9).map((item) => (
            <li key={item.alt}>
              <Link href={'/'}>
                <div className="relative block h-16 border-2 border-neutral-500">
                  <div className="absolute ml-2 flex top-1/2 -translate-y-1/2">
                    <Image src={item.src} alt={item.alt} width={50} height={50}/>
                    <span className="my-auto ml-2">{item.name}</span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
