import { Flex, Image, Text } from '@chakra-ui/react';
import logo from '../../../assets/logo.svg';

const Logo = () => {
  return (
    <Flex alignItems={'center'} gap={1}>
      <Image w={10} h={10} src={logo} alt="logo" />
      <Text fontSize={'1.8em'} fontWeight={'medium'}>
        AuthOne
      </Text>
    </Flex>
  );
};

export default Logo;
