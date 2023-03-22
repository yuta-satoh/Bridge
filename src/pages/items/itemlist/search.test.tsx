import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Search from "./search";

jest.mock('next/router', () => ({
    useRouter() {
      return {
        replace: jest.fn(),
        push: jest.fn(),
        reload: jest.fn(),
      };
    },
}));

const filter = [
    {
        id: 1,
        name: "ベルベットアームチェア",
        description: "ベルベットのお洒落なデザインチェア。",
        genre: "フェミニン",
        category: "椅子",
        price: 16000,
        imgurl: "/images/chair/chair_feminine_1.jpg",
        stock: 72,
        delete: false
    },
    {
        id: 2,
        name: "丸椅子スツール",
        description: "落ち着いた可愛らしいベロア風スツール。",
        genre: "フェミニン",
        category: "椅子",
        price: 10000,
        imgurl: "/images/chair/chair_feminine_2.jpg",
        stock: 99,
        delete: false
    },
]

const maxPage = '1'

const nowOrder = {
    genres: '北欧',
    categories: 'ソファ',
    input: 'スツール',
    order: 'new',
    page: '0',
}


describe('検索ページ', () => {
    test('正常に描画される', () => {
        const { asFragment } = render(<Search filter={filter} maxPage={maxPage} nowOrder={nowOrder} />);
        expect(asFragment()).toMatchSnapshot()
    })

    test('検索結果が無い', () => {
        const { asFragment } = render(<Search filter={[]} maxPage={maxPage} nowOrder={nowOrder} />);
        expect(asFragment()).toMatchSnapshot()
    })
    
    test('並び替えのセレクトボックスが選択可能か', async () => {
        const user = userEvent.setup();
        render(<Search filter={filter} maxPage={maxPage} nowOrder={nowOrder} />);
        const selectOrder = screen.getByTestId('select-option');
        await user.selectOptions(selectOrder, '高い順')
        const expensiveSelect = screen.getByRole('option', { name: '高い順' }) as HTMLOptionElement
        expect(expensiveSelect.selected).toBeTruthy()
    })
})
