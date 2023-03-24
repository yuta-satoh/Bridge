import { searchAddress, formValidate, checkInput } from "./register";

type User = {
    lastName: string,
    firstName: string,
    gender: string,
    tell1: string,
    tell2: string,
    tell3: string,
    email: string,
    zipcode1: string,
    zipcode2: string,
    address: string,
    password: string,
    confirmationPassword: string,
}

type Result = {
    newObjText: User;
    newObjIsError: {
        lastName: boolean,
        firstName: boolean,
        gender: boolean,
        tell1: boolean,
        tell2: boolean,
        tell3: boolean,
        email: boolean,
        zipcode1: boolean,
        zipcode2: boolean,
        address: boolean,
        password: boolean,
        confirmationPassword: boolean,
    }
}

describe('searchAddressの単体テスト', () => {
    const fetchMockOk = () => {
        return new Promise((resolve) => {
            resolve({
                ok: true,
                status: 200,
                statusText: 'OK',
                json: () => {
                    return {
                        status: 200,
                        length: 1,
                        items: [
                            {
                                zipcode: "1050011",
                                pref: "東京都",
                                components: ["東京都", "港区", "芝公園"],
                                address: "港区芝公園"
                            }
                        ]
                    }
                }
            })
        })
    }
    
    const fetchMockNotFound = () => {
        return new Promise((resolve) => {
            resolve({
                ok: true,
                status: 200,
                statusText: 'OK',
                json: () => {
                    return {
                        status: 404,
                        message: 'Address Not Found'
                    }
                }
            })
        })
    }
    test('正常な郵便番号を入力', async () => {
        global.fetch = jest.fn().mockImplementation(fetchMockOk);
        const expected = await searchAddress('1050011')
        expect(expected).toMatchObject({
            address: '東京都港区芝公園',
            error: ''
        })
    })
    test('存在しない郵便番号を入力', async () => {
        global.fetch = jest.fn().mockImplementation(fetchMockNotFound)
        const expected = await searchAddress('9999999')
        expect(expected).toMatchObject({
            address: '',
            error: '※住所が見つかりません'
        })
    })
})

