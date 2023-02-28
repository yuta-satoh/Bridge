import Head from "next/head";
import { GetServerSideProps } from "next";
import UserCart from "@/components/UserCart";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const userId = ctx.req.cookies['id']

  if (userId === undefined) {
    return {
      props: {},
    };
  }
  return {
    props: { userId },
  };
}

export default function Cart({ userId }: { userId: string }) {
  if (userId) {
    return (
      <>
        <Head>
          <title>カート</title>
        </Head>
        <UserCart userId={userId} />
      </>
    )
  } else {
    return <div>ログインして下さい</div>
  }
}
