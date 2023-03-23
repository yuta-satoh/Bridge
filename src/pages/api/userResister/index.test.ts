import { resData } from '@/types/types';
import { NextApiRequest, NextApiResponse } from 'next';
import handler from './index';

// モックのリクエストとレスポンスを定義
const mockReq: NextApiRequest = {
    method: 'POST',
    body: {
        id: 1,
        lastname: '山田',
        firstname: '太郎',
        gender: 'male',
        tell: '111-111-1111',
        email: 'hogge@example.com',
        zipcode: '111-1111',
        address: '日本',
        password: 'hoge1234',
        delete: false,
    }
  } as NextApiRequest;
  
  const mockRes: NextApiResponse<resData> = {
    status: jest.fn(() => mockRes),
    json: jest.fn(),
  } as unknown as NextApiResponse<resData>;
  
  jest.clearAllMocks();
  describe('api/userRegister/index.tsのテスト', () => {
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
      global.fetch = jest.fn().mockResolvedValueOnce({ ok: false });
      await handler(mockReq, mockRes);
  
      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Registration failed.' });
    });
  });
