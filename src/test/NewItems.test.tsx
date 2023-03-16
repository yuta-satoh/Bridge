import { render } from "@testing-library/react";
import { Middleware, SWRResponse, SWRConfig } from "swr";

import NewItems from "./NewItems";

describe('新着商品', () => {
    test('正常に描画されました', () => {
        const testMiddleware: Middleware = () => {
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
                    {
                        id: 3,
                        name: "ブルーアームチェア",
                        description: "爽やかなブルーのベルベットチェア。",
                        genre: "フェミニン",
                        category: "椅子",
                        price: 20000,
                        imgurl: "/images/chair/chair_feminine_3.jpg",
                        stock: 100,
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

        const {asFragment} = render(
            <SWRConfig value={{ use: [testMiddleware] }}>
                <NewItems />
            </SWRConfig>
        );
        expect(asFragment()).toMatchSnapshot();
    })

    test('データがない場合', () => {
        const testMiddleware: Middleware = () => {
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
        const {asFragment} = render(
            <SWRConfig value={{ use: [testMiddleware] }}>
                <NewItems />
            </SWRConfig>
        );
        expect(asFragment()).toMatchSnapshot();
    })

    test('フェッチエラーの場合', () => {
        const testMiddleware: Middleware = () => {
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
        const {asFragment} = render(
            <SWRConfig value={{ use: [testMiddleware] }}>
                <NewItems />
            </SWRConfig>
        );
        expect(asFragment()).toMatchSnapshot();
    })
})
