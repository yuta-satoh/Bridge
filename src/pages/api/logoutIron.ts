import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '@/lib/session';
import { NextApiRequest, NextApiResponse } from 'next';

export default withIronSessionApiRoute(handler, sessionOptions);
function handler(req: NextApiRequest, res: NextApiResponse) {
  req.session.destroy()
  // await req.session.save();
  res.setHeader("cache-control", "no-store, max-age=0");
  res.send({ ok: true });
}
