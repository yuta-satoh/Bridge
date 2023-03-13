import renderer from 'react-test-renderer';
import Mypage from './mypage';

// テスト用のクッキーの値を定義
const testCookieValue = '1';
describe('mypage.tsxのスナップショットテスト', () => {
  // カート画像ロード中のスナップショットテスト
  it('ロード中', () => {
    // cookieValueにテスト用のクッキーの値を格納
    const cookieValue = testCookieValue;

    // propsにcookieValueを定義
    const props = { cookieValue };

    // Mypageコンポーネントにpropsを渡す
    const mypage_component = <Mypage {...props} />;

    // スナップショットテスト
    const tree = renderer.create(mypage_component).toJSON();
    expect(tree).toMatchSnapshot();
  });

  //   カートに商品がない場合のスナップショットテスト
  it('カートに商品がありません', () => {
    // CurrentCartItemsコンポーネントをモックし、カートに商品がない場合のコンポーネントを返す
    jest.mock('../components/CurrentCartItems', () => {
      return (
        <>
          <div className="container">
            <div className="background">
              <p>カートに商品がありません</p>
            </div>
          </div>
        </>
      );
    });
    // スナップショットテスト手続きは上に同じ
    const cookieValue = testCookieValue;
    const props = { cookieValue };
    const mypage_component = <Mypage {...props} />;
    const tree = renderer.create(mypage_component).toJSON();
    expect(tree).toMatchSnapshot();
  });

  //カートに商品がある場合の
});
