import { NextResponse, NextFetchEvent } from 'next/server';

import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export const middleware = (req: NextRequest, evt: NextFetchEvent) => {
  console.log('global _middleware');
  console.log('tweetsession', req.cookies.has('tweetsession'));
  // return NextResponse.redirect(new URL('/home', request.url))

  console.log(req.url);
  console.log(req.url.includes('/user'));
  if (!req.cookies.has('tweetsession') && !req.url.includes('/user')) {
    req.nextUrl.searchParams.set('from', req.nextUrl.pathname);
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
