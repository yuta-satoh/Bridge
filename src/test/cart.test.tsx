import { render } from "@testing-library/react";

import Cart from "./cart";
import Cookies from 'js-cookie';

describe('カートページ', () => {
    test('正常に表示（空のユーザーカート）', () => {
        Cookies.get = jest.fn().mockImplementation(() => '1');
        const { asFragment } = render(<Cart />);
        expect(asFragment()).toMatchSnapshot();
    })
    test('正常に表示（空のゲストカート）', () => {
        Cookies.get = jest.fn().mockImplementation(() => undefined);
        const { asFragment } = render(<Cart />);
        expect(asFragment()).toMatchSnapshot();
    })
    test('正常に表示（ゲストカートの中身あり）', () => {
        Cookies.get = jest.fn().mockImplementation(() => undefined);
        localStorage.getItem = jest.fn()
            .mockImplementation(() => {
                [{"itemId":108,"quantity":1},{"itemId":82,"quantity":1}]
        })
        const { asFragment } = render(<Cart />);
        expect(asFragment()).toMatchSnapshot();
    })
})