describe('formValidateの単体テスト', () => {
    test('名字を入力している', () => {
        const expected = formValidate('lastName', '田中')
        expect(expected).toBe('')
    })
    test('名字が未入力', () => {
        const expected = formValidate('lastName', '')
        expect(expected).toBe('※名前を入力して下さい')
    })
    test('名前を入力している', () => {
        const expected = formValidate('firstName', '太郎')
        expect(expected).toBe('')
    })
    test('名前が未入力', () => {
        const expected = formValidate('firstName', '')
        expect(expected).toBe('※名前を入力して下さい')
    })
    test('性別を選択している', () => {
        const expected = formValidate('gender', 'men')
        expect(expected).toBe('')
    })
    test('性別が未選択', () => {
        const expected = formValidate('gender', '')
        expect(expected).toBe('※性別を選択して下さい')
    })
    test('メールアドレスを正常に入力している', () => {
        const expected = formValidate('email', 'rakus@example.com')
        expect(expected).toBe('')
    })
    test('メールアドレスが未入力', () => {
        const expected = formValidate('email', '')
        expect(expected).toBe('※メールアドレスを入力して下さい')
    })
    test('メールアドレスが異常に入力されている（先頭に@）', () => {
        const expected = formValidate('email', '@example.com')
        expect(expected).toBe('※メールアドレスの形式が不正です')
    })
    test('メールアドレスが異常に入力されている（末尾に@）', () => {
        const expected = formValidate('email', 'rakus@')
        expect(expected).toBe('※メールアドレスの形式が不正です')
    })
    test('メールアドレスが異常に入力されている（@が無い）', () => {
        const expected = formValidate('email', 'rakusexample.com')
        expect(expected).toBe('※メールアドレスの形式が不正です')
    })
    test('郵便番号が正常に入力されている', () => {
        const expected1 = formValidate('zipcode1', '105')
        const expected2 = formValidate('zipcode2', '0011')
        expect(expected1).toBe('')
        expect(expected2).toBe('')
    })
    test('郵便番号（前半）が未入力', () => {
        const expected1 = formValidate('zipcode1', '')
        const expected2 = formValidate('zipcode2', '0011')
        expect(expected1).toBe('※郵便番号はXXX-XXXXの形式で入力して下さい')
        expect(expected2).toBe('')
    })
    test('郵便番号（後半）が未入力', () => {
        const expected1 = formValidate('zipcode1', '105')
        const expected2 = formValidate('zipcode2', '')
        expect(expected1).toBe('')
        expect(expected2).toBe('※郵便番号はXXX-XXXXの形式で入力して下さい')
    })
    test('郵便番号が全て未入力', () => {
        const expected1 = formValidate('zipcode1', '')
        const expected2 = formValidate('zipcode2', '')
        expect(expected1).toBe('※郵便番号はXXX-XXXXの形式で入力して下さい')
        expect(expected2).toBe('※郵便番号はXXX-XXXXの形式で入力して下さい')
    })
    test('郵便番号（前半）が異常な桁数', () => {
        const expected1 = formValidate('zipcode1', '11111')
        const expected2 = formValidate('zipcode2', '0011')
        expect(expected1).toBe('※郵便番号はXXX-XXXXの形式で入力して下さい')
        expect(expected2).toBe('')
    })
    test('郵便番号（後半）が異常な桁数', () => {
        const expected1 = formValidate('zipcode1', '105')
        const expected2 = formValidate('zipcode2', '111111')
        expect(expected1).toBe('')
        expect(expected2).toBe('※郵便番号はXXX-XXXXの形式で入力して下さい')
    })
    test('郵便番号が全て異常な桁数', () => {
        const expected1 = formValidate('zipcode1', '11111')
        const expected2 = formValidate('zipcode2', '111111')
        expect(expected1).toBe('※郵便番号はXXX-XXXXの形式で入力して下さい')
        expect(expected2).toBe('※郵便番号はXXX-XXXXの形式で入力して下さい')
    })
    test('住所を入力している', () => {
        const expected = formValidate('address', '東京都港区芝公園1-1-1')
        expect(expected).toBe('')
    })
    test('住所が未入力', () => {
        const expected = formValidate('address', '')
        expect(expected).toBe('※住所を入力して下さい')
    })
    test('電話番号が全て入力されている', () => {
        const expected1 = formValidate('tell1', '123')
        const expected2 = formValidate('tell2', '4567')
        const expected3 = formValidate('tell3', '8910')
        expect(expected1).toBe('')
        expect(expected2).toBe('')
        expect(expected3).toBe('')
    })
    test('電話番号1が未入力', () => {
        const expected1 = formValidate('tell1', '')
        const expected2 = formValidate('tell2', '4567')
        const expected3 = formValidate('tell3', '8910')
        expect(expected1).toBe('※電話番号はXXXX-XXXX-XXXXの形式で入力してください')
        expect(expected2).toBe('')
        expect(expected3).toBe('')
    })
    test('電話番号2が未入力', () => {
        const expected1 = formValidate('tell1', '123')
        const expected2 = formValidate('tell2', '')
        const expected3 = formValidate('tell3', '8910')
        expect(expected1).toBe('')
        expect(expected2).toBe('※電話番号はXXXX-XXXX-XXXXの形式で入力してください')
        expect(expected3).toBe('')
    })
    test('電話番号3が未入力', () => {
        const expected1 = formValidate('tell1', '123')
        const expected2 = formValidate('tell2', '4567')
        const expected3 = formValidate('tell3', '')
        expect(expected1).toBe('')
        expect(expected2).toBe('')
        expect(expected3).toBe('※電話番号はXXXX-XXXX-XXXXの形式で入力してください')
    })
    test('パスワードを正常に入力している', () => {
        const expected = formValidate('password', 'rakus123')
        expect(expected).toBe('')
    })
    test('パスワードが未入力', () => {
        const expected = formValidate('password', '')
        expect(expected).toBe('※パスワードを入力して下さい')
    })
    test('パスワードに使用できない記号が含まれている', () => {
        const expected = formValidate('password', '>>rakus>>123>>')
        expect(expected).toBe('※半角英数字の大文字と小文字、数字、記号(!"#$%)のみ使用可能です')
    })
    test('パスワードが英数字の組み合わせでない', () => {
        const expected = formValidate('password', 'rakurakuraku')
        expect(expected).toBe('※英数字を組み合わせたパスワードにして下さい')
    })
    test('パスワードの文字数が8文字（正常）', () => {
        const expected = formValidate('password', 'rakus123')
        expect(expected).toBe('')
    })
    test('パスワードの文字数が20文字（正常）', () => {
        const expected = formValidate('password', 'rakusrakus1234567890')
        expect(expected).toBe('')
    })
    test('パスワードの文字数が8文字未満', () => {
        const expected = formValidate('password', 'raku12')
        expect(expected).toBe('※８文字以上２０文字以内で設定してください')
    })
    test('パスワードの文字数が21文字以上', () => {
        const expected = formValidate('password', 'rakusrakus123456789000')
        expect(expected).toBe('※８文字以上２０文字以内で設定してください')
    })
    test('確認用パスワードを正常に入力している', () => {
        const expected = formValidate('confirmationPassword', 'rakus123', 'rakus123')
        expect(expected).toBe('')
    })
    test('確認用パスワードが未入力', () => {
        const expected = formValidate('confirmationPassword', '', 'rakus123')
        expect(expected).toBe('※確認用パスワードを入力して下さい')
    })
    test('パスワードと確認用パスワードが一致していない', () => {
        const expected = formValidate('confirmationPassword', 'rakus456', 'rakus123')
        expect(expected).toBe('※パスワードと確認用パスワードが不一致です')
    })
})

