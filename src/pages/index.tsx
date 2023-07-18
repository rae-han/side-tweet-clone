import { useUserSection } from '@/hooks/user';

const HomePage = () => {
  const data = useUserSection();

  console.log(data);

  if (data) {
  }

  return <div>main</div>;
};

export default HomePage;
