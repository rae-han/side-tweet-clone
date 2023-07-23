import React, { useEffect } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

import UserSectionLayout from '@/layouts/UserSectionLayout';
import { FormSchemaType } from '@/typings/form';
import useMutation from '@/hooks/useMutation';
import { useUserSection } from '@hooks/user';
import Button from '@components/Button';

import Input from '@/components/Input';

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

  const { mutation, result } = useMutation<any>(`/api/user/session`);

  const onValid: SubmitHandler<FormValues> = (data) => {
    const { email, password } = data;
    mutation({ email, password });
  };

  const onInvalid: SubmitErrorHandler<FormValues> = (data) => {
    console.log(data);
  };

  const handleRegisterRoute = () => {
    router.push(`/user/register`);
  };

  useEffect(() => {
    console.log(result);
    if (result?.ok && result?.code === 200) {
      router.replace(`/`);
    }
  }, [result, router]);

  // useEffect(() => {
  //   // console.log({ data, isLoading, error });
  // }, [data, isLoading, error]);

  return (
    <UserSectionLayout>
      <h1 className="m-8 font-bold text-sm text-red-400">
        codesandbox 쿠키가 저장 안되는 문제 때문에 새 탭으로 열어서 확인 부탁드립니다.
      </h1>
      <form onSubmit={handleSubmit(onValid, onInvalid)}>
        {FormSchema.map((item) => (
          <Input key={item.key} schema={item} register={register} />
        ))}
        <Button type="submit">Log In</Button>
      </form>
      <Button type="button" onClick={handleRegisterRoute}>
        Register
      </Button>
    </UserSectionLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return { props: {} };
};

export default LoginPage;
