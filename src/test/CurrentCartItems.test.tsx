import renderer from 'react-test-renderer';
import CurrentCartItems from './CurrentCartItems';
import useSWR, { SWRConfig, SWRResponse } from 'swr';

describe('CarrentCartItemsモジュールのテスト', () => {
  it('ロード中', () => {
    // useSWRがLoadingの場合の定義
    // 戻り値にuseSWRのResponceを返す関数を定義
    const testLoadingMiddleware = () => {
      return (): SWRResponse<any, any> => {
        return {
          data: undefined,
          error: undefined,
          mutate: (_) => Promise.resolve(),
          isValidating: true,
          isLoading: true,
        };
      };
    };

    // 仮のcookieデータを持つpropsを定義
    const props = { cookie: testCookie };
    // CarrentCartItemsにpropsを渡す
    const CarrentCartItems_comp = <CurrentCartItems {...props} />;
    // 描画テスト
    // 「ロード中...」が表示されるはず
    const tree = renderer
      .create(
        // SWRConfigをvalue={{use: [*定義したuseSWRResponceを返す関数*]}}とすると、
        // 疑似的にuseSWRの動きを再現できるらしい？
        <SWRConfig value={{ use: [testLoadingMiddleware] }}>
          {CarrentCartItems_comp}
        </SWRConfig>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('エラー', () => {
    // useSWRのresponceがerrorの場合の定義
    const testErrorMiddleware = () => {
      return (): SWRResponse<any, any> => {
        return {
          data: undefined,
          error: Error(),
          mutate: (_) => Promise.resolve(),
          isValidating: false,
          isLoading: false,
        };
      };
    };

    // 以下、描画テストの手続き(同上)
    const props = { cookie: testCookie };
    const CarrentCartItems_comp = <CurrentCartItems {...props} />;
    const tree = renderer
      .create(
        <SWRConfig value={{ use: [testErrorMiddleware] }}>
          {CarrentCartItems_comp}
        </SWRConfig>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('カートに商品がありません(data.length === 0)', () => {
    // useSWRのdataが空の場合の定義
    const testEmptyMiddleware = () => {
      return (): SWRResponse<any, any> => {
        return {
          data: [],
          error: Error(),
          mutate: (_) => Promise.resolve(),
          isValidating: false,
          isLoading: false,
        };
      };
    };

    // 以下、描画テストの手続き(同上)
    const props = { cookie: testCookie };
    const CarrentCartItems_comp = <CurrentCartItems {...props} />;
    const tree = renderer
      .create(
        <SWRConfig value={{ use: [testEmptyMiddleware] }}>
          {CarrentCartItems_comp}
        </SWRConfig>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('最新の商品4つが表示される', () => {
    // useSWRのdataがある場合の定義
    const testMiddleware = () => {
      return (): SWRResponse<any, any> => {
        return {
          data: test_cart_items,
          error: undefined,
          mutate: (_) => Promise.resolve(),
          isValidating: false,
          isLoading: false,
        };
      };
    };
    // 以下、描画テストの手続き(同上)
    const props = { cookie: testCookie };
    const CarrentCartItems_comp = <CurrentCartItems {...props} />;
    const tree = renderer
      .create(
        <SWRConfig value={{ use: [testMiddleware] }}>
          {CarrentCartItems_comp}
        </SWRConfig>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

// テスト用クッキー
const testCookie: string = '1';
// テスト用cart_itemsデータ
const test_cart_items = [
  {
    id: 1,
    item_id: 1,
    cart_id: 1,
    date: '2023-03-14',
    quantity: 1,
    delete: false,
    items: {
      id: 1,
      name: 'ダミー1',
      price: 10000,
      imgurl: '/hoge1',
    },
  },
  {
    id: 2,
    cart_id: 1,
    date: '2023-03-14',
    quantity: 2,
    delete: false,
    items: {
      id: 2,
      name: 'ダミー2',
      price: 20000,
      imgurl: '/hoge2',
    },
  },
  {
    id: 3,
    cart_id: 1,
    date: '2023-03-14',
    quantity: 3,
    delete: false,
    items: {
      id: 3,
      name: 'ダミー3',
      price: 30000,
      imgurl: '/hoge3',
    },
  },
  {
    id: 4,
    cart_id: 1,
    date: '2023-03-14',
    quantity: 4,
    delete: false,
    items: {
      id: 4,
      name: 'ダミー4',
      price: 40000,
      imgurl: '/hoge4',
    },
  },
  {
    id: 5,
    cart_id: 1,
    date: '2023-03-14',
    quantity: 5,
    delete: false,
    items: {
      id: 5,
      name: 'ダミー5',
      price: 50000,
      imgurl: '/hoge5',
    },
  },
];
