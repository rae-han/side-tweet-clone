import React from 'react';
import { Post, User } from '@prisma/client';

interface Props {
  post: Post & { User: User };
}

const PostItem = ({ post }: Props) => {
  console.log(post);
  return (
    <li>
      <p>{post.value}</p>
      <span>{post.id}</span>
      <span>{post.User.name}</span>
    </li>
  );
};

export default PostItem;
