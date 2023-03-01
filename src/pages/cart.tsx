import Head from "next/head";
import { GetServerSideProps } from "next";
import UserCart from "@/components/UserCart";
import GuestCart from "@/components/GuestCart";
import { useEffect, useState } from "react";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // リクエストからクッキーを取得
  const userId = ctx.req.cookies['id']

  // クッキーがない時はprops無し
  if (userId === undefined) {
    return {
      props: {},
    };
  }
  return {
    props: { userId },
  };
}

export default function Cart({ userId }: { userId: string }) {
  // ゲスト用カートの状態を保存
  const [guestCart, setGuestCart] = useState([])
  
  // クライアントサイドでlocalstrageを取得
  useEffect(() => {
    // 仮データをセット
    const guestCartItems = ['5', '8', '12'];
    const itemsJson = JSON.stringify(guestCartItems);
    localStorage.setItem('GuestCart', itemsJson);

    // localstrageを取得しstateに格納、nullの場合は何も格納しない
    const strageData = localStorage.getItem('GuestCart');
    if (strageData === null) {
      setGuestCart([])
    } else {
      setGuestCart(JSON.parse(strageData));
    }
  }, [])

  // ユーザーとゲストで表示を切り替え
  if (userId) {
    return (
      <>
        <Head>
          <title>カート</title>
        </Head>
        <UserCart userId={userId} />
      </>
    )
  } else {
    return (
      <>
        <Head>
          <title>カート</title>
        </Head>
        <GuestCart guestCart={guestCart} />
      </>
    )
  }
}
