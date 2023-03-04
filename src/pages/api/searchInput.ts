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
    const query = req.query.search;

    if (query === undefined || typeof query !== 'string') {
        // 型ガード
        res.status(400).end()
    } else {
        // カンマ区切りでクエリが渡されてきます
        // 分解して配列にし、クエリパラメータ作成
        const queryString = query
            .split(",")
            .reduce((current, query) => current + `,or(name.like.%${query}%,genre.like.%${query}%,description.like.%${query}%,category.like.%${query}%)`, '')
            .replace(',', '');
        console.log(queryString);
        // orとandを組み合わせてfetch
        const response = await fetch(`http://127.0.0.1:8000/items?and=(${queryString})`);
        const filter = await response.json();
        if (response.ok) {
            res.status(200).json(filter);
        } else {
            res.status(401).end();
        }
    }
}
