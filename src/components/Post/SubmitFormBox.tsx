import React from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm, UseFormRegister } from 'react-hook-form';

import Textarea from '@components/Textarea';
import Button from '@components/Button';
import useSWRMutation from 'swr/mutation';
import useMutation from '@hooks/useMutation';
import { usePosts } from '@hooks/post';

interface FormValues {
  value: string;
}

const PostSubmitFormBox = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const { mutate: postsMutate } = usePosts();
  const { mutation } = useMutation(`/api/post`, 'POST');

  const onValid: SubmitHandler<FormValues> = (data) => {
    mutation(data);
    postsMutate();
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <textarea className="text-slate-950" {...register('value', { required: true })} />
      <Button type="submit">Create a Tweet</Button>
    </form>
  );
};

export default PostSubmitFormBox;
