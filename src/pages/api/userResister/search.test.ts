import { resData } from '@/types/types';
import { NextApiRequest, NextApiResponse } from 'next';
import handler from './search';
import searchUser from '@/lib/searchUser';

// モックのリクエストとレスポンスを定義
const mockReq: NextApiRequest = {
  method: 'GET',
  body: {
    email: 'hoge@example.com',
  },
} as NextApiRequest;

const mockRes: NextApiResponse<resData> = {
  status: jest.fn(() => mockRes),
  json: jest.fn(),
} as unknown as NextApiResponse<resData>;

// searchUser関数のモック
jest.mock('@/lib/searchUser', () => jest.fn());

describe('api/userRegister/search.tsのテスト', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });

  test('メールアドレス重複あり', async () => {
    // seachUser => 'このメールアドレスはすでに使用されています'
    (
      searchUser as jest.MockedFunction<typeof searchUser>
    ).mockResolvedValueOnce({
      email: 'このメールアドレスはすでに使用されています',
    });

    await handler(mockReq, mockRes);

    expect(searchUser).toBeCalledWith(mockReq.body.email);
    expect(mockRes.status).toBeCalledWith(200);
    expect(mockRes.json).toBeCalledWith({
      email: 'このメールアドレスはすでに使用されています',
    });
  });

  test('メールアドレス重複なし', async () => {
    // seachUser => ''(empty)
    (
      searchUser as jest.MockedFunction<typeof searchUser>
    ).mockResolvedValueOnce({
      email: '',
    });

    await handler(mockReq, mockRes);

    expect(searchUser).toBeCalledWith(mockReq.body.email);
    expect(mockRes.status).toBeCalledWith(200);
    expect(mockRes.json).toBeCalledWith({
      email: '',
    });
  });
});
