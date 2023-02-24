import Image from 'next/image';
import Link from 'next/link';
import lstyles from '../styles/itemList.module.css';

// 仮で商品を入れています

export default function ItemList() {
  return (
    <>
      <div className={lstyles.list_outer}>
        <div>
        <div className={lstyles.image}>
          <Image
            src="/images/accessory/accessory_feminine_1.jpg"
            alt="全身姿見"
            width={200}
            height={200}
          />
        </div>
        <div>
          <p>全身姿見</p>
          <p>¥15,000</p>
          <p>韓国インテリアのお洒落な全身鏡。</p>
        </div>
        </div>

        <div>
        <div className={lstyles.image}>
          <Image
            src="/images/accessory/accessory_feminine_1.jpg"
            alt="全身姿見"
            width={200}
            height={200}
          />
        </div>
        <div>
          <p>全身姿見</p>
          <p>¥15,000</p>
          <p>韓国インテリアのお洒落な全身鏡。</p>
        </div>
        </div>

        <div>
        <div className={lstyles.image}>
          <Image
            src="/images/accessory/accessory_feminine_1.jpg"
            alt="全身姿見"
            width={200}
            height={200}
          />
        </div>
        <div>
          <p>全身姿見</p>
          <p>¥15,000</p>
          <p>韓国インテリアのお洒落な全身鏡。</p>
        </div>
        </div>

        <div>
        <div className={lstyles.image}>
          <Image
            src="/images/accessory/accessory_feminine_1.jpg"
            alt="全身姿見"
            width={200}
            height={200}
          />
        </div>
        <div>
          <p>全身姿見</p>
          <p>¥15,000</p>
          <p>韓国インテリアのお洒落な全身鏡。</p>
        </div>
        </div>

        <div>
        <div className={lstyles.image}>
          <Image
            src="/images/accessory/accessory_feminine_1.jpg"
            alt="全身姿見"
            width={200}
            height={200}
          />
        </div>
        <div>
          <p>全身姿見</p>
          <p>¥15,000</p>
          <p>韓国インテリアのお洒落な全身鏡。</p>
        </div>
        </div>

      </div>
    </>
  );
}
