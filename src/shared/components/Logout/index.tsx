import { Flex, Button } from '@chakra-ui/react';
import { useAppDispatch } from '../../../stores/hook';
import { logout } from '../../../stores/users/userSlice';

const Logout = () => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Flex justifyContent={'flex-end'} w={'100%'} mt={2}>
      <Button onClick={handleLogout}>Logout</Button>
    </Flex>
  );
};

export default Logout;
