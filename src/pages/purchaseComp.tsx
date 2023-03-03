import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import pstyles from "../styles/purchaseComp.module.css"
import React from "react";

export default function purchaseComp(){

return(
    <>
    <Head>
        <title>購入完了</title>
    </Head>
    <main className={pstyles.main}>
        <div className={pstyles.img}>
        <Link href="/">
        <Image
        src="/purchase3.jpeg"
        alt="購入完了"
        width={650}
        height={400}
        />
        </Link>
        </div>

        <div className={pstyles.order}>
            <div className={pstyles.order_number}>
            <ul>
            <li>お客様のご注文番号</li>
            <li className={pstyles.order_num}>1234456ランダムで入る</li>
            </ul>
            </div>

            <div className={pstyles.order_details}>
            <ul>
            <li>ご注文ありがとうございます。</li>
            <li>明細メールをご登録メールアドレスにお送りしましたのでご確認ください。</li>
            </ul>
            </div>
        </div>

        <div className={pstyles.order_toplink}>
        <Link href="/">
            TOPページへ→
            </Link>
        </div>
    </main>
    </>

)

}
