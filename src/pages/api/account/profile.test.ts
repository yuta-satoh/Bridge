import { resData } from '@/types/types';
import { NextApiRequest, NextApiResponse } from 'next';
import handler from './profile';

// モックのリクエストとレスポンスを定義
const mockReq: NextApiRequest = {
  body: {
    id: 1,
    lastname: '田中',
    firstname: '太郎',
    gender: 'male',
    tell: '111-111-1111',
    email: 'hoge@example.com',
    zipcode: '111-1111',
    address: '東京都墨田区押上1-1-2',
    password: 'hogehoge1111',
    delete: true,
  },
} as NextApiRequest;

const mockRes: NextApiResponse<resData> = {
  status: jest.fn(() => mockRes),
  json: jest.fn(),
} as unknown as NextApiResponse<resData>;

jest.clearAllMocks();
describe('profile.tsのテスト', () => {
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
