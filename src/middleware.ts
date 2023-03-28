import { sessionOptions } from '@/lib/session';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getIronSession } from 'iron-session/edge';

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();

  const session = await getIronSession(req, res, {
    password: process.env.COOKIE_PASSWORD as string,
    cookieName: process.env.COOKIE_NAME as string,
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  });

  // const user = session.user?.user;
  // console.log(user);

  if (req.nextUrl.pathname.startsWith('/coordinationRes')) {
    // クッキー取得
    const genre = req.cookies.get('genre')?.value;

    console.log(genre);
    // クッキーがあればそのまま進む
    if (
      (genre !== undefined && genre === 'ナチュラル') ||
      genre === '北欧風' ||
      genre === 'フェミニン' ||
      genre === '和モダン'
    ) {
      return res;
    }
    // クッキーが無いもしくは不正だった場合はリダイレクト
    // res.cookies.set('genre', 'ナチュラル');
    return NextResponse.redirect(new URL('/coordination', req.url));
  }

  if (req.nextUrl.pathname.startsWith('/renewPass')) {
    // クッキー取得
    const user = session.email?.email;
    // クッキーがあればそのまま進む
    if (user !== undefined) {
      return res;
    }
    // クッキーがなければ再設定メール送信画面へ遷移
    return NextResponse.redirect(new URL('/rememberPass', req.url));
  }
  
  if (req.nextUrl.pathname.startsWith('/login')) {
    // クッキー取得
    const user = session.user?.user;
    // クッキーがあればマイページへ
    if (user) {
      return NextResponse.redirect(new URL('/mypage', req.url));
    }
    // クッキーがなければログイン画面へ遷移
    return res;
  }


  if (req.nextUrl.pathname.startsWith('/mypage')) {
    // クッキー取得
    const user = session.user?.user;
    // クッキーがあればそのまま進む
    if (user !== undefined) {
      return res;
    }
    // クッキーがなければログイン画面へ遷移
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (req.nextUrl.pathname.startsWith('/account')) {
    // クッキー取得
    const user = session.user?.user;
    // クッキーがあればそのまま進む
    if (user !== undefined) {
      return res;
    }
    // クッキーがなければログイン画面へ遷移
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (req.nextUrl.pathname.startsWith('/purchase')) {
    // クッキー取得
    const user = session.user?.user;
    // クッキーがあればそのまま進む
    if (user !== undefined) {
      return res;
    }
    // クッキーがなければログイン画面へ遷移
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // アクセスしたURLが/で始まる部分（全て）で認証
  if (req.nextUrl.pathname.startsWith('/')) {
    const authorizationHeader = req.headers.get('authorization');
    const url = req.nextUrl;

    if (authorizationHeader) {
      const basicAuth = authorizationHeader.split(' ')[1];
      const [user, password] = atob(basicAuth).split(':');
      // 環境変数に設定したユーザーとパスワードを判定
      if (
        user === process.env.BASIC_AUTH_USER &&
        password === process.env.BASIC_AUTH_PASSWORD
      ) {
        return res;
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
  return res;
};

// export const config = {
//   matcher: ['/', '/index'],
// };
