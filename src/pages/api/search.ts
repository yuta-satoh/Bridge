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
    const input = req.query.input;

    if (typeof genre !== 'string' || typeof category !== 'string' || typeof input !== 'string') {
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
        const inputQuery = input.length === 0 ? "" : input
            .split(/\s+/)
            .reduce((current, query) => current + `,or(name.like.%${query}%,genre.like.%${query}%,description.like.%${query}%,category.like.%${query}%)`, '')

        // orとandを組み合わせてfetch
        const response = await fetch(`http://127.0.0.1:8000/items?and=(or(${genreQuery}),or(${categoryQuery})${inputQuery})`);
        const filter = await response.json();
        if (response.ok) {
            res.status(200).json(filter);
        } else {
            res.status(401).end();
        }
    }
}