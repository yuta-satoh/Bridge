import Image from 'next/image';
import Link from 'next/link';
import lstyles from '../styles/itemList.module.css';

// 仮で商品を入れています

export default function ItemList() {
  return (
    <>
      <div className={lstyles.list_outer}>
        <div>
        <Link href={'/'}>
        <div className={lstyles.image}>
          <Image
            src="/images/accessory/accessory_feminine_1.jpg"
            alt="全身姿見"
            width={250}
            height={250}
          />
        </div>
        <div className={lstyles.detail}>
          <p>全身姿見</p>
          <p>¥15,000</p>
          <p>韓国インテリアのお洒落な全身鏡。</p>
        </div>
        </Link>
        </div>

        <div>
        <Link href={'/'}>
        <div className={lstyles.image}>
          <Image
            src="/images/accessory/accessory_feminine_1.jpg"
            alt="全身姿見"
            width={250}
            height={250}
          />
        </div>
        <div className={lstyles.detail}>
          <p>全身姿見</p>
          <p>¥15,000</p>
          <p>韓国インテリアのお洒落な全身鏡。</p>
        </div>
        </Link>
        </div>

        <div>
        <Link href={'/'}>
        <div className={lstyles.image}>
          <Image
            src="/images/accessory/accessory_feminine_1.jpg"
            alt="全身姿見"
            width={250}
            height={250}
          />
        </div>
        <div className={lstyles.detail}>
          <p>全身姿見</p>
          <p>¥15,000</p>
          <p>韓国インテリアのお洒落な全身鏡。</p>
        </div>
        </Link>
        </div>

        <div>
        <Link href={'/'}>
        <div className={lstyles.image}>
          <Image
            src="/images/accessory/accessory_feminine_1.jpg"
            alt="全身姿見"
            width={250}
            height={250}
          />
        </div>
        <div className={lstyles.detail}>
          <p>全身姿見</p>
          <p>¥15,000</p>
          <p>韓国インテリアのお洒落な全身鏡。</p>
        </div>
        </Link>
        </div>

        <div>
        <Link href={'/'}>
        <div className={lstyles.image}>
          <Image
            src="/images/accessory/accessory_feminine_1.jpg"
            alt="全身姿見"
            width={250}
            height={250}
          />
        </div>
        <div className={lstyles.detail}>
          <p>全身姿見</p>
          <p>¥15,000</p>
          <p>韓国インテリアのお洒落な全身鏡。</p>
        </div>
        </Link>
        </div>

        <div>
        <Link href={'/'}>
        <div className={lstyles.image}>
          <Image
            src="/images/accessory/accessory_feminine_1.jpg"
            alt="全身姿見"
            width={250}
            height={250}
          />
        </div>
        <div className={lstyles.detail}>
          <p>全身姿見</p>
          <p>¥15,000</p>
          <p>韓国インテリアのお洒落な全身鏡。</p>
        </div>
        </Link>
        </div>

      </div>
    </>
  );
}
