import loginIron from './loginIron';
import { NextApiRequest, NextApiResponse } from 'next';
import { resData } from '@/types/types';
import { withIronSessionApiRoute } from 'iron-session/next';

// リクエストとレスポンスのモック
const mockReq: NextApiRequest = {
  method: 'POST',
  body: {
    email: 'hoge@example.com',
    password: 'hoge1234',
  },
  session: {
    save: jest.fn(() => Promise<void>),
    user: {},
  },
} as unknown as NextApiRequest;
const mockRes: NextApiResponse<resData> = {
  status: jest.fn(() => mockRes),
  json: jest.fn(),
} as unknown as NextApiResponse;

// ダミーのユーザーデータ
const dummy_userData = [{
    id: 1,
    lastName: '田中',
    firstName: '太郎',
    gender: 'male',
    tell: '111-111-1111',
    email: 'hoge@example.com',
    zipcode: '111-1111',
    address: '東京都',
    password: 'hoge1234',
    delete: false,
}]


// withIronSessionApiRouteのモック
jest.mock('iron-session/next', () => ({
  withIronSessionApiRoute: jest
    .fn()
    .mockImplementation((handler, sessionOptions) => handler),
}));

describe('api/loginIron.tsのテスト', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });

  test('正常なレスポンス', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(dummy_userData),
    });
    await loginIron(mockReq, mockRes);

    expect(mockReq.session.save).toHaveBeenCalledTimes(1);
    expect(mockReq.session.user).toHaveProperty('user', dummy_userData[0].id.toLocaleString());
    expect(mockRes.status).toBeCalledWith(200);
    expect(mockRes.json).toBeCalledWith({ message: 'Login was successed' });
  });

  test('異常なレスポンス', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({ ok: false, status: 400 });
    await loginIron(mockReq, mockRes);

    expect(mockRes.status).toBeCalledWith(400);
    expect(mockRes.json).toBeCalledWith({ message: 'Login was failed' });
  });
});
