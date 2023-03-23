// zipcodeはハイフン無しで引数に渡す
export const searchAddress = async (zipcode: string) => {
    const url = 'https://zipcoda.net/api?';
    // 受け取った郵便番号からURLのインスタンスを取得
    const params = new URLSearchParams({ zipcode: zipcode })

    const response = await fetch(url + params)
    const data = await response.json()
    console.log(data)

    // 受け取ったデータから都道府県と住所を取得
    // エラーの時と分岐
    const result = {
        address: data.status === 200 ? `${data.items[0].pref}${data.items[0].address}` : '',
        error: data.status === 200 ? '' : '※住所が見つかりません'
    }
    return result
}
