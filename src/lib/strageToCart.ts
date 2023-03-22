import Cookies from 'js-cookie';
import addCart from './addCart';

type GuestCartType = {
  itemId: number;
  quantity: number;
};

export default async function strageToCart() {
  const strageData = localStorage.getItem('GuestCart');
  console.log(strageData);
  if (strageData === null) {
    return;
  } else {
    const parseStrageData: GuestCartType[] = JSON.parse(strageData);
    const uid = await fetch(`/api/getCookieValue`).then((res) =>
      res.json()
    );
    console.log('strageToCart', uid);
    localStorage.clear();
    // const ucart = await fetch(`/api/carts?user_id=eq.${uid}`).then(
    //   (res) => res.json()
    // );

    parseStrageData.forEach((item) => {
     addCart(item.itemId, item.quantity);
    });
  }
}
