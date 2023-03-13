import renderer from 'react-test-renderer';
import Mypage from './mypage';

// テスト用のクッキーの値を定義
const testCookieValue = '1';

it('mypage.tsxの描画テスト', () => {
    // cookieValueにテスト用のクッキーの値を格納
    const cookieValue = testCookieValue;

    // propsにcookieValueを定義
    const props = { cookieValue };

    // Mypageコンポーネントにpropsを渡す
    const mypage_component = <Mypage {...props}/>;

    // 描画テスト
    const tree = renderer.create(mypage_component).toJSON();
    expect(tree).toMatchSnapshot();
})
