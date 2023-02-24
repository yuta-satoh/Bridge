import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Mypage() {
    return (
        <>
            <Head>
                <title>マイページ</title>
            </Head>
            <main>
                <Header />
                <Footer />
            </main>
        </>
    )
}
