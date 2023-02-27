import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import cModule from '../styles/coordination.module.css';
import { type } from 'os';

type props = {
  send: string;
};
type request = {
    request:{
      id: number;
      name:string;
      description:string;
      genre:string;
      category:string;
      price:number;
      imgurl:string;
      stock:number;
      delete:boolean;
    }[]
  }

export default function Generator(send: props, request:request) {
  // ダミーデータ
  const kaguData = {
    url: '/images/accessory/accessory_nordic_3.jpeg',
    name: 'アニマルスツール',
    price: 5000,
  };

  // ダミーデータ配列
  const newItems = Array(9).fill(kaguData);
  const total = newItems.reduce(function (sum, element) {
    return sum + element.price;
  }, 0);

  const url = '/images/accessory/accessory_nordic_3.jpeg';
  return (
    <>
      <div>
        <h1>テーマ：{send.send}</h1>
        <section className={cModule.linkItems}>
          <article className={cModule.coordinateArea}>
            <div className={cModule.empty}></div>
            <div className={cModule.images_b} id="curtain">
              <Image src={url} width={240} height={240} alt="" />
            </div>
            <div className={cModule.images_b} id="light">
              <Image src={url} width={240} height={240} alt="" />
            </div>
            <div className={cModule.images_c} id="chair">
              <Image src={url} width={240} height={240} alt="" />
            </div>
            <div className={cModule.images} id="chest">
              <Image src={url} width={240} height={240} alt="" />
            </div>
            <div className={cModule.images_b} id="table">
              <Image src={url} width={240} height={240} alt="" />
            </div>
            <div className={cModule.images_b} id="rug">
              <Image src={url} width={240} height={240} alt="" />
            </div>
            <div className={cModule.images_c} id="bed">
              <Image src={url} width={240} height={240} alt="" />
            </div>
            <div className={cModule.empty}></div>
            <div className={cModule.images_b} id="sofa">
              <Image src={url} width={240} height={240} alt="" />
            </div>
            <div className={cModule.empty}></div>
            <div className={cModule.images_c} id="accessory">
              <Image src={url} width={240} height={240} alt="" />
            </div>
          </article>
          <p className={cModule.subTitle}>コーディネートアイテム</p>
          <div className={cModule.price}>
            <p className={cModule.total}>TOTAL</p>
            <p className={cModule.totalPrice}>¥{total}</p>
          </div>
          <div className={cModule.cardList}>
            {newItems.map((item, index) => (
              <>
                <div key={index} className={cModule.card}>
                  <Link href="">
                    <Image
                      src={item.url}
                      width={150}
                      height={150}
                      alt=""
                    />
                    <div className={cModule.cardDetail}>
                      <p>{item.name}</p>
                      <div className={cModule.cardContents}>
                        <p>¥{item.price}</p>
                        <p className={cModule.priceFree}>送料無料</p>
                      </div>
                    </div>
                  </Link>
                </div>
              </>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
