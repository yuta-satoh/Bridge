import { Order_histories, resData } from '@/types/types';
import { NextApiRequest, NextApiResponse } from 'next';
import handler from './getHistory';

// リクエストとレスポンスをモック
const mockReq: NextApiRequest = {
    method: 'GET',
    query: {
        id: '1',
        order: 'desc',
    }
} as unknown as NextApiRequest;

const mockRes: NextApiResponse<Order_histories[] | resData> = {
    status: jest.fn(() => mockRes),
    json: jest.fn(),
} as unknown as NextApiResponse<Order_histories[] | resData>;

// ダミーの購入履歴データ
const mock_order_history: Order_histories[] = [{
    id: 1,
    item_id: 1,
    user_id: 1,
    name: 'hoge',
    description: 'hoge',
    genre: 'hoge',
    category: 'hoge',
    price: 1000,
    imgurl: 'hoge',
    date: '2023-01-01',
    quantity: 1,
    delete: false,
}];

describe('api/getHistory.tsのテスト', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    afterAll(() => {
        jest.clearAllMocks();
    });

    test('正常なレスポンス', async () => {
        global.fetch = jest.fn().mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(mock_order_history),
        });
        await handler(mockReq, mockRes);

        expect(mockRes.status).toBeCalledWith(200);
        expect(mockRes.json).toBeCalledWith(mock_order_history);
    });

    test('異常なレスポンス', async () => {
        global.fetch = jest.fn().mockResolvedValueOnce({
            ok: false,
        });
        await handler(mockReq, mockRes);

        expect(mockRes.status).toBeCalledWith(401);
        expect(mockRes.json).toBeCalledWith({ message: 'Getting order-history was feiled' });
    });
});
