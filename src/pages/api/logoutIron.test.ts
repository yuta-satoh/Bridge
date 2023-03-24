import handler from './logoutIron';
import { NextApiRequest, NextApiResponse } from 'next';
import { resData } from '@/types/types';
import { withIronSessionApiRoute } from 'iron-session/next';
import { notDeepEqual } from 'assert';

// リクエストとレスポンスのモック
const mockReq: NextApiRequest = {
  method: 'POST',
  session: {
    destroy: jest.fn(),
    user: {
        user: 'encoded_cookie_value',
    }
  },
} as unknown as NextApiRequest;
const mockRes: NextApiResponse<resData> = {
  send: jest.fn(),
} as unknown as NextApiResponse;

// withIronSessionApiRouteのモック
jest.mock('iron-session/next', () => ({
  withIronSessionApiRoute: jest
    .fn()
    .mockImplementation((handler, sessionOptions) => handler),
}));

beforeEach(() => {
  jest.clearAllMocks();
});
afterAll(() => {
  jest.clearAllMocks();
});
test('api/logoutIron.tsのテスト(成功パターンのみ)', async () => {
    await handler(mockReq, mockRes);

    expect(mockReq.session.destroy).toBeCalledTimes(1);
    expect(mockRes.send).toBeCalledWith({ ok: true });
});
