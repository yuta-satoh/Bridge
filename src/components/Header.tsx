import Image from 'next/image';
import Link from 'next/link';
import headModule from '../styles/header.module.css';
import Cookies from 'js-cookie';

export default function Header() {
  function status() {
    const status = Cookies.get('status');
    if (status === 'true') {
      return true;
    }
    return false;
  }
  const auth = status();

  console.log(status);
  return (
    <header
      className={`${headModule.body} h-28 w-screen bg-orange-900`}
    >
      <div
        className={`${headModule.menu} flex items-center justify-center h-20 w-screen bg-white absolute top-8`}
      >
        <Link href={'/'}>
          <div>
            <Image
              src="/images/logo/header_logo.png"
              alt="bridge-logo"
              width={150}
              height={80}
            />
          </div>
        </Link>
        <ul className="flex gap-10 mr-60 ml-30">
          <li>商品</li>
          <li>お知らせ</li>
          <li>ヘルプ</li>
        </ul>
        <div className="flex gap-10">
          <form className={headModule.form}>
            <input
              className="h-8 border border-neutral-500 rounded-l pl-2.5"
              type="text"
              placeholder="何をお探しですか？"
            />
            <button
              className="h-8 text-white bg-neutral-900 border border-neutral-900 rounded-r px-1"
              type="submit"
            >
              検索
            </button>
          </form>
          {auth ? (
            <Link href={'/mypage'} className={headModule.iconModule}>
              <Image
                src="/images/icon/login.png"
                alt=""
                width={25}
                height={25}
              />
              <div>
                <span
                  className={`${headModule.menuLabel} inline-block mt-1`}
                >
                  マイページ
                </span>
              </div>
            </Link>
          ) : (
            <Link href={'/login'} className={headModule.iconModule}>
              <Image
                src="/images/icon/login.png"
                alt=""
                width={25}
                height={25}
              />
              <div>
                <span
                  className={`${headModule.menuLabel} inline-block mt-1`}
                >
                  ログイン
                </span>
              </div>
            </Link>
          )}
          <Link href={'/cart'} className={headModule.iconModule}>
            <Image
              src="/images/icon/cart.png"
              alt=""
              width={25}
              height={25}
            />
            <div>
              <span
                className={`${headModule.menuLabel} inline-block mt-1`}
              >
                カート
              </span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
