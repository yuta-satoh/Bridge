import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import Home from '.';

describe('トップページ', () => {
    test('トップページが正常に描画されました', () => {
        const { asFragment } = render(<Home />);
        expect(asFragment()).toMatchSnapshot();
    })
})
