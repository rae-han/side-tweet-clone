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
  confirmPassword: string;
}

const FormSchema: FormSchemaType[] = [
  { type: 'email', key: 'email', defaultValue: 'qwer@asdf.com', options: { required: 'Email을 입력해주세요.' } },
  { type: 'password', key: 'password', defaultValue: '1234', options: { required: '비밀번호를 입력해주세요.' } },
  {
    type: 'password',
    key: 'confirmPassword',
    defaultValue: '1234',
    options: { required: '비밀번호를 한번 더 입력해주세요.' },
  },
];

const RegisterPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<FormValues>();
  const { mutation, result } = useMutation<any>(`/api/user/register`);
  console.log(result);

  const onValid: SubmitHandler<FormValues> = (data) => {
    const { email, password } = data;
    mutation({ email, password });
  };

  const onInvalid: SubmitErrorHandler<FormValues> = (data) => {
    console.log(data);
  };

  useEffect(() => {
    if (result?.ok && result?.code === 200) {
      router.replace(`/user/login`);
    }
  }, [result, router]);

  return (
    <UserSectionLayout>
      <div>
        <form onSubmit={handleSubmit(onValid, onInvalid)}>
          {FormSchema.map((item) => (
            <Input key={item.key} schema={item} register={register} />
          ))}
          <button type="submit">가입</button>
        </form>
        <button type="button">로그인 페이지로 돌아가기</button>
      </div>
    </UserSectionLayout>
  );
};

export default RegisterPage;
