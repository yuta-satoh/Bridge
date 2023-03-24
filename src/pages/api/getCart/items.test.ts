import handler from './items';
import {
  NextApiRequest,
  NextApiHandler,
  NextApiResponse,
} from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '@/lib/session';
import { resData } from '@/types/types';
jest.clearAllMocks();

// ダミーのカート内アイテムデータ
const dummy_cart_items_data = [
  {
    id: 1,
    item_id: 1,
    cart_id: 1,
    date: '2022-02-22',
    quantity: 1,
    delete: false,
    items: {
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
    carts: {
      id: 1,
      user_id: 1,
      delete: false,
    },
  },
];

// リクエスト/レスポンスのモック
const mockReq: NextApiRequest = {
  method: 'GET',
  session: {
    user: {
      user: '1',
    },
  },
} as NextApiRequest;
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

describe('api/getCart/items.tsのテスト', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });

  test('レスポンスデータあり', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(dummy_cart_items_data),
    });
    await handler(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(dummy_cart_items_data);
  });

  test('レスポンスデータが空', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([]),
    });
    await handler(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith([]);
  });
});
