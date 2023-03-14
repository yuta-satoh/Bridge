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
const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYXBpX3VzZXIifQ.OOP7yE5O_2aYFQG4bgMBQ9r0f9sikNqXbhJqoS9doTw';

async function deleteCart(id: number) {
  await fetch(`http://127.0.0.1:8000/cart_items?item_id=eq.${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
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
  await fetch(`http://127.0.0.1:8000/order_histories`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
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
