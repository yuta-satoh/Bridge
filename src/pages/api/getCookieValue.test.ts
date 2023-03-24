import { NextApiRequest, NextApiResponse } from 'next';
import handler from './getCookieValue';
import { withIronSessionApiRoute } from 'iron-session/next';

// レスポンスをモック
const mockRes: NextApiResponse<string> = {
  json: jest.fn(),
} as unknown as NextApiResponse<string>;

// withIronSessionApiRouteをモック
jest.mock('iron-session/next', () => ({
  withIronSessionApiRoute: jest
    .fn()
    .mockImplementation((handler, sessionOptions) => handler),
}));

describe('api/getCookieValue.tsのテスト', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    afterAll(() => {
        jest.clearAllMocks();
    });

    test('res.json === "anything"', async () => {
        // リクエストをモック
        const mockReq: NextApiRequest = {
            session: {
                user: {
                    user: '1',
                }
            },
        } as NextApiRequest;

        await handler(mockReq, mockRes);

        expect(mockRes.json).toBeCalledWith('1');
    });

    test('res.json === nothing', async () => {
        // リクエストをモック
        const mockReq: NextApiRequest = {
            session: {
                user: {
                    user: undefined,
                }
            },
        } as unknown as NextApiRequest;

        await handler(mockReq, mockRes);

        expect(mockRes.json).toBeCalledWith('');
    });
});
