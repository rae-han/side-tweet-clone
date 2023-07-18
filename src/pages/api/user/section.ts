import type { NextApiRequest, NextApiResponse } from 'next';
import withApiSession from '@/libs/withApiSession';
import { IronSession } from 'iron-session';

interface ResponseType {
  ok: boolean;
  session: IronSession | null;
}

const handler = (req: NextApiRequest, res: NextApiResponse<ResponseType>) => {
  const session = req.session;
  res.status(200).json({ ok: true, session });
};

export default withApiSession(handler);
