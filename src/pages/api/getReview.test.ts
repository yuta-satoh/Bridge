import handler from "./getReview";
import { NextApiRequest, NextApiResponse } from 'next';
import { resData } from '@/types/types';

// リクエストとレスポンスをモック
const mockReq: NextApiRequest = {
    method: 'GET',
    query: {
        itemId: '1',
    }
} as unknown as NextApiRequest;

const mockRes: NextApiResponse<resData | Reviews[]> = {
    status: jest.fn(() => mockRes),
    json: jest.fn(),
} as unknown as NextApiResponse<resData | Reviews[]>;

// ダミーの商品データ
const dummy_reviews: Reviews[] =[{
    id: 1,
    item_id: 1,
    user_id: 1,
    nickname: 'hoge',
    anonymous: false,
    evaluation: 4,
    title: 'hoge',
    description: 'hoge',
    date: '2023-01-01',
    delete: false,
    users: { lastname: 'hoge', firstname: 'hoge', }
}]

describe('api/getItemListData.tsのテスト', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    afterAll(() => {
        jest.clearAllMocks();
    });

    test('正常なレスポンス', async () => {
        global.fetch = jest.fn().mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(dummy_reviews),
        });
        await handler(mockReq, mockRes);

        expect(mockRes.status).toBeCalledWith(200);
        expect(mockRes.json).toBeCalledWith(dummy_reviews);
    });

    test('異常なレスポンス', async () => {
        global.fetch = jest.fn().mockResolvedValueOnce({
            ok: false,
        });
        await handler(mockReq, mockRes);

        expect(mockRes.status).toBeCalledWith(401);
        expect(mockRes.json).toBeCalledWith({ message: 'Getting Reviews was failed.' });
    });
});

// 型エイリアス
type Reviews = {
    id: number;
    item_id: number;
    user_id: number;
    nickname: string;
    anonymous: boolean;
    evaluation: number;
    title: string;
    description: string;
    date: string;
    delete: boolean;
    users: { lastname: string; firstname: string };
  };
