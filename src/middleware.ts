import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();
  // アクセスしたURLが/で始まる部分（全て）で認証
  if (req.nextUrl.pathname.startsWith('/')) {
    const authorizationHeader = req.headers.get('authorization');
    const url = req.nextUrl;
    // const cookie = req.cookies.get('id')?.value;
    // if (cookie) {
    //   return res
    // }

    if (authorizationHeader) {
      const basicAuth = authorizationHeader.split(' ')[1];
      const [user, password] = atob(basicAuth).split(':');
      // 環境変数に設定したユーザーとパスワードを判定
      if (
        user === process.env.BASIC_AUTH_USER &&
        password === process.env.BASIC_AUTH_PASSWORD
      ) {
        return res
      }
      // const judge = await midLogin(email, password);
      // if (judge !== 'false') {
      //   res.cookies.set('status', 'true');
      //   res.cookies.set('id', `${judge}`);
      //   return res;
      // }
    }

    url.pathname = '/api/auth';
    return NextResponse.rewrite(url);
  }
  return res
};

// export const config = {
//   matcher: ['/', '/index'],
// };
