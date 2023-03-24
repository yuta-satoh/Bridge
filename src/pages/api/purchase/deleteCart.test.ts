import { resData } from '@/types/types';
import { NextApiRequest, NextApiResponse } from 'next';
import handler from './addHistory';

// モックのリクエストとレスポンスを定義
const mockReq: NextApiRequest = {
  method: 'DELETE',
  query: {
    id: '1',
  },
} as unknown as NextApiRequest;

const mockRes: NextApiResponse<resData> = {
  status: jest.fn(() => mockRes),
  json: jest.fn(),
} as unknown as NextApiResponse<resData>;

jest.clearAllMocks();
describe('api/purchase/deleteCart.tsのテスト', () => {
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
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Failed' });
  });
});
