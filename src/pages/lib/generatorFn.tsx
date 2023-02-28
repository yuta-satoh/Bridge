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
type url = {
  curtain: string;
  light: string;
  chair: string;
  chest: string;
  table: string;
  rug: string;
  bed: string;
  sofa: string;
  accessory: string;
};

function journal(
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

function shuffleItems(arr: items) {
  let itemsNumber: number[] = [];
  let shuffle: number[] = [];
  let sort: Map<number, string | undefined | item> = new Map();
  const items: Map<number, string | undefined | item> = new Map();
  let changeItems: any = [];
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
  for (const [key, obj] of sort) {
    changeItems.push(obj);
  }
  return changeItems;
}

function createList(
  list: item[],
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
  const curtain = shuffleItems(a);
  const light = shuffleItems(b);
  const chair = shuffleItems(c);
  const chest = shuffleItems(d);
  const table = shuffleItems(e);
  const rug = shuffleItems(f);
  const bed = shuffleItems(g);
  const sofa = shuffleItems(h);
  const accessory = shuffleItems(i);
  list.push(curtain[0]);
  list.push(light[0]);
  list.push(chair[0]);
  list.push(chest[0]);
  list.push(table[0]);
  list.push(rug[0]);
  list.push(bed[0]);
  list.push(sofa[0]);
  list.push(accessory[0]);
}

function setURL(url: url, list: items, listItem: item | undefined) {
  list.map((item) => {
    if (listItem === undefined) {
      return;
    }
    if (item.category === 'カーテン') {
      url.curtain = item.imgurl;
    }
    if (item.category === '照明') {
      url.light = item.imgurl;
    }
    if (item.category === '椅子') {
      url.chair = item.imgurl;
    }
    if (item.category === '収納棚') {
      url.chest = item.imgurl;
    }
    if (item.category === 'テーブル') {
      url.table = item.imgurl;
    }
    if (item.category === 'カーペット/ラグ') {
      url.rug = item.imgurl;
    }
    if (item.category === 'ベッド/寝具') {
      url.bed = item.imgurl;
    }
    if (item.category === 'ソファ') {
      url.sofa = item.imgurl;
    }
    if (item.category === '小物/雑貨') {
      url.accessory = item.imgurl;
    }
  });
}

function sum(listItem: item | undefined, list: items) {
  if (listItem === undefined) {
    return 0;
  }
  return list.reduce(function (sum, element) {
    return sum + element.price;
  }, 0);
}

export { journal, shuffleItems, createList, setURL, sum };

export default function generatorFn(){}
