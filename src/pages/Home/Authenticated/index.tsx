import { Flex, Box, Heading, Text, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../../stores/hook';
import { RootState } from '../../../stores';
import AccountVerification from '../../../shared/components/AccountVerification';
import MultiFactorAuthentication from '../../../shared/components/MultiFactorAuthentication';

const Authenticated = () => {
  const { user, isLoading, error } = useAppSelector(
    (state: RootState) => state.user
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleToggleMFA = () => {};

  const handleChangePassword = () => {};

  return (
    <Flex w={'100%'} maxW={'3xl'} p={6} flexDir={'column'} gap={4}>
      <Box
        border={'1px'}
        borderColor={'gray.100'}
        rounded={'md'}
        w={'100%'}
        px={5}
        py={4}
      >
        <Heading fontSize={'xl'}>Information</Heading>
        <Box mt={3}>
          <Text fontWeight={'medium'} color={'gray.500'}>
            Email
          </Text>
          <Text>{user?.email}</Text>
        </Box>
        <Box mt={3}>
          <Text fontWeight={'medium'} color={'gray.500'}>
            Name
          </Text>
          <Text>{user?.name}</Text>
        </Box>
      </Box>
      <AccountVerification />
      <MultiFactorAuthentication />
      <Flex
        border={'1px'}
        borderColor={'gray.100'}
        rounded={'md'}
        w={'100%'}
        px={5}
        py={4}
        justifyContent={'space-between'}
      >
        <Box>
          <Heading fontSize={'xl'} pb={3}>
            Password
          </Heading>
          <Flex>
            <Text>Change your password</Text>
          </Flex>
        </Box>
        <Box>
          <Button
            colorScheme={'blue'}
            variant={'outline'}
            onClick={handleChangePassword}
          >
            Change password
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Authenticated;
