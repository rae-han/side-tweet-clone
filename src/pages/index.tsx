import { GetServerSideProps } from 'next';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useUserSection } from '@/hooks/user';
import DefaultLayout from '@layouts/DefaultLayout';
import PostSubmitFormBox from '@components/Post/SubmitFormBox';
import Button from '@components/Button';

interface FormValues {
  text: string;
}

const HomePage = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const { data, isLoading, error } = useUserSection();

  console.log({ data, isLoading, error });
  console.log(data);

  const onValid = (data: SubmitHandler<FormValues>) => {
    console.log(data);
  };

  // if (data) {
  // }

  return (
    <DefaultLayout>
      <form onSubmit={handleSubmit(onValid)}>
        <PostSubmitFormBox register={register}></PostSubmitFormBox>
        <Button type="submit">Create a Tweet</Button>
      </form>
    </DefaultLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return { props: {} };
};

export default HomePage;
