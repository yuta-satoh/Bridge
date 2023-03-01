import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import Router from 'next/router';
import { useEffect } from 'react';
import { useState } from 'react';

const Auth = ({ children }: { children: React.ReactElement }) => {
  const router = useRouter();
  const signIn = Cookies.get('status');

  useEffect(() => {
    if (signIn !== 'true') router.replace('/login');
  });

  return children;
};
export default Auth;
