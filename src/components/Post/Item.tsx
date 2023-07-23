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
    <li>
      <Link href={`/post/${post.id}`}>
        <p>{post.value}</p>
      </Link>
      <span>{post.id}</span>
      <span>{post.User.name}</span>
      {post?.isLike ? (
        <button onClick={onToggleLike}>좋아요 취소</button>
      ) : (
        <button onClick={onToggleLike}>좋아요</button>
      )}
    </li>
  );
};

export default React.memo(PostItem);
