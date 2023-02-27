import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import cModule from '../styles/coordination.module.css';
import Cookies from 'js-cookie';
import { type } from 'os';

type items = {
  id: number;
  name: string;
  genre: string;
  category: string;
  price: number;
  imgurl: string;
}[];
type item = {
  id: number;
  name: string;
  genre: string;
  category: string;
  price: number;
  imgurl: string;
};
export default function Generator(props: { request: items }) {
  // ダミーデータ
  const kaguData = {
    url: '/images/accessory/accessory_nordic_3.jpeg',
    name: 'アニマルスツール',
    price: 5000,
  };

  const total = props.request.reduce(function (sum, element) {
    return sum + element.price;
  }, 0);

  const curtain = [];
  const light = [];
  const chair = [];
  const chest = [];
  const table = [];
  const rug = [];
  const bed = [];
  const sofa = [];
  const accessory = [];
  

  const url = '/images/accessory/accessory_nordic_3.jpeg';
  console.log(props.request);
  return (
    <>
      <div>
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
            {props.request.map((item) => (
              <>
                <div key={item.id} className={cModule.card}>
                  <Link href="">
                    <Image
                      src={item.imgurl}
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
