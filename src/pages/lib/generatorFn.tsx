type Request = {
  request: {
    id: number;
    name: string;
    description: string;
    genre: string;
    category: string;
    price: number;
    imgurl: string;
    stock: number;
    delete: boolean;
  }[];
};
type items = {
  id: number;
  name: string;
  genre: string;
  category: string;
  price: number;
  imgurl: string;
}[];
type item = {
  id: number;
  name: string;
  genre: string;
  category: string;
  price: number;
  imgurl: string;
};

export function journal(
  { request }: Request,
  a: items,
  b: items,
  c: items,
  d: items,
  e: items,
  f: items,
  g: items,
  h: items,
  i: items
) {
  for (const item of request) {
    if (item.category === 'カーテン') {
      a.push(item);
    }
    if (item.category === '照明') {
      b.push(item);
    }
    if (item.category === '椅子') {
      c.push(item);
    }
    if (item.category === '収納棚') {
      d.push(item);
    }
    if (item.category === 'テーブル') {
      e.push(item);
    }
    if (item.category === 'カーペット/ラグ') {
      f.push(item);
    }
    if (item.category === 'ベッド/寝具') {
      g.push(item);
    }
    if (item.category === 'ソファ') {
      h.push(item);
    }
    if (item.category === '小物/雑貨') {
      i.push(item);
    }
  }
}

export function shuffleItems(arr: items) {
  let itemsNumber: number[] = [];
  let shuffle: number[] = [];
  let sort: Map<number, string | undefined | item> = new Map();
  const items: Map<number, string | undefined | item> = new Map();
  let changeItems: item = {
    id: 0,
    name: '',
    genre: '',
    category: '',
    price: 0,
    imgurl: '',
  };
  for (let i = 1; i <= arr.length; i++) {
    itemsNumber.push(i);
  }
  for (let x = 0; x <= arr.length - 1; x++) {
    sort.set(itemsNumber[x], '');
  }
  const num = itemsNumber.length;
  for (let v = 0; v <= num; v++) {
    let index = Math.floor(Math.random() * itemsNumber.length);
    shuffle.push(itemsNumber[index]);
    itemsNumber.splice(index, 1);
  }
  for (let j = 0; j <= num - 1; j++) {
    items.set(shuffle[j], arr[j]);
  }
  for (const [key, _] of sort) {
    sort.set(key, items.get(key));
  }
  for (const item of sort) {
    Object.assign(changeItems, item);
  }
  return changeItems;
}
