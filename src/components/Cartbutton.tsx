import React, { useState, useEffect, ChangeEvent } from 'react';
import istyles from '../styles/item.module.css';
import addCart from '@/lib/addCart';
import { useRouter } from 'next/router';
import Button from './utils/Button';

// valueをカートに付与して送信
// valueのcountがマイナスになってしまう場合もあるので条件追記必要
const CartCounter = ({ itemId, handleChangeQuantityItem }: { itemId: number, handleChangeQuantityItem: (quantity: string) => void }) => {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  const handleChange = (ev: ChangeEvent<HTMLSelectElement>) => {
    const value = ev.target.value;
    handleChangeQuantityItem(value)
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
      <Button
        type="button"
        color='pink'
        onClick={async () => {
          await addCart(itemId, quantity)
          router.push("/cart")
        }}
      >
        カートに追加
      </Button>
    </div>
  );
};

export default CartCounter;
