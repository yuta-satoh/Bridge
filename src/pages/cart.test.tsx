import { render } from "@testing-library/react";

import Cart from "./cart";
import Cookies from 'js-cookie';

jest.mock('next/router', () => ({
    useRouter() {
      return {
        replace: jest.fn(),
        push: jest.fn(),
        reload: jest.fn(),
      };
    },
}));

const fetchMockOk = () => {
    return new Promise((resolve) => {
        resolve({
            ok: true,
            status: 200,
            statusText: 'OK',
            json: async () => '1'
        })
    })
}

jest.mock('@/components/UserCart', () => {{
    return 'div'
}})

jest.mock('@/components/GuestCart', () => {{
    return 'div'
}})

describe('カートページ', () => {
    test('正常に表示（空のユーザーカート）', () => {
        global.fetch = jest.fn().mockImplementation(fetchMockOk);
        const { asFragment } = render(<Cart />);
        expect(asFragment()).toMatchSnapshot();
    })
    test('正常に表示（空のゲストカート）', () => {
        global.fetch = jest.fn().mockImplementation(fetchMockOk);
        const { asFragment } = render(<Cart />);
        expect(asFragment()).toMatchSnapshot();
    })
    test('正常に表示（ゲストカートの中身あり）', () => {
        global.fetch = jest.fn().mockImplementation(fetchMockOk);
        localStorage.getItem = jest.fn()
            .mockImplementation(() => {
                [{"itemId":108,"quantity":1},{"itemId":82,"quantity":1}]
        })
        const { asFragment } = render(<Cart />);
        expect(asFragment()).toMatchSnapshot();
    })
})
