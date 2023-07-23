import { User } from '@prisma/client';

import type { NextApiRequest, NextApiResponse } from 'next';
import withApiSession from '@libs/withApiSession';
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

  if (req.method === 'POST') {
    const {
      body,
      session: { user },
      query: { postId },
    } = req;

    if (!user || !postId) {
      return res.status(400).json({ ok: false, code: 400, message: 'failure' });
    }

    const isExist = await prismaClient.like.findFirst({
      where: {
        postId: parseInt(postId.toString(), 10),
        userId: user?.id,
      },
    });

    console.log(isExist);

    if (isExist) {
      await prismaClient.like.delete({
        where: {
          id: isExist.id,
        },
      });
    } else {
      await prismaClient.like.create({
        data: {
          User: {
            connect: {
              id: user?.id,
            },
          },
          Post: {
            connect: {
              id: parseInt(postId.toString(), 10),
            },
          },
        },
      });
    }

    return res.status(200).json({ ok: true, code: 200, message: 'success' });
  }

  if (req.method === 'DELETE') {
    return res.status(200).json({ ok: true, code: 200, message: 'success' });
  }
};

export default withApiSession(
  withHandler({
    methods: ['GET', 'PATCH', 'POST', 'DELETE'],
    handler,
    isPrivate: false,
  }),
);
