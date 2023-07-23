import React from 'react';

import { usePosts } from '@hooks/post';
import PostItem from '@components/Post/Item';

const PostList = () => {
  const { data: posts, isLoading: isPostsLoading, error: postsError } = usePosts();
  console.log({ posts });

  return (
    <ul className="max-w-xl m-auto my-4">
      {posts?.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </ul>
  );
};

export default PostList;
