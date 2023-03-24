import { resData } from '@/types/types';
import { NextApiRequest, NextApiResponse } from 'next';
import handler from './addCart';

// レスポンス/リクエストのモック
const mockReq: NextApiRequest = {
  method: 'POST',
  body: {
    item_id: 1,
    cart_id: 1,
    date: '2023-01-01',
    quantity: 1,
    delete: false,
  },
} as NextApiRequest;

const mockRes: NextApiResponse<resData> = {
  status: jest.fn(() => mockRes),
  json: jest.fn(),
} as unknown as NextApiResponse<resData>;

describe('api/addCart.tsのテスト', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });

  test('cart-items重複なし&&正常なレスポンス', async () => {
    global.fetch = jest
      .fn()
      // item_id重複なし
      .mockResolvedValueOnce({ ok: false })
      .mockResolvedValueOnce({ ok: true });

    await handler(mockReq, mockRes);
    expect(mockRes.status).toBeCalledWith(200);
    expect(mockRes.json).toBeCalledWith({ message: 'Adding new item in cart was successed.' });
  });

  test('cart-items重複なし&&異常なレスポンス', async () => {
    global.fetch = jest
      .fn()
      // item_id重複なし
      .mockResolvedValueOnce({ ok: false })
      .mockResolvedValueOnce({ ok: false });

    await handler(mockReq, mockRes);
    expect(mockRes.status).toBeCalledWith(401);
    expect(mockRes.json).toBeCalledWith({ message: 'Adding new item in cart was failed.' });
  });

  test('cart-items重複あり&&正常なレスポンス', async () => {
    global.fetch = jest
      .fn()
      // item_id重複なし
      .mockResolvedValueOnce({ ok: true })
      .mockResolvedValueOnce({ ok: true });

    await handler(mockReq, mockRes);
    expect(mockRes.status).toBeCalledWith(200);
    expect(mockRes.json).toBeCalledWith({ message: 'Increasing quantity of item in cart was succesed.' });
  });

  test('cart-items重複あり&&異常なレスポンス', async () => {
    global.fetch = jest
      .fn()
      // item_id重複なし
      .mockResolvedValueOnce({ ok: true })
      .mockResolvedValueOnce({ ok: false });

    await handler(mockReq, mockRes);
    expect(mockRes.status).toBeCalledWith(401);
    expect(mockRes.json).toBeCalledWith({ message: 'Increasing quantity of item in cart was failed.' });
  });
});
