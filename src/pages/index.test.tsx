import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import Home from '.';

jest.mock('next/router', () => ({
    useRouter() {
      return {
        replace: jest.fn(),
        push: jest.fn(),
        reload: jest.fn(),
      };
    },
}));

describe('トップページ', () => {
    test('トップページが正常に描画されました', () => {
        const { asFragment } = render(<Home />);
        expect(asFragment()).toMatchSnapshot();
    })
})
