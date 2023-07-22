import { Post, User } from '@prisma/client';

import type { NextApiRequest, NextApiResponse } from 'next';
import withApiSession from '@/libs/withApiSession';
import prismaClient from '@apis/prismaClient';
import withHandler from '@libs/withHandler';

interface ResponseType {
  ok: boolean;
  userId?: number | undefined;
  code: number;
  message: string;
  posts?: Post[];
  postId?: number;
  error?: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseType>) => {
  console.log(req.method);

  if (req.method === 'GET') {
    const { user } = req.session;
    console.log(123, user);

    const posts = await prismaClient.post.findMany({
      include: {
        User: {
          select: {
            email: true,
            name: true,
          },
        },
        Like: {
          where: {
            userId: user?.id,
          },
          select: {
            id: true,
          },
        },
      },
      orderBy: [{ id: 'desc' }],
    });
    console.log(posts);

    return res.status(200).json({
      ok: true,
      code: 200,
      message: 'success',
      posts,
    });
  }
};

export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
  }),
);
