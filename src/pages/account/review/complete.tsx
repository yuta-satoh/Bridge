import prStyles from '../../../styles/postReview.module.css';
import Head from 'next/head';
import Link from 'next/link';

export default function ReviewComplete() {
  return (
    <>
      <Head>
        <title>レビュー投稿完了</title>
      </Head>
      <main className={prStyles.comp_main}>
        <div className={prStyles.comp_body}>
            <p className={prStyles.complete}>
              レビューを投稿しました
            </p>
            <Link href="/account/history" className={prStyles.comp_link}>購入履歴に戻る</Link>
        </div>
      </main>
    </>
  );
}
