import handler from './items';
import { NextApiRequest, NextApiResponse } from 'next';
import { Items, resData } from '@/types/types';

// リクエストとレスポンスをモック
const mockReq: NextApiRequest = {
  method: 'GET',
  query: {
    order: 'desc',
  },
} as unknown as NextApiRequest;

const mockRes: NextApiResponse<resData | Items[]> = {
  status: jest.fn(() => mockRes),
  json: jest.fn(),
} as unknown as NextApiResponse<resData | Items[]>;

// ダミーの商品データ
const dummy_items: Items[] = [
  {
    id: 1,
    name: 'hoge',
    description: 'hoge',
    genre: 'hoge',
    category: 'hoge',
    price: 1000,
    imgurl: 'hoge',
    stock: 50,
    delete: false,
  },
];

describe('api/items.tsのテスト', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });

  test('正常なレスポンス', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(dummy_items),
    });
    await handler(mockReq, mockRes);

    expect(mockRes.status).toBeCalledWith(200);
    expect(mockRes.json).toBeCalledWith(dummy_items);
  });

  test('異常なレスポンス', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      status: 400,
    });
    await handler(mockReq, mockRes);

    expect(mockRes.status).toBeCalledWith(400);
    expect(mockRes.json).toBeCalledWith({
      message: 'Getting ordered items was failed.',
    });
  });
});
