import pModule from '../styles/purchase.module.css';
import { GetServerSideProps } from 'next';
import useSWR from 'swr';
import Head from 'next/head';
import { useEffect, useState, ChangeEvent } from 'react';
import { procedure } from '@/lib/purchaseFn';
import Link from 'next/link';
import urStyles from '../styles/userRegister.module.css';
import Auth from './auth/auth';
import { useRouter } from 'next/router';

type items = {
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
  items: items;
  cart_id: number;
  date: string;
  quantity: number;
  delete: boolean;
}[];
type User = {
  lastName: string;
  firstName: string;
  gender: string;
  tell: string;
  email: string;
  zipcode: string;
  address: string;
  password: string;
}[];
type price = {
  id: number;
  name: string;
  price: number;
}[];

type address = {
  zipcode1: string;
  zipcode2: string;
  address: string;
  addressSelect: string;
};

export const getServerSideProps: GetServerSideProps = async (
  context
) => {
  const cookie = context.req.cookies['id'];
  if (cookie === undefined) {
    const user = null;
    const cookie = '0';
    return {
      props: { cookie, user },
    };
  }
  const TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYXBpX3VzZXIifQ.OOP7yE5O_2aYFQG4bgMBQ9r0f9sikNqXbhJqoS9doTw';
  const user = await fetch(
    `http://127.0.0.1:8000/users?id=eq.${cookie}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
  return {
    props: { cookie, user },
  };
};

export default function Purchase({
  cookie,
  user,
}: {
  cookie: string | null;
  user: User;
}) {
  const initUserInfo = {
    zipcode1: '',
    zipcode2: '',
    address: user[0].address,
    addressSelect: 'false',
  };
  const initBorderError = {
    zipcode1: false,
    zipcode2: false,
    address: false,
  };
  const [userInfo, setUserInfo] = useState<address>(initUserInfo);
  const [borderError, setBorderError] = useState(initBorderError);
  const router = useRouter();
  const price: price = [];
  const userId = Number(cookie);
  const fetcher = (url: string) =>
    fetch(url).then((res) => res.json());

  const { data, error }: { data: cart; error: any } = useSWR(
    `/api/getCart/items?id=${userId}`,
    fetcher
  );

  useEffect(() => {
    if (cookie === '0' || null) {
      router.replace('/cart');
    }
  }, []);

  if (error) return <p>エラー</p>;
  if (!data) return <p>ロード中...</p>;
  if (data.length === 0) {
    location.href = '/cart';
  }
  data.map((item) => {
    price.push({
      id: item.item_id,
      name: item.items.name,
      price: item.items.price * item.quantity,
    });
  });
  // 郵便番号検索
  const searchAddress = (e: React.FormEvent) => {
    const url = 'https://zipcoda.net/api?';
    if (userInfo.zipcode1 && userInfo.zipcode2) {
      const params = new URLSearchParams({
        zipcode: `${userInfo.zipcode1}${userInfo.zipcode2}`,
      });
      fetch(url + params)
        .then((response) => response.json())
        .then((data) => {
          const stateName: string = data.items[0].state_name;
          const townName: string = data.items[0].address;
          setUserInfo({
            ...userInfo,
            address: `${stateName + townName}`,
          });
        })
        .catch((err: ErrorEvent) => {
          console.log(err);
        });
    }
  };

  const handleChange = (e: ChangeEvent) => {
    if (!(e.target instanceof HTMLInputElement)) {
      return;
    }
    const key = e.target.name;
    const value = e.target.value;
    setUserInfo({ ...userInfo, [key]: value });
    setBorderError({ ...borderError, [key]: false });
  };
  const total = price.reduce(function (sum, element) {
    return sum + element.price;
  }, 0);
  const tax = total * 0.1;

  const oneWeekAgo = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate() + 7;
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

  function test(data: cart) {
    procedure(data);
    router.replace('/purchaseComp');
  }

  return (
    <>
      <Head>
        <title>購入確認</title>
      </Head>
        <div className={pModule.body}>
          <h1 className={pModule.title}>購入確認</h1>
          <table className={pModule.itemTable}>
            <tbody>
              <tr className={pModule.tableTLine}>
                <th className={pModule.nameTag}>品名</th>
                <th className={pModule.item}>個数</th>
                <th className={pModule.itemTag}>単価</th>
                <th className={pModule.itemTag}>小計</th>
              </tr>
              {data.map((item) => (
                <tr key={item.item_id} className={pModule.tableLine}>
                  <td className={pModule.itemName}>
                    {item.items.name}
                  </td>
                  <td className={pModule.item}>{item.quantity}</td>
                  <td className={pModule.item}>
                    ¥ {item.items.price.toLocaleString()}
                  </td>
                  <td className={pModule.item}>
                    ¥{' '}
                    {(
                      item.quantity * item.items.price
                    ).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
            <tbody>
              <tr className={pModule.content}>
                <td colSpan={2}></td>
                <td className={pModule.subTTotal}>本体合計</td>
                <td className={pModule.topText}>
                  ¥&nbsp;{total.toLocaleString()}
                </td>
              </tr>
              <tr className={pModule.content}>
                <td colSpan={2}></td>
                <td className={pModule.subTotal}>消費税</td>
                <td className={pModule.text}>
                  ¥&nbsp;{tax.toLocaleString()}
                </td>
              </tr>
              <tr className={pModule.totalContent}>
                <td colSpan={2}></td>
                <td className={pModule.total}>合計</td>
                <td className={pModule.total}>
                  ¥&nbsp;{(total + tax).toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
          <div className={pModule.addressArea}>
            <p className={pModule.addressTitle}>お届け先住所</p>
            <div className={pModule.radio}>
              {userInfo.addressSelect === 'true' ? (
                <input
                  type="radio"
                  name="addressSelect"
                  id="now"
                  value="false"
                  onChange={handleChange}
                />
              ) : (
                <input
                  type="radio"
                  name="addressSelect"
                  id="now"
                  value="false"
                  onChange={handleChange}
                  checked
                />
              )}
              <label htmlFor="now" className={pModule.label}>
                現在の住所にお届け
              </label>
            </div>
            <p className={pModule.nAddress}>{user[0].address}</p>
            <div className={pModule.radio}>
              {userInfo.addressSelect === 'true' ? (
                <input
                  type="radio"
                  name="addressSelect"
                  id="new"
                  value="true"
                  onChange={handleChange}
                  checked
                />
              ) : (
                <input
                  type="radio"
                  name="addressSelect"
                  id="new"
                  value="true"
                  onChange={handleChange}
                />
              )}
              <label htmlFor="new" className={pModule.label}>
                別の住所にお届け
              </label>
            </div>
            <div
              className={
                userInfo.addressSelect === 'true'
                  ? pModule.inputItems
                  : pModule.nonItems
              }
            >
              <label htmlFor="zipcode" className={urStyles.label}>
                郵便番号
              </label>
              <br />
              <input
                type="text"
                pattern="^[0-9]+$"
                name="zipcode1"
                id="zipcode1"
                value={userInfo.zipcode1}
                className={`${pModule.zipcode} border 'border-neutral-500' rounded pl-2.5`}
                onChange={handleChange}
              />
              <span>-</span>
              <input
                type="text"
                pattern="^[0-9]+$"
                name="zipcode2"
                id="zipcode2"
                value={userInfo.zipcode2}
                className={`${pModule.zipcode} border 'border-neutral-500' rounded pl-2.5`}
                onChange={handleChange}
              />
              <button
                type="button"
                className={`${urStyles.zipButton} text-white bg-neutral-900 border border-neutral-900 rounded px-1`}
                onClick={searchAddress}
              >
                住所検索
              </button>
            </div>
            <div
              className={
                userInfo.addressSelect === 'true'
                  ? pModule.inputItems
                  : pModule.nonItems
              }
            >
              <label htmlFor="address" className={urStyles.label}>
                住所
              </label>
              <br />
              <input
                type="text"
                name="address"
                id="address"
                value={userInfo.address}
                className={`${pModule.address} border 'border-neutral-500' rounded pl-2.5`}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={pModule.dateArea}>
            <p className={pModule.addressTitle}>お届け希望日</p>
            <input
              type="date"
              name="date"
              id="date"
              min={oneWeekAgo()}
              className={pModule.date}
            />
          </div>
          <div className={pModule.timeArea}>
            <p className={pModule.addressTitle}>希望時間</p>
            <select
              name="time_zone"
              id="time_zone"
              className={pModule.time_zone}
            >
              <option value="none">希望無し</option>
              <option value="morning">午前</option>
              <option value="noon">12時~18時</option>
              <option value="evening">18時以降</option>
            </select>
          </div>
          <div className={pModule.buttonArea}>
            <button
              type="button"
              onClick={() => test(data)}
              className={pModule.buttonStyle}
            >
              購入する
            </button>
          </div>
          <div className={urStyles.loginLink}>
            <Link href="/cart">
              <button type="button" className={urStyles.linkButton}>
                カートに戻る
                <span className={urStyles.buttonSpan}>→</span>
              </button>
            </Link>
          </div>
        </div>
    </>
  );
}
