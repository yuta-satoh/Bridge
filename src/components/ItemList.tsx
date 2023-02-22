import Image from 'next/image';
import Link from 'next/link';

// 一旦クラスネームはTailwind仕様無しで仮作成しています
// 仮で商品を1つ入れています

export default function ItemList() {
  return (
    <>
      <div className="itemlist">
        <div>
          <Image
            src="/images/accessory/accessory_feminine_1.jpg"
            alt="全身姿見"
            width={150}
            height={150}
          />
        </div>
        <div>
          <p>全身姿見</p>
          <p>¥15,000</p>
          <p>韓国インテリアのお洒落な全身鏡。</p>
        </div>
      </div>
    </>
  );
}
