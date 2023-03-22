import { resData } from '@/types/types';
import { NextApiRequest, NextApiResponse } from 'next';
import handler from './profile';

// モックのリクエストとレスポンスを定義
const req: NextApiRequest = {
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

// const res: NextApiResponse<resData> = {
//     status: jest.fn(() => res),
//     json: jest.fn(),
// }
