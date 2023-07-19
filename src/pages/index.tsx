import { GetServerSideProps } from 'next';

import { useUserSection } from '@/hooks/user';
import DefaultLayout from '@layouts/DefaultLayout';

const HomePage = () => {
  const { data, isLoading, error } = useUserSection();

  console.log({ data, isLoading, error });
  console.log(data);

  // if (data) {
  // }

  return <DefaultLayout>main</DefaultLayout>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  return { props: {} };
};

export default HomePage;
