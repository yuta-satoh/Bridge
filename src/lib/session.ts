import type { IronSessionOptions } from 'iron-session';
import { withIronSessionSsr } from 'iron-session/next';
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';

export const sessionOptions: IronSessionOptions = {
  password: process.env.COOKIE_PASSWORD as string,
  cookieName: process.env.COOKIE_NAME as string,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};
/**
 * User
 */
export type UserId = {
  user: string;
};

/**
 * email
 */
export type Email = {
  email: string;
};

/**
 * status
 */
export type Status = {
  status: string;
};

declare module 'iron-session' {
  interface IronSessionData {
    user?: UserId;
    email?: Email;
    status?: Status;
  }
}

/**
 * User object that indicates not logged in
 */
export const NullUser: UserId = {
  user: '',
};
/**
 * Email object that indicates not logged in
 */
export const NullEmail: Email = {
  email: '',
};
/**
 * Email object that indicates not logged in
 */
export const NullStatus: Status = {
  status: '',
};

/**
 * Create getServerSideProps function with current logged in user.
 * @param redirectIfUnauthenticatedTo redirect url on unauthencated
 * @param handler additional props handler
 * @returns getServerSideProps function
 * @example export const getServerSideProps = withUserSessionSsr("/login");
 */
export function withUserSessionSsr<
  P extends {
    [key: string]: unknown;
    user?: UserId | undefined;
    redirectIfUnauthenticatedTo?: string;
  }
>(
  redirectIfUnauthenticatedTo: string,
  handler?: (
    context: GetServerSidePropsContext
  ) =>
    | GetServerSidePropsResult<P>
    | Promise<GetServerSidePropsResult<P>>
): (
  context: GetServerSidePropsContext
) => Promise<GetServerSidePropsResult<P>> {
  return withIronSessionSsr(
    async (ctx: GetServerSidePropsContext) => {
      const { req } = ctx;
      const user = req.session.user;
      if (!user) {
        console.warn(
          'Not authenticated. Redirecting to login page...'
        );
        return {
          redirect: {
            statusCode: 302,
            destination: redirectIfUnauthenticatedTo,
            basePath: false,
          },
        };
      }
      if (handler) {
        const result = await handler(ctx);
        if ('props' in result) {
          result.props = { user } as P;
        }
        return result;
      } else {
        return {
          props: { user },
        } as GetServerSidePropsResult<P>;
      }
    },
    sessionOptions
  );
}
