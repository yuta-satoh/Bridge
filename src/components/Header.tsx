import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <header className="h-28 w-screen bg-orange-900">
            <div className="flex items-center justify-center h-20 w-screen bg-white absolute top-8">
                <Link href={'/'}>
                    <div>
                        <Image src="/images/logo/ロゴ候補3.png" alt="bridge-logo" width={200} height={80}/>
                    </div>
                </Link>
                <ul className="flex gap-10 mr-60 ml-30">
                    <li>商品</li>
                    <li>お知らせ</li>
                    <li>ヘルプ</li>
                </ul>
                <div className="flex gap-10">
                    <form>
                        <input className="h-8 border border-neutral-500 rounded-l pl-2.5" type="text" placeholder="何をお探しですか？" />
                        <button className="h-8 text-white bg-neutral-900 border border-neutral-900 rounded-r px-1" type="submit">検索</button>
                    </form>
                    <Link href={'/login'}>
                        <div>
                            <span className="inline-block mt-1">ログイン</span>
                        </div>
                    </Link>
                    <Link href={'/cart'}>
                        <div>
                            <span className="inline-block mt-1">カート</span>
                        </div>
                    </Link>
                </div>
            </div>
        </header>
    )
}
