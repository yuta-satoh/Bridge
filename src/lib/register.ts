// zipcodeはハイフン無しで引数に渡す
export const searchAddress = async (zipcode: string) => {
    const url = 'https://zipcoda.net/api?';
    // 受け取った郵便番号からURLのインスタンスを取得
    const params = new URLSearchParams({ zipcode: zipcode })

    const response = await fetch(url + params)
    const data = await response.json()

    // 受け取ったデータから都道府県と住所を取得
    // エラーの時と分岐
    const result = {
        address: data.status === 200 ? `${data.items[0].pref}${data.items[0].address}` : '',
        error: data.status === 200 ? '' : '※住所が見つかりません'
    }
    return result
}

// onChangeで<input>のnameとvalueを持ってきてvalidateする用の関数
// パスワード比較のために引数に渡す必要あり
export const formValidate = (key: string, value: string, password?: string) => {
    if (key === 'lastName' || key === 'firstName') {
        if (!value) {
            return '※名前を入力して下さい'
        }
        return ''
    }
    if (key === 'gender') {
        if (!value) {
            return '※性別を選択して下さい'
        }
        return ''
    }
    if (key === 'email') {
        if (!value) {
            return '※メールアドレスを入力して下さい'
        } else if (value.indexOf('@') === -1 || value.indexOf('@') === 0 || value.indexOf('@') === value.length-1) {
            return '※メールアドレスの形式が不正です'
        }
        return ''
    }
    if (key === 'zipcode1') {
        if (value.length !== 3) {
            return '※郵便番号はXXX-XXXXの形式で入力して下さい'
        }
        return '' 
    }
    if (key === 'zipcode2') {
        if (value.length !== 4) {
            return '※郵便番号はXXX-XXXXの形式で入力して下さい'
        }
        return ''
    }
    if (key === 'address') {
        if (!value) {
            return '※住所を入力して下さい'
        }
        return ''
    }
    if (key === 'tell1' || key === 'tell2' || key === 'tell3') {
        if (!value) {
            return '※電話番号はXXXX-XXXX-XXXXの形式で入力してください'
        }
        return ''
    }
    if (key === 'password') {
        const regax = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9!"#$%]{0,100}$/
        const regaxInput = /^[a-zA-Z0-9!"#$%]{0,100}$/
        if (!value) {
            return '※パスワードを入力して下さい'
        } else if (!regaxInput.test(value)) {
            return '※半角英数字の大文字と小文字、数字、記号(!"#$%)のみ使用可能です'
        } else if (!regax.test(value)) {
            return '※英数字を組み合わせたパスワードにして下さい'
        } else if (value.length < 8 || value.length > 20) {
            return '※８文字以上２０文字以内で設定してください'
        }
        return ''
    }
    if (key === 'confirmationPassword') {
        if (!value) {
            return '※確認用パスワードを入力して下さい'
        } else if (value !== password) {
            return '※パスワードと確認用パスワードが不一致です'
        }
        return ''
    }
}
