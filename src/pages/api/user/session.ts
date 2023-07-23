import { User } from '@prisma/client';

import type { NextApiRequest, NextApiResponse } from 'next';
import withApiSession from '@/libs/withApiSession';
import prismaClient from '@apis/prismaClient';
import withHandler from '@libs/withHandler';

interface ResponseType {
  ok: boolean;
  userId?: number | undefined;
  code: number;
  message: string;
  error?: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseType>) => {
  console.log(req.method);

  if (req.method === 'GET') {
    if (!req.session.user) {
      return res.status(401).json({ ok: false, code: 401, message: 'Unauthorized', error: 'Please log in.' });
    }

    const user = await prismaClient.user.findUnique({
      where: { id: req.session.user?.id },
    });

    if (!user) {
      return res.status(401).json({ ok: false, code: 401, message: 'Unauthorized' });
    }

    return res.status(200).json({ ok: true, code: 200, message: 'success', userId: user?.id });
  }

  if (req.method === 'POST') {
    const { email, password } = req.body;

    const user = await prismaClient.user.findUnique({
      where: { email, password },
    });

    if (!user) {
      return res.status(404).json({
        ok: false,
        code: 404,
        message: 'Not Found',
      });
    }

    req.session.user = {
      id: user.id,
    };
    await req.session.save();

    return res.status(200).json({ ok: true, code: 200, message: 'success' });
  }

  if (req.method === 'DELETE') {
    if (!req.session.user) {
      return res.status(400).json({ ok: false, code: 400, message: 'error', error: 'error' });
    }

    await req.session.destroy();

    return res.status(200).json({ ok: true, code: 200, message: 'success' });
  }
};

export default withApiSession(
  withHandler({
    methods: ['GET', 'POST', 'DELETE'],
    handler,
    isPrivate: false,
  }),
);
