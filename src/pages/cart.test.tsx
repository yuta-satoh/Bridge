import { render } from "@testing-library/react";

import Cart from "./cart";
import Cookies from 'js-cookie';

describe('カートページ', () => {
    test('正常に表示', () => {
        Cookies.get = jest.fn().mockImplementation(() => '1');
        const { asFragment } = render(<Cart />);
        expect(asFragment()).toMatchSnapshot();
    })
})
