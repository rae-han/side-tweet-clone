import type { NextApiRequest, NextApiResponse } from 'next';
import withApiSession from '@/libs/withApiSession';
import prismaClient from '@apis/prismaClient';
import withHandler from '@libs/withHandler';

interface ResponseType {
  ok: boolean;
  code: number;
  message: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseType>) => {
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
};

export default withApiSession(
  withHandler({
    methods: ['POST'],
    handler,
    isPrivate: false,
  }),
);
