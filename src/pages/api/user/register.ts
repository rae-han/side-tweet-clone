import type { NextApiRequest, NextApiResponse } from 'next';
import withApiSession from '@/libs/withApiSession';
import prismaClient from "@apis/prismaClient";

interface ResponseType {
  ok: boolean;
  code: number;
  message: string

}

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseType>) => {
  console.log('user register');
  const { email, password } = req.body;

  const isExist = await prismaClient.user.findUnique({
    where: { email },
  });

  if (isExist) {
    return res.status(409).json({
      ok: true,
      code: 409,
      message: 'Conflict'
    });
  }

  const user = await prismaClient?.user.create({
    data: {
      email,
      name: 'anonymous',
      password,
    },
  });

  console.log(user)

  res.status(200).json({ ok: true, code: 200, message: 'success' });
};

export default withApiSession(handler);
