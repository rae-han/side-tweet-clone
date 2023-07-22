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
  postId?: number;
  error?: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseType>) => {
  console.log(req.method);

  if (req.method === 'GET') {
  }

  if (req.method === 'POST') {
    const {
      body: { value },
      session: { user },
    } = req;

    const post = await prismaClient.post.create({
      data: {
        value,
        User: {
          connect: {
            id: user?.id,
          },
        },
        Like: {},
      },
    });

    console.log(post);

    return res.status(200).json({ ok: true, code: 200, message: 'success', postId: post.id });
  }

  if (req.method === 'DELETE') {
    if (!req.session.user) {
      return res.status(400).json({ ok: false, code: 400, message: 'error', error: 'error' });
    }

    await req.session.destroy();
    console.log(req.session.user);

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
