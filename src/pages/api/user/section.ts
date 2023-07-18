import { User } from '@prisma/client';

import type { NextApiRequest, NextApiResponse } from 'next';
import withApiSession from '@/libs/withApiSession';
import prismaClient from '@apis/prismaClient';

interface ResponseType {
  ok: boolean;
  userId?: number | undefined;
  code: number;
  message: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseType>) => {
  // if (!req.session.user?.id) {
  //   return res.status(401).json({ ok: false, code: 401, message: 'Unauthorized' });
  // }

  console.log(req.session);
  console.log(req.session.user);

  const user = await prismaClient.user.findUnique({
    where: { id: undefined, email: undefined },
  });

  if (!user) {
    return res.status(401).json({ ok: false, code: 401, message: 'Unauthorized' });
  }

  return res.status(200).json({ ok: true, code: 200, message: 'success', userId: user?.id });
};

export default withApiSession(handler);
