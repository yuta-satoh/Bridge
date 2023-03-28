import renderer from 'react-test-renderer';
import Mypage from './mypage';
import CurrentCartItems from '../components/CurrentCartItems';
import myStyles from '../styles/mypage.module.css';
import Image from 'next/image';

// テスト用のクッキーの値を定義
const testCookieValue = '1';

describe('mypage.tsxのスナップショットテスト', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

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
})
