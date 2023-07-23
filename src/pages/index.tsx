import { GetServerSideProps } from 'next';

import DefaultLayout from '@layouts/DefaultLayout';
import PostSubmitFormBox from '@components/Post/SubmitFormBox';
import PostList from '@components/Post/List';

const HomePage = () => {
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
