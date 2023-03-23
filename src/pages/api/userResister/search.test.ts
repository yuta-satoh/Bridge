import { resData } from '@/types/types';
import { NextApiRequest, NextApiResponse } from 'next';
import handler from './search';
import searchUser from '@/lib/searchUser';

// モックのリクエストとレスポンスを定義
const mockReq: NextApiRequest = {
    method: 'GET',
    body: {
        email: 'hoge@example.com',
        password: 'hoge1234',
    }
} as NextApiRequest;

const mockRes: NextApiResponse<resData> = {
    status: jest.fn(() => mockRes),
    json: jest.fn(),
} as unknown as NextApiResponse<resData>;

describe('api/search')
