import useSWR from 'swr';
export function purchaseFn() {}

type carts = {
  id: number;
  item_id: number;
  items: item;
  cart_id: number;
  date: string;
  quantity: number;
  delete: boolean;
}[];

type item = {
  id: number;
  name: string;
  description: string;
  genre: string;
  category: string;
  price: number;
  imgurl: string;
  stock: number;
  delete: boolean;
};

type cart = {
  id: number;
  item_id: number;
  items: item;
  cart_id: number;
  date: string;
  quantity: number;
  delete: boolean;
};


async function deleteCart(id: number) {
  await fetch(`/api/purchase/deleteCart?id=${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => console.log('OK'))
    .catch((err) => console.error(err));
}

async function addHistory(cart: cart) {
  const getDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    if (month < 10 && day < 10) {
      return `${year}-0${month}-0${day}`;
    } else if (month < 10) {
      return `${year}-0${month}-${day}`;
    } else if (day < 10) {
      return `${year}-${month}-0${day}`;
    } else {
      return `${year}-${month}-${day}`;
    }
  };
  await fetch(`/api/purchase/addHistory`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      item_id: cart.items.id,
      user_id: cart.cart_id,
      name: cart.items.name,
      description: cart.items.description,
      genre: cart.items.genre,
      category: cart.items.category,
      price: cart.items.price,
      imgurl: cart.items.imgurl,
      date: getDate(),
      quantity: cart.quantity,
      delete: false,
    }),
  })
    .then((res) => console.log('OK'))
    .catch((err) => console.error(err));
}

export default async function procedure(carts: carts) {
  // const router = useRouter()
  carts.map((cart) => {
    addHistory(cart);
    deleteCart(cart.item_id);
  });
  // location.href = '/purchaseComp';
  // router.replace('/purchaseComp')
}

export { deleteCart, addHistory, procedure };
