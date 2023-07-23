import React from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm, UseFormRegister } from 'react-hook-form';
import useSWRMutation from 'swr/mutation';

import Textarea from '@components/Textarea';
import Button from '@components/Button';
import useMutation from '@hooks/useMutation';
import { usePosts } from '@hooks/post';

interface FormValues {
  value: string;
}

const PostSubmitFormBox = () => {
  const { register, handleSubmit, setValue } = useForm<FormValues>();
  const { mutate: postsMutate } = usePosts();
  const { mutation } = useMutation(`/api/post`, 'POST');

  const onValid: SubmitHandler<FormValues> = (data) => {
    mutation(data);
    postsMutate((prev) => {
      if (!prev) {
        return prev;
      }

      return {
        ...prev,
        posts: [
          {
            id: Date.now(),
            value: data.value,
            User: {
              email: '',
              name: 'anonymous',
            },
            Like: [],
            isLike: false,
          },
          ...prev.posts,
        ],
      };
    });
    setValue('value', '');
  };

  return (
    <form onSubmit={handleSubmit(onValid)} className="max-w-xl m-auto">
      <textarea
        className="text-slate-950 w-full h-20 rounded-xl p-4"
        {...register('value', { required: true })}
        placeholder="트윗을 입력하세요."
      />
      <Button type="submit" styles={{ width: 'full' }}>
        Create a Tweet
      </Button>
    </form>
  );
};

export default PostSubmitFormBox;
