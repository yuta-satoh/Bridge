import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SearchBox from "./SearchBox";

const categoryDatas = [
    '椅子',
    'テーブル',
    'カーテン',
    '照明',
    'カーペット/ラグ',
    'ソファ',
    '収納棚',
    'ベッド/寝具',
    '小物/雑貨',
];
const genreDatas = [
    '北欧風',
    'ナチュラル',
    '和モダン',
    'フェミニン',
  ];

jest.mock('next/router', () => ({
    useRouter() {
      return {
        replace: jest.fn(),
        push: jest.fn(),
        reload: jest.fn(),
      };
    },
}));

describe('検索ボックスコンポーネント', () => {
    test('正常に描画される', () => {
        const { asFragment } = render(<SearchBox />);
        expect(asFragment()).toMatchSnapshot()
    })

    test('テキストボックスに入力する(北欧)', async () => {
        const user = userEvent.setup();
        render(<SearchBox />);
        const input = screen.getByRole('textbox') as HTMLInputElement;
        await user.type(input, '北欧');
        expect(input.value).toBe('北欧');
    })

    // カテゴリ毎にチェックボックスが動いているか確認
    categoryDatas.forEach(async (category) => {
        test(`チェックボックスを選択する(${category})`, async () => {
            const user = userEvent.setup();
            render(<SearchBox />);
            const checkBoxCategory = screen.getByRole('checkbox', { name: `${category}` }) as HTMLInputElement;
            await user.click(checkBoxCategory);
            expect(checkBoxCategory.checked).toBeTruthy();
        })
    })

    // ジャンル毎にチェックボックスが動いているか確認
    genreDatas.forEach(async (genre) => {
        test(`チェックボックスを選択する(${genre})`, async () => {
            const user = userEvent.setup();
            render(<SearchBox />);
            const checkBoxGenre = screen.getByRole('checkbox', { name: `${genre}` }) as HTMLInputElement;
            await user.click(checkBoxGenre);
            expect(checkBoxGenre.checked).toBeTruthy();
        })
    })

    test('クリアボタンが有効', async () => {
        const user = userEvent.setup();
        render(<SearchBox />);
        const checkBoxSofa = screen.getByRole('checkbox', { name: `ソファ` }) as HTMLInputElement;
        const clearBtn = screen.getByRole('button', { name: 'クリア' });
        await user.click(checkBoxSofa);
        await user.click(clearBtn)
        expect(checkBoxSofa.checked).toBeFalsy()
    })

    test('チェックボックスのダブルクリック', async () => {
        const user = userEvent.setup();
        render(<SearchBox />);
        const checkBoxSofa = screen.getByRole('checkbox', { name: `ソファ` }) as HTMLInputElement;
        await user.dblClick(checkBoxSofa);
        expect(checkBoxSofa.checked).toBeFalsy()
    })
})
