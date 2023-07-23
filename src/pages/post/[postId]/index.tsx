import React from 'react';

import DefaultLayout from '@layouts/DefaultLayout';
import { usePost } from '@hooks/post';
import useMutation from '@hooks/useMutation';

const PostPage = () => {
  const { data, isLoading, mutate } = usePost();
  const { mutation: postLikeMutate } = useMutation(`/api/post/${data?.post.id}/like`, 'POST');

  const onToggleLike = () => {
    postLikeMutate({});
    mutate((prev) => {
      if (!prev) {
        return prev;
      }

      return {
        ...prev,
        post: {
          ...prev.post,
          Like: prev.post.Like.length === 1 ? [] : [{}],
        },
      };
    });
  };

  if (!data?.post && isLoading) {
    return <div>loading...</div>;
  }

  return (
    <DefaultLayout>
      <p className="max-w-xl mx-auto font-bold text-lg">{data?.post.value}</p>
      <h3 className="max-w-xl mt-2 mx-auto text-slate-200">{data?.post.User.name}</h3>
      <h2 className="max-w-xl mt-2 mx-auto text-slate-200">{data?.post.User.email}</h2>
      <div className="max-w-xl mx-auto">
        {data?.post?.Like?.length === 1 ? (
          <button className="w-full mt-2 h-8 bg-red-800 rounded-lg font-bold" onClick={onToggleLike}>
            ♡
          </button>
        ) : (
          <button className="w-full mt-2 h-8 bg-slate-700 rounded-lg font-bold" onClick={onToggleLike}>
            ♡
          </button>
        )}
      </div>
    </DefaultLayout>
  );
};

export default PostPage;
