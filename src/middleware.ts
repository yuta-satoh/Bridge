import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { midLogin } from './lib/getUSer';

export const middleware = async (req: NextRequest) => {
  const authorizationHeader = req.headers.get('authorization');
  const cookie = req.cookies.get('id')?.value;
  const url = req.nextUrl;
  const res = NextResponse.next()

  // if (cookie) {
  //   return res
  // }

  if (authorizationHeader) {
    const basicAuth = authorizationHeader.split(' ')[1];
    const [user, password] = atob(basicAuth).split(':');

    if (
      user === process.env.BASIC_AUTH_USER &&
      password === process.env.BASIC_AUTH_PASSWORD
    ) {
      return NextResponse.next()
    }
    // const judge = await midLogin(email, password);
    // console.log(judge);

    // if (judge !== 'false') {
    //   res.cookies.set('status', 'true');
    //   res.cookies.set('id', `${judge}`);
    //   return res;
    // }
  }

  url.pathname = '/api/auth';
  return NextResponse.rewrite(url);

};

export const config = {
  matcher: [ '/:path*'],
};
