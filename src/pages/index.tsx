import { GetServerSideProps } from 'next';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useUserSection } from '@/hooks/user';
import DefaultLayout from '@layouts/DefaultLayout';
import PostSubmitFormBox from '@components/Post/SubmitFormBox';
import Button from '@components/Button';
import { usePosts } from '@hooks/post';
import PostList from '@components/Post/List';

const HomePage = () => {
  // const { data, isLoading, error } = useUserSection();
  //
  // console.log({ data, isLoading, error });
  // console.log(data);

  // if (data) {
  // }

  return (
    <DefaultLayout>
      <PostSubmitFormBox></PostSubmitFormBox>
      <PostList></PostList>
    </DefaultLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return { props: {} };
};

export default HomePage;
