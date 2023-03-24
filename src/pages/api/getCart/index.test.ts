import handler from './index';
import { NextApiRequest, NextApiResponse } from 'next';
import { resData } from '@/types/types';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '@/lib/session';
jest.clearAllMocks();

// ダミーのカートデータ
const dummyCart = [
  {
    id: 1,
    user_id: 1,
    delete: false,
  },
];

// モックリクエストの定義
const mockReq: NextApiRequest = {
  method: 'GET',
  session: {
    user: {
      user: '1',
    },
  },
} as NextApiRequest;
// モックレスポンスの定義
const mockRes: NextApiResponse<resData> = {
  status: jest.fn(() => mockRes),
  json: jest.fn(),
} as unknown as NextApiResponse<resData>;

// withIronSessionApiRouteのモック
jest.mock('iron-session/next', () => ({
  withIronSessionApiRoute: jest
    .fn()
    .mockImplementation((handler, sessionOptions) => handler),
}));

describe('api/getCart/index.tsのテスト', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });

  test('正常なレスポンス', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(dummyCart),
    });
    await handler(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(dummyCart);
  });

  test('異常なレスポンス', async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([]),
      });
    await handler(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Cart is Nothing' });
  });
});
