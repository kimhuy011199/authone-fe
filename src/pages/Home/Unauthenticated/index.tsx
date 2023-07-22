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

const Unauthenticated = () => {
  const navigate = useNavigate();

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
            Authetication service 🔒
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
              <Text align={'center'}>Login to enjoy our amazing features.</Text>
              <Button
                size={'lg'}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={() => navigate('/login')}
              >
                Login
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
              <Text align={'center'}>
                Don't have account? Create a new one.
              </Text>
              <Button
                size={'lg'}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={() => navigate('/register')}
              >
                Sign up
              </Button>
            </Stack>
          </Box>
        </HStack>
      </Stack>
    </Flex>
  );
};

export default Unauthenticated;
