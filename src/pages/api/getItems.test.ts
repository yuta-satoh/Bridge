import handler from './getItems';
import { NextApiRequest, NextApiResponse } from 'next';
import { Items, resData } from '@/types/types';

// リクエストとレスポンスをモック
const mockReq: NextApiRequest = {
    method: 'GET',
    query: {
        genre: 'hoge',
        category: 'hoge',
    }
} as unknown as NextApiRequest;

const mockRes: NextApiResponse<resData | Items[]> = {
    status: jest.fn(() => mockRes),
    json: jest.fn(),
    end: jest.fn(),
} as unknown as NextApiResponse<resData | Items[]>;

// ダミーの商品データ
const dummy_items: Items[] =[{
    id: 1,
    name: 'hoge',
    description: 'hoge',
    genre: 'hoge',
    category: 'hoge',
    price: 1000,
    imgurl: 'hoge',
    stock: 50,
    delete: false,
}]

describe('api/getItemListData.tsのテスト', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    afterAll(() => {
        jest.clearAllMocks();
    });

    test('レスポンスデータあり', async () => {
        global.fetch = jest.fn().mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(dummy_items),
        });
        await handler(mockReq, mockRes);

        expect(mockRes.status).toBeCalledWith(200);
        expect(mockRes.json).toBeCalledWith(dummy_items);
    });

    test('レスポンスデータなし', async () => {
        global.fetch = jest.fn().mockResolvedValueOnce({
            ok: false,
            status: 400,
        });
        await handler(mockReq, mockRes);

        expect(mockRes.status).toBeCalledWith(400);
        expect(mockRes.end).toBeCalledTimes(1);
    });
});
