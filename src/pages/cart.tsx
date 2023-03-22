import Head from 'next/head';
import UserCart from '@/components/UserCart';
import GuestCart from '@/components/GuestCart';
import { useEffect, useState } from 'react';

export default function Cart() {
  const [userId, setUserId] = useState('');

  useEffect(() => {
    fetch('/api/getCookieValue')
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setUserId(data);
        } else {
          setUserId('');
        }
      })
      .catch((error) => console.error(error));
  }, []);
  // const status = () => {
  //   const userId = Cookies.get('id');
  //   if (userId === undefined) {
  //     return userId;
  //   } else {
  //     return userId;
  //   }
  // }
  // const userId = status();

  // ゲスト用カートの状態を保存
  const [guestCart, setGuestCart] = useState([]);

  // クライアントサイドでlocalstrageを取得
  useEffect(() => {
    // 仮データをセット
    // const guestCartItems = [
    //   { itemId: 5, quantity: 1 },
    //   { itemId: 8, quantity: 1 },
    //   { itemId: 12, quantity: 1 },
    // ];

    // const itemsJson = JSON.stringify(guestCartItems);
    // localStorage.setItem('GuestCart', itemsJson);

    // localstrageを取得しstateに格納、nullの場合は何も格納しない
    reloadStrage();
  }, []);

  const reloadStrage = () => {
    const strageData = localStorage.getItem('GuestCart');
    if (strageData === null) {
      setGuestCart([]);
    } else {
      setGuestCart(JSON.parse(strageData));
    }
  };

  // ユーザーとゲストで表示を切り替え
  if (userId) {
    return (
      <>
        <Head>
          <title>カート</title>
        </Head>
        <UserCart userId={userId} />
      </>
    );
  } else {
    return (
      <>
        <Head>
          <title>カート</title>
        </Head>
        <GuestCart
          guestCart={guestCart}
          reloadStrage={reloadStrage}
        />
      </>
    );
  }
}
