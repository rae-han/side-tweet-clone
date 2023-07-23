import React from 'react';

import DefaultLayout from '@layouts/DefaultLayout';
import { usePost } from '@hooks/post';

const PostPage = () => {
  const { data, isLoading } = usePost();

  if (!data && isLoading) {
    return <div>loading...</div>;
  }

  return (
    <DefaultLayout>
      <h2>{data?.post.User.email}</h2>
      <p>{data?.post.value}</p>
    </DefaultLayout>
  );
};

export default PostPage;
