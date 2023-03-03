import Cookies from "js-cookie";
import addCart from "./addCart";

type GuestCartType = {
    itemId: number,
    quantity: number,
}

export default async function strageToCart() {
    const strageData = localStorage.getItem('GuestCart');
    if (strageData === null) {
        return
    } else {
        const parseStrageData: GuestCartType[] = JSON.parse(strageData);
        const uid = Cookies.get("id");
        localStorage.clear();
        const ucart = await fetch(`/api/carts?user_id=eq.${uid}`).then((res) => res.json());
        console.log(parseStrageData, uid, ucart);

        parseStrageData.forEach((item) => {
            addCart(item.itemId, item.quantity)
        })
    }
}
