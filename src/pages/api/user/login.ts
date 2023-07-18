import type { NextApiRequest, NextApiResponse } from 'next';
import withApiSession from '@/libs/withApiSession';
import prismaClient from '@apis/prismaClient';

interface ResponseType {
  ok: boolean;
  code: number;
  message: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseType>) => {
  console.log('user register');
  const { email, password } = req.body;

  const user = await prismaClient.user.findUnique({
    where: { email, password },
  });

  if (!user) {
    return res.status(404).json({
      ok: true,
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

export default withApiSession(handler);
