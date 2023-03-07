import Image from 'next/image';
import Link from 'next/link';
import headModule from '../styles/header.module.css';
import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';
import { rule } from 'postcss';

type GuestCartType = {
  itemId: number;
  quantity: number;
};

export default function GuestCart() {
  const [sum, setSum] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const storageData = localStorage.getItem('GuestCart');
    if (storageData !== null) {
      const test: GuestCartType[] = JSON.parse(storageData);
      const total = test.reduce(function (sum, element) {
        return sum + element.quantity;
      }, 0);
      if (total === sum) {
        return;
      } else {
        setSum(total);
      }
    }
  });

//   console.log("合計", sum);

  return (
    <>
      <Link href={'/cart'} className={headModule.iconModule}>
        {sum === 0 ? (
          <></>
        ) : (
          <div className={headModule.cartCounter}>{sum}</div>
        )}
        <Image
          src="/images/icon/cart.png"
          alt=""
          width={25}
          height={25}
        />
        <span
          className={`${headModule.menuLabel} inline-block mt-1 whitespace-nowrap`}
        >
          カート
        </span>
      </Link>
    </>
  );
}