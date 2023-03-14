import renderer from 'react-test-renderer';
import { Middleware } from 'swr';
import { SWRResponse } from 'swr';
import { SWRConfig } from 'swr';
import Purchase from './purchase';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import purchaseComp from './purchaseComp';

type User = {
  lastName: string;
  firstName: string;
  gender: string;
  tell: string;
  email: string;
  zipcode: string;
  address: string;
  password: string;
}[];

type items = {
  id: number;
  name: string;
  description: string;
  genre: string;
  category: string;
  price: number;
  imgurl: string;
  stock: number;
  delete: boolean;
};
type cart = {
  id: number;
  item_id: number;
  items: items;
  cart_id: number;
  date: string;
  quantity: number;
  delete: boolean;
}[];

const user: User = [
  {
    lastName: '楽須',
    firstName: '太郎',
    gender: 'male',
    tell: '111-1111-1111',
    email: 'rakus@example.com',
    zipcode: '160-0022',
    address: '東京都新宿区新宿2-5-12 8F',
    password: 'rakus',
  },
];

jest.mock('next/router', () => ({
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
}));

const fetchMock = () => {
  return new Promise((resolve) => {
    resolve({
      status: 200,
    });
  });
};

test('描画される', async () => {
  const cartItem: cart = [
    {
      id: 1,
      item_id: 1,
      items: {
        id: 1,
        name: 'ベルベットアームチェア',
        description: 'ベルベットのお洒落なデザインチェア。',
        genre: 'フェミニン',
        category: '椅子',
        price: 16000,
        imgurl: '/images/chair/chair_feminine_1.jpg',
        stock: 72,
        delete: false,
      },
      cart_id: 1,
      date: '2023-03-01',
      quantity: 1,
      delete: false,
    },
  ];
  const testMiddleware: Middleware = () => {
    return (): SWRResponse<any, any> => {
      return {
        data: cartItem,
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
        <Purchase cookie={'1'} user={user} />
      </SWRConfig>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('描画されない', async () => {
  Object.defineProperty(window, 'location', {
    value: {
      href: '/cart',
      pathname: '/cart',
      search: '',
      hostname: '',
    },
  });
  const cartItem: cart = [];
  const testMiddleware: Middleware = () => {
    return (): SWRResponse<any, any> => {
      return {
        data: cartItem,
        error: undefined,
        mutate: (_) => Promise.resolve(),
        isValidating: false,
        isLoading: false,
      };
    };
  };
  const tree = renderer.create(
    <SWRConfig value={{ use: [testMiddleware] }}>
      <Purchase cookie={'1'} user={user} />
    </SWRConfig>
  );
  expect(window.location.href).toEqual('/cart');
});

test('送信される', async () => {
  const mockRouter = {
    push: jest.fn(),
  };
  global.fetch = jest.fn().mockImplementation(fetchMock);
  const cartItem: cart = [
    {
      id: 1,
      item_id: 1,
      items: {
        id: 1,
        name: 'ベルベットアームチェア',
        description: 'ベルベットのお洒落なデザインチェア。',
        genre: 'フェミニン',
        category: '椅子',
        price: 16000,
        imgurl: '/images/chair/chair_feminine_1.jpg',
        stock: 72,
        delete: false,
      },
      cart_id: 1,
      date: '2023-03-01',
      quantity: 1,
      delete: false,
    },
  ];
  const testMiddleware: Middleware = () => {
    return (): SWRResponse<any, any> => {
      return {
        data: cartItem,
        error: undefined,
        mutate: (_) => Promise.resolve(),
        isValidating: false,
        isLoading: false,
      };
    };
  };
  render(
    <SWRConfig value={{ use: [testMiddleware] }}>
      <Purchase cookie={'1'} user={user} />
    </SWRConfig>
  );
  const submitButton = screen.getByText('購入する');
  //   expect(submitButton).toMatchSnapshot()
  await userEvent.click(submitButton);
  //   expect(mockRouter.push).toEqual('/purchaseComp');
});
