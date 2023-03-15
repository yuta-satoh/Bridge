import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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

    test('名字の入力', async () => {
        const user = userEvent.setup();
        render(<UserRegister />);
        const input = screen.getAllByRole('textbox')[0] as HTMLInputElement;
        await user.type(input, '山田');
        expect(input.value).toBe('山田');
    })

    test('名前の入力', async () => {
        const user = userEvent.setup();
        render(<UserRegister />);
        const input = screen.getAllByRole('textbox')[1] as HTMLInputElement;
        await user.type(input, '太郎');
        expect(input.value).toBe('太郎');
    })

    test('性別の入力', async () => {
        const user = userEvent.setup();
        render(<UserRegister />);
        const input = screen.getAllByRole('radio') as HTMLInputElement[];
        await user.click(input[0]);
        expect(input[0].checked).toBeTruthy()
    })

    test('メールアドレスの入力', async () => {
        const user = userEvent.setup();
        render(<UserRegister />);
        const input = screen.getAllByRole('textbox')[2] as HTMLInputElement;
        await user.type(input, 'email');
        expect(input.value).toBe('email');
    })

    test('電話番号1の入力', async () => {
        const user = userEvent.setup();
        render(<UserRegister />);
        const input = screen.getAllByRole('textbox')[3] as HTMLInputElement;
        await user.type(input, '111');
        expect(input.value).toBe('111');
    })

    test('電話番号2の入力', async () => {
        const user = userEvent.setup();
        render(<UserRegister />);
        const input = screen.getAllByRole('textbox')[4] as HTMLInputElement;
        await user.type(input, '2222');
        expect(input.value).toBe('2222');
    })

    test('電話番号3の入力', async () => {
        const user = userEvent.setup();
        render(<UserRegister />);
        const input = screen.getAllByRole('textbox')[5] as HTMLInputElement;
        await user.type(input, '3333');
        expect(input.value).toBe('3333');
    })

    test('郵便番号1の入力', async () => {
        const user = userEvent.setup();
        render(<UserRegister />);
        const input = screen.getAllByRole('textbox')[6] as HTMLInputElement;
        await user.type(input, '444');
        expect(input.value).toBe('444');
    })

    test('郵便番号2の入力', async () => {
        const user = userEvent.setup();
        render(<UserRegister />);
        const input = screen.getAllByRole('textbox')[7] as HTMLInputElement;
        await user.type(input, '5555');
        expect(input.value).toBe('5555');
    })

    test('住所の入力', async () => {
        const user = userEvent.setup();
        render(<UserRegister />);
        const input = screen.getAllByRole('textbox')[8] as HTMLInputElement;
        await user.type(input, '東京');
        expect(input.value).toBe('東京');
    })

    test('パスワードの入力', async () => {
        const user = userEvent.setup();
        render(<UserRegister />);
        const input = screen.getByTestId('password') as HTMLInputElement;
        await user.type(input, 'aaa');
        expect(input.value).toBe('aaa');
    })

    test('確認用パスワードの入力', async () => {
        const user = userEvent.setup();
        render(<UserRegister />);
        const input = screen.getByTestId('confirmationPassword') as HTMLInputElement;
        await user.type(input, 'aaa');
        expect(input.value).toBe('aaa');
    })
})
