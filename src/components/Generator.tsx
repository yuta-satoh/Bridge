import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import cModule from '../styles/coordination.module.css';
import Cookies from 'js-cookie';
import { type } from 'os';
import ItemList from './ItemList';
import { setURL } from '@/pages/lib/generatorFn';
import { sum } from '@/pages/lib/generatorFn';

type items = {
  id: number;
  name: string;
  genre: string;
  category: string;
  price: number;
  imgurl: string;
}[];
type url = {
  curtain: string;
  light: string;
  chair: string;
  chest: string;
  table: string;
  rug: string;
  bed: string;
  sofa: string;
  accessory: string;
};
export default function Generator(props: {
  list: items;
  urlData: url;
}) {
  const listItem = props.list[0];
  const total = sum(listItem, props.list);
  const list = props.list
  const urlData = props.urlData

  return (
    <>
      <div>
        <section className={cModule.linkItems}>
          <article className={cModule.coordinateArea}>
            <div className={cModule.empty}></div>
            <div className={cModule.images_b} id="curtain">
              <Image
                src={urlData.curtain}
                width={240}
                height={240}
                alt=""
                className={cModule.display}
              />
            </div>
            <div className={cModule.images_b} id="light">
              <Image
                src={urlData.light}
                width={240}
                height={240}
                alt=""
                className={cModule.display}
              />
            </div>
            <div className={cModule.images_c} id="chair">
              <Image
                src={urlData.chair}
                width={240}
                height={240}
                alt=""
                className={cModule.display}
              />
            </div>
            <div className={cModule.images} id="chest">
              <Image
                src={urlData.chest}
                width={240}
                height={240}
                alt=""
                className={cModule.display}
              />
            </div>
            <div className={cModule.images_b} id="table">
              <Image
                src={urlData.table}
                width={240}
                height={240}
                alt=""
                className={cModule.display}
              />
            </div>
            <div className={cModule.images_b} id="rug">
              <Image
                src={urlData.rug}
                width={240}
                height={240}
                alt=""
                className={cModule.display}
              />
            </div>
            <div className={cModule.images_c} id="bed">
              <Image
                src={urlData.bed}
                width={240}
                height={240}
                alt=""
                className={cModule.display}
              />
            </div>
            <div className={cModule.empty}></div>
            <div className={cModule.images_b} id="sofa">
              <Image
                src={urlData.sofa}
                width={240}
                height={240}
                alt=""
                className={cModule.display}
              />
            </div>
            <div className={cModule.empty}></div>
            <div className={cModule.images_c} id="accessory">
              <Image
                src={urlData.accessory}
                width={240}
                height={240}
                alt=""
                className={cModule.display}
              />
            </div>
          </article>
          <p className={cModule.subTitle}>コーディネートアイテム</p>
          <div className={cModule.price}>
            <p className={cModule.total}>TOTAL</p>
            <p className={cModule.totalPrice}>¥{total}</p>
          </div>
          <div className={cModule.cardList}>
            {list.map((item) => {
              if (listItem === undefined) {
                return null;
              }
              return (
                <>
                  <div key={item.id} className={cModule.card}>
                    <Link href="">
                      <Image
                        src={item.imgurl}
                        width={150}
                        height={150}
                        alt=""
                        className={cModule.image}
                      />
                      <div className={cModule.cardDetail}>
                        <p>{item.name}</p>
                        <div className={cModule.cardContents}>
                          <p>¥{item.price}</p>
                          <p className={cModule.priceFree}>
                            送料無料
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}
