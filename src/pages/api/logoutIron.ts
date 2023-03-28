import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '@/lib/session';
import { NextApiRequest, NextApiResponse } from 'next';

export default withIronSessionApiRoute(handler, sessionOptions);
async function handler(req: NextApiRequest, res: NextApiResponse) {
  req.session.user = { user: '' };
  await req.session.save();
  // res.send({ ok: true });
}
