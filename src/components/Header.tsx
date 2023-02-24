import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <header className="h-28 w-screen bg-orange-900">
            <div className="flex items-center justify-center h-20 w-screen bg-white absolute top-8">
                <Link href={'/'}>
                    <div className="">
                        <Image src="" alt="bridge-logo" width={210} height={50} className="border mr-36"/>
                    </div>
                </Link>
                <ul className="flex gap-10 mr-60 ml-30">
                    <li>商品</li>
                    <li>お知らせ</li>
                    <li>ヘルプ</li>
                </ul>
                <div className="flex gap-10">
                    <form>
                        <input type="text" placeholder="何をお探しですか？" />
                        <button type="submit">検索</button>
                    </form>
                    <Link href={'/login'}>
                        <div>
                            <span>ログイン</span>
                        </div>
                    </Link>
                    <Link href={'/'}>
                        <div>
                            <span>カート</span>
                        </div>
                    </Link>
                </div>
            </div>
        </header>
    )
}
