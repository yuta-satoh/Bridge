import type { NextApiRequest, NextApiResponse } from 'next';

type Item = {
	id: number,
	name: string,
	description: string,
	genre: string,
	category: string,
	price: number,
	imgurl: string,
	stock: number,
	delete: boolean,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Item[]>
) {
    const genre = req.query.genre;
    const category = req.query.category;

    if (genre === undefined || category === undefined || typeof genre !== 'string' || typeof category !== 'string') {
        // 型ガード
        res.status(400).end()
    } else {
        // カンマ区切りでクエリが渡されてきます
        // 分解して配列にし、クエリパラメータ作成
        const genreQuery = genre
            .split(",")
            .reduce((current, query) => current + `,genre.eq.${query}`, '')
            .replace(',', '');
        const categoryQuery = category
            .split(",")
            .reduce((current, query) => current + `,category.eq.${query}`, '')
            .replace(',', '');

        // orとandを組み合わせてfetch
        const response = await fetch(`http://127.0.0.1:8000/items?and=(or(${genreQuery}),or(${categoryQuery}))`);
        const filter = await response.json();
        if (response.ok) {
            res.status(200).json(filter);
        } else {
            res.status(401).end();
        }
    }
}