describe('checkInputの単体テスト', () => {
    // 変数を初期化する
    let userInfo: User
    let result: Result

    // 各テストごとに再割り当てする
    beforeEach(() => {
        userInfo = {
            lastName: '田中',
            firstName: '太郎',
            gender: 'men',
            tell1: '111',
            tell2: '2222',
            tell3: '3333',
            email: 'rakus@example.com',
            zipcode1: '105',
            zipcode2: '0011',
            address: '東京都港区芝公園1-1-1',
            password: 'rakus123',
            confirmationPassword: 'rakus123',
        }
        result = {
            newObjText: {
                lastName: '',
                firstName: '',
                gender: '',
                tell1: '',
                tell2: '',
                tell3: '',
                email: '',
                zipcode1: '',
                zipcode2: '',
                address: '',
                password: '',
                confirmationPassword: '',
            },
            newObjIsError: {
                lastName: false,
                firstName: false,
                gender: false,
                tell1: false,
                tell2: false,
                tell3: false,
                email: false,
                zipcode1: false,
                zipcode2: false,
                address: false,
                password: false,
                confirmationPassword: false,
            }
        }
    })
    test('１ヶ所のみ空欄がある(名前)', () => {
        userInfo.firstName = ''
        const expected = checkInput(userInfo)
        result.newObjText.firstName = '※名前を入力して下さい'
        result.newObjIsError.firstName = true
        expect(expected).toEqual(result)
    })
    test('複数の空欄がある(名前, メールアドレス, 住所)', () => {
        userInfo.firstName = ''
        userInfo.email = ''
        userInfo.address = ''
        const expected = checkInput(userInfo)
        result.newObjText.firstName = '※名前を入力して下さい'
        result.newObjIsError.firstName = true
        result.newObjText.email = '※メールアドレスを入力して下さい'
        result.newObjIsError.email = true
        result.newObjText.address = '※住所を入力して下さい'
        result.newObjIsError.address = true
        expect(expected).toEqual(result)
    })

})
