import { render, screen } from "@testing-library/react";
import { Middleware, SWRResponse, SWRConfig } from "swr";
import userEvent from "@testing-library/user-event";

import GuestCart from "./GuestCart";

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
            json: () => '1'
        })
    })
}

describe('ゲストカートコンポーネント', () => {
    test('ゲストカートが空の状態', () => {
        const cartMiddleware: Middleware = () => {
            return (): SWRResponse<any, any> => {
                return {
                    data: [],
                    error: Error(),
                    mutate: (_) => Promise.resolve(),
                    isValidating: false,
                    isLoading: false,
                }
            }
        }
        const { asFragment } = render(
            <SWRConfig value={{ use: [cartMiddleware] }}>
                <GuestCart guestCart={[]} reloadStrage={jest.fn()} />
            </SWRConfig>
        );
        expect(asFragment()).toMatchSnapshot();
    })

    test('ゲストカートをローディング中', () => {
        const cartMiddleware: Middleware = () => {
            return (): SWRResponse<any, any> => {
                return {
                    data: undefined,
                    error: undefined,
                    mutate: (_) => Promise.resolve(),
                    isValidating: false,
                    isLoading: false,
                }
            }
        }
        const { asFragment } = render(
            <SWRConfig value={{ use: [cartMiddleware] }}>
                <GuestCart guestCart={[]} reloadStrage={jest.fn()} />
            </SWRConfig>
        );
        expect(asFragment()).toMatchSnapshot();
    })

    test('ゲストカートに中身あり', () => {
        const cartMiddleware: Middleware = () => {
            return (): SWRResponse<any, any> => {
                const mockData = [
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
                ];
                
                return {
                    data: mockData,
                    error: undefined,
                    mutate: (_) => Promise.resolve(),
                    isValidating: false,
                    isLoading: false,
                }
            }
        }
        const { asFragment } = render(
            <SWRConfig value={{ use: [cartMiddleware] }}>
                <GuestCart guestCart={[{ itemId: 1, quantity: 1 }, { itemId: 2, quantity: 1 }]} reloadStrage={jest.fn()}/>
            </SWRConfig>
        );
        expect(asFragment()).toMatchSnapshot();
    })

    test('ゲストカートの商品の個数を変更する', async () => {
        global.fetch = jest.fn().mockImplementation(fetchMockOk);
        const user = userEvent.setup()

        // 初期レンダリング用モックデータ
        const cartMiddleware: Middleware = () => {
            return (): SWRResponse<any, any> => {
                const mockData = [
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
                ];
                
                return {
                    data: mockData,
                    error: undefined,
                    mutate: (_) => Promise.resolve(),
                    isValidating: false,
                    isLoading: false,
                }
            }
        }

        // 個数変更後のモックデータ
        const changeMiddleware: Middleware = () => {
            return (): SWRResponse<any, any> => {
                const mockData = [
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
                ];
                
                return {
                    data: mockData,
                    error: undefined,
                    mutate: (_) => Promise.resolve(),
                    isValidating: false,
                    isLoading: false,
                }
            }
        }
        const {asFragment, rerender} = render(
            <SWRConfig value={{ use: [cartMiddleware] }}>
                <GuestCart guestCart={[{ itemId: 1, quantity: 1 }]} reloadStrage={jest.fn()}/>
            </SWRConfig>
        );
        const selectId = screen.getByTestId("select-option");
        await user.selectOptions(selectId, '2');
        // セレクトボックスは変更できたが金額は反映されず
        // 再レンダリングして個数を変更したデータを渡す
        rerender(
            <SWRConfig value={{ use: [changeMiddleware] }}>
                <GuestCart guestCart={[{itemId: 1, quantity: 2}]} reloadStrage={jest.fn()} />
            </SWRConfig>
        )
        expect(asFragment()).toMatchSnapshot();
    })

    test('ゲストカートの商品を削除', async () => {
        global.fetch = jest.fn().mockImplementation(fetchMockOk);
        const user = userEvent.setup();
        const cartMiddleware: Middleware = () => {
            return (): SWRResponse<any, any> => {
                const mockData = [
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
                ];
                
                return {
                    data: mockData,
                    error: undefined,
                    mutate: (_) => Promise.resolve(),
                    isValidating: false,
                    isLoading: false,
                }
            }
        }
        const deleteMiddleware: Middleware = () => {
            return (): SWRResponse<any, any> => {
                const mockData = [
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
                ];
                
                return {
                    data: mockData,
                    error: undefined,
                    mutate: (_) => Promise.resolve(),
                    isValidating: false,
                    isLoading: false,
                }
            }
        }
        const { asFragment, rerender } = render(
            <SWRConfig value={{ use: [cartMiddleware] }}>
                <GuestCart guestCart={[{itemId: 1, quantity: 1}, { itemId: 2, quantity: 1 }]} reloadStrage={jest.fn()} />
            </SWRConfig>
        );
        const deleteBtn = screen.getAllByRole('button');
        await user.click(deleteBtn[1]);
        // 再レンダリングして削除後のデータを渡す
        rerender(
            <SWRConfig value={{ use: [deleteMiddleware] }}>
                <GuestCart guestCart={[{itemId: 1, quantity: 1}]} reloadStrage={() => jest.fn()} />
            </SWRConfig>    
        )
        expect(asFragment()).toMatchSnapshot();
    })
})
