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
  end: jest.fn(),
} as unknown as NextApiResponse<resData>;

// ダミーデータ
const dummy_items = [{
  id: 1,
  item_id: 1,
  cart_id: 1,
  date: '2023-01-01',
  quantity: 50,
  delete: false,
}];

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
      .mockResolvedValueOnce({ ok: false, json: () => Promise.resolve(dummy_items) })
      .mockResolvedValueOnce({ ok: true });

    await handler(mockReq, mockRes);
    expect(mockRes.status).toBeCalledWith(200);
    expect(mockRes.end).toBeCalledTimes(1);
  });

  test('cart-items重複なし&&異常なレスポンス', async () => {
    global.fetch = jest
      .fn()
      // item_id重複なし
      .mockResolvedValueOnce({ ok: false, json: () => Promise.resolve(dummy_items)})
      .mockResolvedValueOnce({ ok: false });

    await handler(mockReq, mockRes);
    expect(mockRes.status).toBeCalledWith(401);
    expect(mockRes.end).toBeCalledTimes(1)
  });

  test('cart-items重複あり&&正常なレスポンス', async () => {
    global.fetch = jest
      .fn()
      // item_id重複なし
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(dummy_items) })
      .mockResolvedValueOnce({ ok: true });

    await handler(mockReq, mockRes);
    expect(mockRes.status).toBeCalledWith(200);
    expect(mockRes.end).toBeCalledTimes(1)
  });

  test('cart-items重複あり&&異常なレスポンス', async () => {
    global.fetch = jest
      .fn()
      // item_id重複なし
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(dummy_items) })
      .mockResolvedValueOnce({ ok: false });

    await handler(mockReq, mockRes);
    expect(mockRes.status).toBeCalledWith(401);
    expect(mockRes.end).toBeCalledTimes(1)
  });
});
