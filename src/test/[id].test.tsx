import ItemPage from './[id]'
import {getByRole, render, screen} from '@testing-library/react'
import { useRouter } from 'next/router'
import { getByTestId } from '@testing-library/dom'


// ----テスト事項-----
// ①商品一覧からクリックした後に商品詳細に遷移するか(.locationを再定義してrouterに当てはめる?)
// ②遷移した際にデータを網羅して描画されるか
// ③カートに追加ボタンクリック後データの送信はできているか(カートに追加したらconsoleにステータスが表示される(lib/addCart.ts)。そのステータスをフラグとしてデータ送信テスト)
// ------------------

// デモデータオブジェクト作成
const mockItemRouter = [
    {
        id: 1,
        name: 'ベルベットアームチェア',
        description: 'ベルベットのお洒落なデザインチェア。',
        genre: 'フェミニン',
        category: '椅子',
        price: 16000,
        imgurl: '/images/chair/chair_feminine_1.jpg',
        stock: 72,
        delete: false,
    },
    {
        id: 54,
        name: '枯山水時計',
        description: '枯山水をイメージした壁掛け時計。',
        genre: '和モダン',
        category: '小物/雑貨',
        price: 4800,
        imgurl: '/images/accessory/accessory_jmodern_3.jpeg',
        stock: 110,
        delete: false,
    },
    {
        id: 99,
        name: 'アンティークシェルフ',
        description: '温もり溢れる北欧アンティークデザインのシェルフ。',
        genre: '北欧風',
        category: '収納棚',
        price: 30000,
        imgurl: '/images/chest/chest_nordic_3.jpeg',
        stock: 99,
        delete: false,
    }
]

// モック関数作成（next/routerモジュールにpathを入れる）
jest.mock('next/router',() => ({useRouter() {
    return{
        replace:jest.fn(),
        push:jest.fn(),
        relord:jest.fn(),
    };
}}));

// ②遷移した際にデータを網羅して描画されるか
describe('商品詳細テスト',() => {

    // 描画OKver（※useSWRの時はCSRでレンダリングされるため、データが無い場合の描画についても行う。SSRは、そもそもデータが無ければレンダリングされないので今回は対応なし。）
    test('商品詳細を正常に描画',() => {
        const { asFragment } = render(<ItemPage item={mockItemRouter} />);
        expect(asFragment()).toMatchSnapshot();
       
        // 要素が存在しない場合はnullを返す
        expect(screen.queryByText('該当する商品なし')).not.toBeInTheDocument();
    });
    
})



// // ①商品一覧からクリックした後に商品詳細に遷移するか(.locationを再定義してrouterに当てはめる?)
// describe('商品詳細テスト',() => {
//     // 各テストの実行前に随時実行され再利用
//     // beforeEach(() => {
//     //     const mockRouter = {
//     //         query: { id: '1' },
//     //     };

//     //     jest.mock('next/router', () => ({
//     //         useRouter: jest.fn().mockReturnValue(mockRouter),
//     //     }));
//     // })

//     // 描画OKver
//     test('商品詳細を正常に描画',() => {
//         const { getAllByText,getByRole ,getByTestId  } = render(<ItemPage item={mockItemRouter} />);
//         // 指定idの要素が存在するか(/で囲まれた任意の文字列を正規表現として検索)
//         // expect(getByRole('div',{key: /id:1/})).toMatchSnapshot();


//         // ルーターのクエリ・パラメータに応じた情報が表示されているか
//         expect(getAllByText('items.name')).toMatchSnapshot(`商品名：${mockItemRouter[0].name}`);
//         expect(getAllByText('items.genre')).toMatchSnapshot(`ジャンル：${mockItemRouter[0].genre}`);
//         expect(getAllByText('items.category')).toMatchSnapshot(`カテゴリー：${mockItemRouter[0].category}`);

//         // 要素が存在しない場合はnullを返す
//         expect(screen.queryByText('該当する商品なし')).not.toBeInTheDocument();
//     })

//     // 描画エラーver
//     // test('存在しないIDが入力された場合、描画エラー',() => {
//         // const mockRouter = {
//         //     query: { id: '999' },
//         // };
//         // jest.mock('next/router', () => ({
//         // useRouter: jest.fn().mockReturnValue(mockRouter),
//         // }));

//         // const { getByText, getByRole, getByTestId  } = render(<ItemPage item={[]} />);
//         // 指定idの要素が存在するか
//         // expect(screen.queryByText('id:999')).toMatchSnapshot();

//         // expect(getByText('items.name')).toMatchSnapshot(`対象商品のデータがありません`);

//         // 要素が存在しない場合はnullを返す
//         // expect(screen.queryByText('該当する商品なし')).not.toBeInTheDocument();
//     // })

//     // ⑤カートに追加ボタンクリック後データの送信はできているか
//     // ボタンをクリックし、fetchが呼ばれて返すダミーデータをモックで作成

// })
