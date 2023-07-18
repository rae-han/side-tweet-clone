import { useUserSection } from '@/hooks/user';

const HomePage = () => {
  const { data, isLoading, error } = useUserSection();

  console.log({ data, isLoading, error });

  if (data) {
  }

  return <div>main</div>;
};

export default HomePage;
