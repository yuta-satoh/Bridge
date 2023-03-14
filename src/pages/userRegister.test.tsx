import { render, screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";

import UserRegister from "./userRegister";

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
        })
    })
}

const fetchMockNg = () => {
    return new Promise((resolve) => {
        resolve({
            ok: false,
            status: 400,
            statusText: 'NG',
        })
    })
}

describe('会員登録ページ', () => {
    test('正常に描画', () => {
        const { asFragment } = render(<UserRegister />);
        expect(asFragment()).toMatchSnapshot();
    })
})
