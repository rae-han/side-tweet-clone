import React from 'react';
import { Like, Post, User } from '@prisma/client';
import Link from 'next/link';

import useMutation from '@hooks/useMutation';
import { usePosts } from '@hooks/post';
import { PostsResponse, PostsResult } from '@typings/db';

interface Props {
  post: PostsResult;
}

const PostItem = ({ post }: Props) => {
  const { mutation: postLikeMutate } = useMutation(`/api/post/${post.id}/like`, 'POST');
  const { mutate } = usePosts();
  const onToggleLike = () => {
    postLikeMutate({});
    mutate((prev) => {
      if (!prev) {
        return prev;
      }

      const next = {
        ...prev,
        posts: prev.posts.map((item) => (item.id === post.id ? { ...item, isLike: !item.isLike } : item)),
      };

      return next;
    }, false);
  };

  return (
    <li className="mt-2 bg-slate-800 p-4 rounded-md">
      <Link href={`/post/${post.id}`}>
        <p className="text-lg font-bold">{post.value}</p>
        <h2 className="text-slate-200">{post.User.name}</h2>
      </Link>
      {post?.isLike ? (
        <button className="w-full mt-2 h-8 bg-red-800 rounded-lg font-bold" onClick={onToggleLike}>
          ♡
        </button>
      ) : (
        <button className="w-full mt-2 h-8 bg-slate-700 rounded-lg font-bold" onClick={onToggleLike}>
          ♡
        </button>
      )}
    </li>
  );
};

export default React.memo(PostItem);
