import useSWR from 'swr';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Post, User } from '@prisma/client';

export const POSTS_KEY = `/api/posts`;

interface UseSwrResult<T> {
  data: T;
  isLoading: boolean;
  error: object;
}

export interface PostsResult {
  ok: boolean;
  code: number;
  message: string;
  posts: (Post & { User: User })[];
}

export const usePosts = () => {
  const router = useRouter();
  const [state, setState] = useState<PostsResult>();
  const { data, isLoading, error, mutate } = useSWR<PostsResult>(POSTS_KEY);

  return { data: data?.posts, error, isLoading, mutate };
};
