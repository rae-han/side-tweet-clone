import { withIronSessionApiRoute } from 'iron-session/next';

import { COOKIE_SNOWFLAKE } from '@/constants/env';

declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const cookieOptions = {
  cookieName: 'tweetsession',
  password: COOKIE_SNOWFLAKE,
};

const withApiSession = (fn: any) => {
  return withIronSessionApiRoute(fn, cookieOptions);
};

export default withApiSession;
