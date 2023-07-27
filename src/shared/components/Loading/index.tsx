import { Flex, Spinner } from '@chakra-ui/react';

const Loading = () => {
  return (
    <Flex
      alignItems={'center'}
      justifyContent={'center'}
      direction={'column'}
      w={'100%'}
      minH={'100vh'}
    >
      <Spinner
        thickness="6px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Flex>
  );
};

export default Loading;
