import { RootState } from '../../stores';
import { useAppSelector } from '../../stores/hook';
import Authenticated from './Authenticated';
import Unauthenticated from './Unauthenticated';

const Home = () => {
  const { user } = useAppSelector((state: RootState) => state.user);

  return <>{user?.email ? <Authenticated /> : <Unauthenticated />}</>;
};

export default Home;
