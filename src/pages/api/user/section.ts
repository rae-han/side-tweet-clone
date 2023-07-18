import type { NextApiRequest, NextApiResponse } from 'next'
import withApiSession from "@/libs/withApiSession";

interface ResponseType {
  ok: boolean;
  session: null;
}

const handler = (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  console.log('user session')
  const session = null;
  res.status(200).json({ ok: true, session  })
}

export default withApiSession(handler)
