import { NextResponse, NextFetchEvent } from 'next/server';

import type { NextRequest } from 'next/server';
import { COOKIE_NAME } from '@/constants/env';

// This function can be marked `async` if using `await` inside
export const middleware = (req: NextRequest, evt: NextFetchEvent) => {
  console.log('global _middleware');
  console.log(COOKIE_NAME, req.cookies.get(COOKIE_NAME));
  // return NextResponse.redirect(new URL('/home', request.url))

  console.log(req.url);
  console.log(req.url.includes('/user'));
  if (!req.cookies.get(COOKIE_NAME)?.value && !req.url.includes('/user')) {
    // req.nextUrl.searchParams.set('from', req.nextUrl.pathname);
    req.nextUrl.pathname = '/user/login';
    return NextResponse.redirect(req.nextUrl);
  }
};

// export const config = {
//   matcher: '/*',
// };
export const config = {
  matcher: ['/((?!api|_next/static|favicon.ico).*)'],
};
