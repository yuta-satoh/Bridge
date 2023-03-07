import Head from 'next/head';
import Auth from '../auth/auth';

export default function Withdraw() {
  return (
    <>
      <Head>
        <title>退会手続き</title>
      </Head>
      <Auth>
        <main>
          <section>
            <div className="title">退会手続き</div>
          </section>
        </main>
      </Auth>
    </>
  );
}
