import { searchAddress } from "./register";

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

describe('searchAddressの単体テスト', () => {
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
