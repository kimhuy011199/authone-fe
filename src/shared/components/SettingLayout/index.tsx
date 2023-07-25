import { Box, Flex, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface SettingLayoutProps {
  children: ReactNode;
  title: string;
}

const SettingLayout = (props: SettingLayoutProps) => {
  const { children, title } = props;

  return (
    <Flex>
      <Box minW={48}>
        <Text fontSize={'xl'} fontWeight={'medium'}>
          {title}
        </Text>
      </Box>
      <Flex flexDir={'column'} gap={4} w={'100%'}>
        {children}
      </Flex>
    </Flex>
  );
};

export default SettingLayout;
