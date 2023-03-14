import getCookieValue from "./getCookieValue"

export default async function deleteCart(itemId: number, cartId?: number) {
    // cookieがあるか確認
    const userId = getCookieValue();

    if (userId) {
        try {
			await fetch("/api/deleteCart", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					item_id: itemId,
					cart_id: cartId,
				})
			})
				.then((res) => console.log("ステータス:", res.status))
		} catch(e) {
			console.log(e);
		} finally {
            location.reload()
        }

    } else {
        const strageData = localStorage.getItem('GuestCart');
        if (strageData === null) {
            return
        } else {
            const parseStrageData: { itemId: number, quantity: number }[] = JSON.parse(strageData);
            const filterStrageData = parseStrageData.filter((item) => item.itemId !== itemId)
            localStorage.setItem('GuestCart', JSON.stringify(filterStrageData))
        }
    }
}
