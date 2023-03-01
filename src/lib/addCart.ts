import getCookieValue from "./getCookieValue"

type GuestCart = {
	itemId: number,
	quantity: number,
}

// 日付を取得
const getDate = (date: Date) => {
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	if (month < 10 && day < 10) {
		return `${year}-0${month}-0${day}`
	} else if (month < 10) {
		return `${year}-0${month}-${day}`
	} else if (day < 10) {
		return `${year}-${month}-0${day}`
	} else {
		return `${year}-${month}-${day}`
	}
}

export default async function addCart(itemId: number, quantity: number) {
	// cookieがあるか確認
  const userId = getCookieValue()
	// cookieがある場合はcart_itemsにPOST
  if (userId) {
		// ユーザーのカート情報を取得
		const cart = await fetch(`/api/getCart?id=${userId}`).then((res) => res.json());

		const cartId: number = cart[0].id
		// カートに追加した時の日付を取得
		const nowDate = getDate(new Date());

		try {
			await fetch("/api/addCart", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					item_id: itemId,
					cart_id: cartId,
					date: nowDate,
					quantity: quantity,
					delete: false,
				})
			})
				.then((res) => console.log("ステータス:", res.status))
		} catch(e) {
			console.log(e);
		}
  } else {
		// cookieがない場合はlocalstrageに格納
    const currentStrageData = localStorage.getItem('GuestCart');
		console.log(currentStrageData);

		// 型ガードしつつストレージの有無によって処理を切り替え
		if (currentStrageData === null) {
			const newStrageData: GuestCart[] = [{ itemId: itemId, quantity: quantity }];
			localStorage.setItem('GuestCart', JSON.stringify(newStrageData));
		} else {
			const nextStrageData: GuestCart[] = JSON.parse(currentStrageData);
			nextStrageData.push({ itemId: itemId, quantity: quantity });
		}
  }
}