import React, {useState, useEffect} from 'react';
import istyles from '../styles/item.module.css';

// valueをカートに付与して送信
// valueのcountがマイナスになってしまう場合もあるので条件追記必要
const CartCounter = () => {
  const [count, setCount] = useState(0);

  return (
    <div className={istyles.carts}>
    <div className={istyles.cart_left}>
      <button className={istyles.cart_lclick} onClick={() => setCount(count - 1 )}>-</button>
      <form>
      <input type="text" value={count} className={istyles.cart_value}/>
      </form>
      <button className={istyles.cart_rclick} onClick={() => setCount(count + 1 )}>+</button>
    </div>
    <div className={istyles.cart_right}>
    <button type="button">カートに追加</button>
  </div>
    </div>
  )
}

export default CartCounter;
