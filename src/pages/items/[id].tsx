import ItemList from '@/components/ItemList';
import Head from 'next/head';
import Link from 'next/link';
// import Layout from ;


export default function ItemPage() {
    return(
        <>
        <Head>
            <title>商品詳細</title>
        </Head>
        <main>
        <nav>
            <ol className="breadcrumbs">
                <li><Link href="/">TOPページ</Link></li>
                <li><Link href="/items">商品一覧ページ</Link></li>
                <li>全身姿見</li>
            </ol>
        </nav>
            <div>
                <div>
            <ItemList />
                </div>
            </div>
            <form>
          <div>
            <select name="selectGenre" id="selectGenre">
              <option value="">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <button type="button">カートに追加</button>
        </form>
        </main>
        </>

    );
}
