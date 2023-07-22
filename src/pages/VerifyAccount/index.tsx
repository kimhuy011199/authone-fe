import { Center, Heading, Text } from '@chakra-ui/react';
import {
  Button,
  FormControl,
  Flex,
  Stack,
  useColorModeValue,
  HStack,
} from '@chakra-ui/react';
import { PinInput, PinInputField } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../stores/hook';
import { RootState } from '../../stores';
import { Link } from 'react-router-dom';

const OTP_LENGTH = 6;

const VerifyAccount = () => {
  const { user, isLoading } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const [otp, setOtp] = useState('');
  console.log(otp.length);

  const handleOtpChange = (value: string) => setOtp(value);

  const handleSubmit = () => {
    console.log({ otp });
    // dispatch
  };

  const handleRequestVerifyAccount = () => {
    // dispatch
  };

  useEffect(() => {
    if (!user?.isVertification) {
      handleRequestVerifyAccount();
    }
  }, [user]);

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack
        spacing={4}
        w={'full'}
        maxW={'sm'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={10}
      >
        {!user?.isVertification ? (
          <>
            <Center color={useColorModeValue('gray.800', 'gray.400')}>
              Your account has been verify!
            </Center>
            <Text align={'center'} color={'blue.400'}>
              <Link to={'/'}>Go to homepage</Link>
            </Text>
          </>
        ) : (
          <>
            <Center>
              <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
                Verify your account
              </Heading>
            </Center>
            <Center
              fontSize={{ base: 'sm', sm: 'md' }}
              color={useColorModeValue('gray.800', 'gray.400')}
            >
              We have sent code to your email
            </Center>
            <Center
              fontSize={{ base: 'sm', sm: 'md' }}
              fontWeight="bold"
              color={useColorModeValue('gray.800', 'gray.400')}
            >
              username@mail.com
            </Center>
            <FormControl>
              <Center>
                <HStack py={2}>
                  <PinInput value={otp} onChange={handleOtpChange}>
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                  </PinInput>
                </HStack>
              </Center>
            </FormControl>
            <Stack spacing={6}>
              <Button
                // isLoading={isSubmitting || isLoading}
                loadingText="Submitting"
                isDisabled={otp.length !== OTP_LENGTH}
                onClick={handleSubmit}
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
              >
                Verify
              </Button>
            </Stack>
          </>
        )}
      </Stack>
    </Flex>
  );
};

export default VerifyAccount;
