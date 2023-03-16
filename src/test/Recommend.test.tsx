import { render, screen } from "@testing-library/react";
import { Middleware, SWRResponse, SWRConfig } from "swr";
import userEvent from "@testing-library/user-event";

import Recommend from "./Recommend";

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

describe('Recommendコンポーネント', () => {
    test('おすすめ商品のローディング中', () => {
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
                <Recommend recommend={[{ id: 1, genre: 'ジャンル' }]} />
            </SWRConfig>
        );
        expect(asFragment()).toMatchSnapshot();
    })

    test('ユーザーカートのおすすめ商品が無い場合', () => {
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
                <Recommend recommend={[{ id: 1, genre: 'ジャンル' }]} />
            </SWRConfig>
        );
        expect(asFragment()).toMatchSnapshot();
    })

    test('ユーザーカートのおすすめ商品が正常に描画される', () => {
        const cartMiddleware: Middleware = () => {
            return (): SWRResponse<any, any> => {
                return {
                    data: [
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
                    ],
                    error: undefined,
                    mutate: (_) => Promise.resolve(),
                    isValidating: false,
                    isLoading: false,
                }
            }
        }
        const { asFragment } = render(
            <SWRConfig value={{ use: [cartMiddleware] }}>
                <Recommend recommend={[{ id: 3, genre: 'フェミニン' }]} />
            </SWRConfig>
        );
        expect(asFragment()).toMatchSnapshot();
    })
    test('カートにおすすめ商品を追加する', async () => {
        global.fetch = jest.fn().mockImplementation(fetchMockOk);
        const user = userEvent.setup();

        const cartMiddleware: Middleware = () => {
            return (): SWRResponse<any, any> => {
                return {
                    data: [
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
                    ],
                    error: undefined,
                    mutate: (_) => Promise.resolve(),
                    isValidating: false,
                    isLoading: false,
                }
            }
        }
        const { asFragment } = render(
            <SWRConfig value={{ use: [cartMiddleware] }}>
                <Recommend recommend={[{ id: 3, genre: 'フェミニン' }]} />
            </SWRConfig>
        );
        const addBtn = screen.getByRole('button');
        // クリックさせてみたけどその後の処理を確認する方法がわからないのでここでストップ
        await user.click(addBtn);
        expect(asFragment()).toMatchSnapshot();
    })

})
