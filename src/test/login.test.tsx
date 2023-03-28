import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import Login from './login';

jest.mock('next/router', () => ({
    useRouter() {
      return {
        replace: jest.fn(),
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
            status: 401,
            statusText: 'Failed',
        })
    })
}

describe('ログインページ', () => {
    test('ログインページが正常に描画されました', () => {
        const { asFragment } = render(<Login />);
        expect(asFragment()).toMatchSnapshot()
    })

    test('正常なメールアドレスとパスワードを入力してログイン', async () => {
        global.fetch = jest.fn().mockImplementation(fetchMockOk);
        // setupがおすすめされてるので先に実行
        const user = userEvent.setup()
        // Login.tsxをレンダリング
        const { asFragment } = render(<Login />);

        // メールアドレスを入力して確認
        const inputEmail = screen.getByLabelText('メールアドレス');
        await user.type(inputEmail, 'rakus@example.com');
        expect(inputEmail).toHaveValue('rakus@example.com');
        // パスワードを入力して確認
        const inputPassword = screen.getByLabelText('パスワード')
        await user.type(inputPassword, 'rakus');
        expect(inputPassword).toHaveValue('rakus');

        // ログインボタンをクリック
        await user.click(screen.getByRole('button', { name: 'ログイン →' }))

        expect(asFragment()).toMatchSnapshot()
    })

    test('異常なメールアドレスとパスワードを入力してログイン', async () => {
        global.fetch = jest.fn().mockImplementation(fetchMockNg);
        // setupがおすすめされてるので先に実行
        const user = userEvent.setup()
        // Login.tsxをレンダリング
        const { asFragment } = render(<Login />);

        // メールアドレスを入力して確認
        const inputEmail = screen.getByLabelText('メールアドレス');
        await user.type(inputEmail, 'notUser@example.com');
        expect(inputEmail).toHaveValue('notUser@example.com');
        // パスワードを入力して確認
        const inputPassword = screen.getByLabelText('パスワード')
        await user.type(inputPassword, 'notUser');
        expect(inputPassword).toHaveValue('notUser');

        // ログインボタンをクリック
        await user.click(screen.getByRole('button', { name: 'ログイン →' }))
        
        // エラーメッセージが表示されてるとOK
        expect(screen.getByText('メールアドレスかパスワードが間違っています').textContent).toBe('メールアドレスかパスワードが間違っています')

        expect(asFragment()).toMatchSnapshot()
    })
})
