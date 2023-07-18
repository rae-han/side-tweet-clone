import type { NextApiRequest, NextApiResponse } from 'next';
import withApiSession from '@/libs/withApiSession';
import prismaClient from '@/db/prismaClient';

interface ResponseType {
  ok: boolean;
  error?: {
    code: number;
    message: string;
  };
}

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseType>) => {
  console.log('user register');
  const { email, password } = req.body;

  const isExist = await prismaClient.user.findUnique({
    where: { email },
  });

  if (isExist) {
    return res.status(412).json({
      ok: true,
      error: {
        code: 412,
        message: '이미 존재하는 이메일 입니다.',
      },
    });
  }

  const result = await prismaClient?.user.create({
    data: {
      email,
      name: 'anonymous',
      password,
    },
  });

  res.status(200).json({ ok: true });
};

export default withApiSession(handler);
