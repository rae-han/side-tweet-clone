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

    const likedPosts = await prismaClient.like.findMany({
      where: {
        userId: user?.id,
      },
      select: {
        postId: true,
      },
    });
    const likedPostsId: { [key: string]: boolean } = likedPosts.reduce((acc, cur) => {
      return { ...acc, [cur.postId]: true };
    }, {});

    const postsWithIsLike = posts.map((post) => ({
      ...post,
      isLike: likedPostsId[post.id.toString()] ?? false,
    }));
    // console.log(postsWithIsLike);

    return res.status(200).json({
      ok: true,
      code: 200,
      message: 'success',
      posts: postsWithIsLike,
    });
  }
};

export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
  }),
);
