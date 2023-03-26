import { resData } from '@/types/types';
import { NextApiRequest, NextApiResponse } from 'next';
import handler from './addHistory';

// モックのリクエストとレスポンスを定義
const mockReq: NextApiRequest = {
    method: 'POST',
    body: {
        id: 1,
        item_id: 1,
        user_id: 1,
        name: 'hoge',
        description: 'hoge',
        genre: 'hoge',
        category: 'hoge',
        price: 1000,
        imgUrl: 'hoge',
        date: '2023-01-11',
        quantity: 50,
        dalete: false,
    },
  } as NextApiRequest;
  
  const mockRes: NextApiResponse<resData> = {
    status: jest.fn(() => mockRes),
    json: jest.fn(),
  } as unknown as NextApiResponse<resData>;
  
  jest.clearAllMocks();
  describe('api/purchase/addHistory.tsのテスト', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    afterAll(() => {
      jest.clearAllMocks();
    });
  
    test('正常なレスポンス', async () => {
      global.fetch = jest.fn().mockResolvedValueOnce({ ok: true });
      await handler(mockReq, mockRes);
  
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'OK' });
    });
  
    test('異常なレスポンス', async () => {
      global.fetch = jest.fn().mockResolvedValueOnce({ ok: false, status: 400 });
      await handler(mockReq, mockRes);
  
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Failed' });
    });
  });
