import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function App({ Component, pageProps }: AppProps) {
  const [auth, setAuth] = useState<boolean>();
  useEffect(() => {
    const status = Cookies.get('status');
    if (status === 'true' && auth === true) {
      return;
    } else if (status === 'true' && auth !== true) {
      setAuth(true);
    } else {
      setAuth(false); 
    }
  });
  return (
    <>
      <Header auth={auth}/>
      <Component {...pageProps} />
      <Footer/>
    </>
  )
}
