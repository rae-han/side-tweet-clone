import { Like, Post, User } from '@prisma/client';

interface APIResponse {
  ok: boolean;
  code: number;
  message: string;
}

export interface PostsResult extends Post {
  User: User;
  Like: Like[];
  isLike: boolean;
}

export interface PostsResponse extends APIResponse {
  posts: PostsResult[];
}

export interface PostResult extends Post {
  User: User;
  Like: Like[];
  _count: {
    Like: number;
  };
}

export interface PostResponse {
  post: PostResult;
}
