import getCookieValue from './getCookieValue';
import { useEffect, useState } from 'react';

type GuestCart = {
  itemId: number;
  quantity: number;
};

// 日付を取得
const getDate = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  if (month < 10 && day < 10) {
    return `${year}-0${month}-0${day}`;
  } else if (month < 10) {
    return `${year}-0${month}-${day}`;
  } else if (day < 10) {
    return `${year}-${month}-0${day}`;
  } else {
    return `${year}-${month}-${day}`;
  }
};

export default async function addCart(
  itemId: number,
  quantity: number
) {
  //   const [userId, setUserId] = useState('');

  // cookieがあるか確認
  // const userId = getCookieValue()
  const userId = await fetch(`/api/getCookieValue`).then((res) =>
    res.json()
  );
  // console.log(`addCart` ,userId)
  // cookieがある場合はcart_itemsにPOST
  if (userId) {
    // ユーザーのカート情報を取得
    const cart = await fetch(`/api/getCart?id=${userId}`).then(
      (res) => res.json()
    );
    const cartId: number = cart[0].id;
    // カートに追加した時の日付を取得
    const nowDate = getDate(new Date());

    try {
      await fetch('/api/addCart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          item_id: itemId,
          cart_id: cartId,
          date: nowDate,
          quantity: quantity,
          delete: false,
        }),
      }).then((res) => console.log('ステータス:', res.status));
    } catch (e) {
      console.log(e);
    }
  } else {
    // cookieがない場合はlocalstrageに格納
    const currentStrageData = localStorage.getItem('GuestCart');
    // 型ガードしつつストレージの有無によって処理を切り替え
    if (currentStrageData === null) {
      const newStrageData: GuestCart[] = [
        { itemId: itemId, quantity: quantity },
      ];
      localStorage.setItem(
        'GuestCart',
        JSON.stringify(newStrageData)
      );
    } else {
      const nextStrageData: GuestCart[] =
        JSON.parse(currentStrageData);
      const filterStrageData = nextStrageData.filter(
        (item) => item.itemId === itemId
      );
      if (filterStrageData.length === 0) {
        // 商品が被っていない時の処理
        nextStrageData.push({ itemId: itemId, quantity: quantity });
        localStorage.setItem(
          'GuestCart',
          JSON.stringify(nextStrageData)
        );
      } else {
        // 商品が被っている時の処理
        const rewriteItem = {
          itemId: filterStrageData[0].itemId,
          quantity: filterStrageData[0].quantity + quantity,
        };
        const rewriteStrageData = nextStrageData.filter(
          (item) => item.itemId !== itemId
        );
        rewriteStrageData.push(rewriteItem);
        localStorage.setItem(
          'GuestCart',
          JSON.stringify(rewriteStrageData)
        );
      }
    }
  }
}
