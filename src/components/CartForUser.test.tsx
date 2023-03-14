import renderer from 'react-test-renderer';
import { Middleware } from 'swr';
import { SWRResponse } from 'swr';
import { SWRConfig } from 'swr';
import UserCart from './CartForUser';
import { Items } from '@/types/types';

type cart = {
  id: number;
  item_id: number;
  cart_id: number;
  date: string;
  quantity: number;
  delete: boolean;
  // item_idと同じidのitemsデータを格納するitemsプロパティ(type: Items)
  items: Items;
}[];

test('カート内のアイテムが無かった場合', () => {
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
      <UserCart />
    </SWRConfig>
  );
  expect(tree).toMatchSnapshot();
});

test('カート内のアイテムがあった場合(1)', () => {
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
  const tree = renderer.create(
    <SWRConfig value={{ use: [testMiddleware] }}>
      <UserCart />
    </SWRConfig>
  );
  expect(tree).toMatchSnapshot();
});

test('カート内のアイテムがあった場合(2)', () => {
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
        quantity: 2,
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
    const tree = renderer.create(
      <SWRConfig value={{ use: [testMiddleware] }}>
        <UserCart />
      </SWRConfig>
    );
    expect(tree).toMatchSnapshot();
  });
