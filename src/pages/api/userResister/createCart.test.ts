import { resData } from '@/types/types';
import { NextApiRequest, NextApiResponse } from 'next';
import handler from './createCart';

// モックのリクエストとレスポンスを定義
const mockReq: NextApiRequest = {
  method: 'POST',
  query: {
    email: 'hoge@example.com',
  },
} as unknown as NextApiRequest;

const mockRes: NextApiResponse<resData> = {
  status: jest.fn(() => mockRes),
  json: jest.fn(),
} as unknown as NextApiResponse<resData>;

// ダミーのユーザーID
const dummy_usersID = '1';

jest.clearAllMocks();
describe('api/userRegister/createCart.tsのテスト', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });

  test('正常なレスポンス', async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(dummy_usersID),
      })
      .mockResolvedValueOnce({ ok: true });

    await handler(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'OK' });
  });

  test('users_idの取得に失敗', async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([]),
        status: 400,
      });

    await handler(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'User Data was nothing.',
    });
  });

  test('新しいcartsデータの生成に失敗', async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(dummy_usersID),
        status: 400,
      })
      .mockResolvedValueOnce({ ok: false, status: 400 });

    await handler(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'Creating cart data was wrong.',
    });
  });
});
