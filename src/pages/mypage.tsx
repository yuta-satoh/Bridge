import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Mypage() {
    return (
        <>
            <Head>
                <title>マイページ</title>
            </Head>
            <main>
                <section>
                    <h1>マイページ</h1>
                    <div>
                        <h2>カートの商品</h2>
                        <Link href="#">すべて見る</Link>
                    </div>
                    <h2>会員情報の登録/更新</h2>
                </section>
            </main>
        </>
    )
}
