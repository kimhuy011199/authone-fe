import {
  Flex,
  Box,
  Stack,
  Heading,
  Text,
  Button,
  Grid,
  Image,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import home from '../../../assets/home.svg';

const Unauthenticated = () => {
  const navigate = useNavigate();

  return (
    <Flex minH={'100vh'} px={4} justifyContent={'center'} alignItems={'center'}>
      <Grid
        templateColumns="repeat(2, 1fr)"
        h={'100%'}
        w={'100%'}
        maxW={'6xl'}
        mx={'auto'}
        gap={20}
        alignItems={'center'}
      >
        <Stack>
          <Heading fontSize={'5xl'} as={'h1'}>
            The Future Of Cyber Authentication Is Here
          </Heading>
          <Box
            mt={8}
            ml={10}
            pl={8}
            borderLeft={'1px'}
            borderLeftColor={'blue.500'}
          >
            <Text fontSize={'lg'} color={'gray.600'}>
              Our AuthOne platform is designed to provide you with a seamless
              and secure authentication experience for all your online
              activities.
            </Text>
            <Flex gap={3} mt={6}>
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
          </Box>
        </Stack>
        <Stack p={8}>
          <Image src={home} alt="home" />
        </Stack>
      </Grid>
    </Flex>
  );
};

export default Unauthenticated;
