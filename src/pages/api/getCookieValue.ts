import type { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '@/lib/session';

export default withIronSessionApiRoute(handler, sessionOptions);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = req.session.user?.user;

  const judge = () => {
    if (user !== undefined) {
      return user;
    }
    return '';
  };

  const test = judge();

  console.log(user);
  console.log(test);

  res.json(test);
}
