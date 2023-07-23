import useSWR from 'swr';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Post, User } from '@prisma/client';

import { PostResponse, PostsResponse } from '@typings/db';

export const POSTS_KEY = `/api/posts`;
export const POST_KEY = `/api/post`;

interface UseSwrResult<T> {
  data: T;
  isLoading: boolean;
  error: object;
}

// export interface PostsResult {
//   ok: boolean;
//   code: number;
//   message: string;
//   posts: (Post & { User: User })[];
// }

export const usePosts = () => {
  const router = useRouter();
  const [state, setState] = useState<PostsResponse>();
  const { data, isLoading, error, mutate } = useSWR<PostsResponse>(POSTS_KEY);

  return { data: data?.posts, error, isLoading, mutate };
};

export const usePost = () => {
  const router = useRouter();
  const { postId } = router.query;

  return useSWR<PostResponse>(postId ? `${POST_KEY}?postId=${postId}` : null);
};
