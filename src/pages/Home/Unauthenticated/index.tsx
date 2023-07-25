import { useNavigate } from 'react-router';
import { Flex, Heading, Text, Button } from '@chakra-ui/react';

const Unauthenticated = () => {
  const navigate = useNavigate();

  return (
    <Flex
      minH={'100vh'}
      px={4}
      justifyContent={'center'}
      alignItems={'center'}
      textAlign={'center'}
    >
      <Flex
        flexDir={'column'}
        alignItems={'center'}
        gap={6}
        w={'100%'}
        maxW={'3xl'}
      >
        <Heading fontSize={'6xl'} as={'h1'} fontWeight={'bold'}>
          The Future Of{' '}
          <Text as={'span'} color={'blue.500'}>
            Cyber
          </Text>{' '}
          Authentication
        </Heading>
        <Text fontSize={'lg'} color={'gray.600'}>
          Our AuthOne platform is designed to provide you with a seamless and
          secure authentication experience for all your online activities.
        </Text>
        <Flex gap={3}>
          <Button
            colorScheme={'blue'}
            variant={'solid'}
            onClick={() => navigate('/register')}
          >
            Sign up
          </Button>
          <Button
            colorScheme={'blue'}
            variant={'outline'}
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Unauthenticated;
