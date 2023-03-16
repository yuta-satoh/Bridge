import renderer from 'react-test-renderer';
import { Middleware } from 'swr';
import { SWRResponse } from 'swr';
import { SWRConfig } from 'swr';
import History from './history';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';


type Cart = {
    id: number;
    item_id: number;
    user_id: number;
    name: string;
    description: string;
    genre: string;
    category: string;
    price: number;
    imgurl: string;
    date: string;
    quantity: number;
    delete: boolean;
  }[];

jest.mock('next/router', () => ({
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
}));

test('描画される', async() => {
  const historyData = [
    {
      category: 'テーブル',
      date: '2023-03-01',
      delete: false,
      description: 'すっきりと洗練されたデザインのテーブル。',
      genre: 'フェミニン',
      id: 4,
      imgurl: '/images/table/table_feminine_1.jpg',
      item_id: 4,
      name: 'ガラスローテーブル',
      price: 29000,
      quantity: 1,
      user_id: 1,
    },
  ];
  const testMiddleware: Middleware = () => {
    return (): SWRResponse<any, any> => {
      return {
        data: historyData,
        error: undefined,
        mutate: (_) => Promise.resolve(),
        isValidating: false,
        isLoading: false,
      };
    };
  };
  const tree = renderer
    .create(
      <SWRConfig value={{ use: [testMiddleware] }}>
        <History cookie={'1'} />
      </SWRConfig>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('履歴はありませんが表示', async() => {
    const historyData:Cart = [];
    const testMiddleware: Middleware = () => {
      return (): SWRResponse<any, any> => {
        return {
          data: historyData,
          error: undefined,
          mutate: (_) => Promise.resolve(),
          isValidating: false,
          isLoading: false,
        };
      };
    };
    const tree = renderer
      .create(
        <SWRConfig value={{ use: [testMiddleware] }}>
          <History cookie={'1'} />
        </SWRConfig>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
