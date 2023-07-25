import { Flex, Heading } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface SettingItemLayoutProps {
  children: ReactNode;
  title: string;
}

const SettingItemLayout = (props: SettingItemLayoutProps) => {
  const { children, title } = props;

  return (
    <Flex
      border={'1px'}
      borderColor={'gray.100'}
      rounded={'md'}
      w={'100%'}
      p={5}
      flexDir={'column'}
      gap={3}
    >
      <Heading
        fontSize={'lg'}
        borderBottom={'1px'}
        borderBottomColor={'gray.200'}
        pb={3}
      >
        {title}
      </Heading>
      {children}
    </Flex>
  );
};

export default SettingItemLayout;
