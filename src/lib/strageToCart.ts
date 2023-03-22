
import addCart from "./addCart";

type GuestCartType = {
  itemId: number;
  quantity: number;
};

export default async function strageToCart() {

    const strageData = localStorage.getItem('GuestCart');
    if (strageData === null) {
        return
    } else {
        const parseStrageData: GuestCartType[] = JSON.parse(strageData);

    parseStrageData.forEach((item) => {
     addCart(item.itemId, item.quantity);
    });
  }
}
