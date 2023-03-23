import handler from './review';
import { NextApiRequest, NextApiResponse } from 'next';
import { resData } from '@/types/types';

// モックリクエストの定義
const mockReq: NextApiRequest = {
  body: {
    id: 1,
    item_id: 1,
    user_id: 1,
    nickname: 'hoge',
    anonymous: false,
    evaluation: 4,
    title: 'title',
    description: 'description',
    delete: false,
  },
} as NextApiRequest;
// モックレスポンスの定義
const mockRes: NextApiResponse<resData> = {
  status: jest.fn(() => mockRes),
  json: jest.fn(),
} as unknown as NextApiResponse<resData>;

jest.clearAllMocks();
describe('review.tsのテスト', () => {
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
