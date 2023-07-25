import { Flex, Image, Stack } from '@chakra-ui/react';

interface AuthenticationSideImageProps {
  src: any;
  alt?: string;
}

const AuthenticationSideImage = (props: AuthenticationSideImageProps) => {
  const { src, alt } = props;
  return (
    <Stack p={3}>
      <Flex h={'100%'} bg={'blue.500'} rounded={'lg'}>
        <Flex w={'100%'} maxW={'md'} mx={'auto'}>
          <Image src={src} alt={alt} />
        </Flex>
      </Flex>
    </Stack>
  );
};

export default AuthenticationSideImage;
