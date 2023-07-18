import React, { useEffect } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';

import UserSectionLayout from '@/layouts/UserSectionLayout';
import { FormSchemaType } from '@/typings/form';
import useMutation from '@/hooks/useMutation';

import Input from '@/components/Input';
import { useRouter } from 'next/router';

interface FormValues {
  email: string;
  password: string;
}

const FormSchema: FormSchemaType[] = [
  { type: 'email', key: 'email', defaultValue: 'qwer@asdf.com', options: { required: 'Email을 입력해주세요.' } },
  { type: 'password', key: 'password', defaultValue: '1234', options: { required: '비밀번호를 입력해주세요.' } },
];

const LoginPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<FormValues>();
  const { mutation, result } = useMutation<any>(`/api/user/login`);

  const onValid: SubmitHandler<FormValues> = (data) => {
    const { email, password } = data;
    mutation({ email, password });
  };

  const onInvalid: SubmitErrorHandler<FormValues> = (data) => {
    console.log(data);
  };

  useEffect(() => {
    if (result?.ok && result?.code === 200) {
      router.replace(`/`);
    }
  }, [result, router]);

  return (
    <div>
      <form onSubmit={handleSubmit(onValid, onInvalid)}>
        {FormSchema.map((item) => (
          <Input key={item.key} schema={item} register={register} />
        ))}
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default LoginPage;
