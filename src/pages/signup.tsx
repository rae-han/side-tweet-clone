import React from 'react';
import { FieldError, RegisterOptions, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';

import UserSectionLayout from '@/layouts/UserSectionLayout';
import { FormSchemaType } from '@/typings/form';
import useMutation from '@/hooks/useMutation';

import Input from '@/components/Input';

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

const SignupPage = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const { mutation, data } = useMutation<any>(`/api/user/register`);

  const onValid: SubmitHandler<FormValues> = (data) => {
    const { email, password } = data;
    mutation({ email, password });
  };

  const onInvalid: SubmitErrorHandler<FormValues> = (data) => {
    console.log(data);
  };

  console.log(data);

  return (
    <UserSectionLayout>
      <div>
        <form onSubmit={handleSubmit(onValid, onInvalid)}>
          {FormSchema.map((item) => (
            <Input key={item.key} schema={item} register={register} />
          ))}
          <button type="submit">가입</button>
        </form>
      </div>
    </UserSectionLayout>
  );
};

export default SignupPage;
