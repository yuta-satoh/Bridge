import React, { useState, useEffect, ChangeEvent } from 'react';
import istyles from '../styles/item.module.css';
import addCart from '@/lib/addCart';
import Link from 'next/link';

// valueをカートに付与して送信
// valueのcountがマイナスになってしまう場合もあるので条件追記必要
const CartCounter = ({ itemId }: { itemId: number }) => {
  const [quantity, setQuantity] = useState(0);

  const handleChange = (ev: ChangeEvent<HTMLSelectElement>) => {
    const value = ev.target.value;
    setQuantity(Number(value));
  };

  return (
    <div className={istyles.carts}>
      <div className={istyles.cart_left}>
        <select
          name="quantity"
          id="cart_quantity"
          className={istyles.cart_value}
          defaultValue={quantity}
          onChange={(ev) => handleChange(ev)}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
          <option value={10}>10</option>
        </select>
      </div>
      {/* イベント実行後、ローカルストレージに付与するのみ。カートページでgetしている。 */}
      <Link href="/cart">
          <button
            type="button"
            onClick={() => addCart(itemId, quantity)}
            className={istyles.buttonStyle}
          >
            カートに追加
          </button>
      </Link>
    </div>
  );
};

export default CartCounter;
