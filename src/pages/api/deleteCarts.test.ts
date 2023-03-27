import { resData } from '@/types/types';
import { NextApiRequest, NextApiResponse } from 'next';
import handler from './deleteCart';

const mockReq: NextApiRequest = {
  method: 'DELETE',
  body: {
    item_id: 1,
    cart_id: 1,
  },
} as NextApiRequest;

const mockRes: NextApiResponse<resData> = {
  status: jest.fn(() => mockRes),
  json: jest.fn(),
} as unknown as NextApiResponse<resData>;

describe('api/deleteCart.tsのテスト', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });

  test('正常なレスポンス', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({ ok: true });

    await handler(mockReq, mockRes);

    expect(mockRes.status).toBeCalledWith(200);
    expect(mockRes.json).toBeCalledWith({
      message: 'Deleteing item in cart was successed.',
    });
  });

  test('異常なレスポンス', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({ ok: false, status: 400 });

    await handler(mockReq, mockRes);

    expect(mockRes.status).toBeCalledWith(400);
    expect(mockRes.json).toBeCalledWith({
      message: 'Deleteing item in cart was failed.',
    });
  });
});
