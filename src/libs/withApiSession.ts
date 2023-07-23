import { withIronSessionApiRoute } from 'iron-session/next';

import { COOKIE_NAME, COOKIE_SNOWFLAKE } from '@/constants/env';

declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const cookieOptions = {
  cookieName: COOKIE_NAME,
  password: COOKIE_SNOWFLAKE,
};

const withApiSession = (fn: any) => {
  return withIronSessionApiRoute(fn, cookieOptions);
};

export default withApiSession;
