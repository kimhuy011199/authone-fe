import {
  Flex,
  Box,
  Stack,
  Heading,
  Text,
  useColorModeValue,
  HStack,
  Button,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../../stores/hook';
import { RootState } from '../../../stores';

const Authenticated = () => {
  const { user, isLoading, error } = useAppSelector(
    (state: RootState) => state.user
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleToggleMFA = () => {
    if (user?.isEnableMFA) {
      // dispatch
    } else {
      navigate('/enable-mfa');
    }
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Welcome to AuthOne</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            Hi, huynguyen@example.com 👋
          </Text>
        </Stack>
        <HStack gap={3}>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
            w={0}
            flex={1}
          >
            <Stack gap={6}>
              <Text align={'center'}>
                Verify your account to unlock all features.
              </Text>
              <Button
                size={'lg'}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={() => navigate('/verify-account')}
                // isDisabled={user?.isVertification}
              >
                Verify account
              </Button>
            </Stack>
          </Box>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
            w={0}
            flex={1}
          >
            <Stack gap={6}>
              <Text align={'center'}>Enable MFA to secure your account.</Text>
              <Button
                size={'lg'}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={handleToggleMFA}
              >
                Enable MFA
              </Button>
            </Stack>
          </Box>
        </HStack>
      </Stack>
    </Flex>
  );
};

export default Authenticated;
