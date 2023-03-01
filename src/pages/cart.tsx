import Head from "next/head";
import { GetServerSideProps } from "next";
import UserCart from "@/components/UserCart";
import GuestCart from "@/components/GuestCart";
import { useEffect, useState } from "react";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const userId = ctx.req.cookies['id']

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
  
  const [guestCart, setGuestCart] = useState([])
  
  useEffect(() => {
    const guestCartItems = ['5', '8', '12'];
    const itemsJson = JSON.stringify(guestCartItems);
    localStorage.setItem('GuestCart', itemsJson);
    const strageData = localStorage.getItem('GuestCart');
    if (strageData === null) {
      setGuestCart([])
    } else {
      setGuestCart(JSON.parse(strageData));
    }
  }, [])

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
