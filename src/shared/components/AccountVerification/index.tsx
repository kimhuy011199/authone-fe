import { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  PinInput,
  PinInputField,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { CheckCircleIcon, WarningTwoIcon } from '@chakra-ui/icons';
import { useAppDispatch, useAppSelector } from '../../../stores/hook';
import { useErrorToast, useSuccessToast } from '../../hooks/useAppToast';
import { sendVerifyEmail, verifyEmail } from '../../../stores/users/userSlice';
import { RootState } from '../../../stores';

const AccountVerification = () => {
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state: RootState) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [otp, setOtp] = useState('');
  const errorToast = useErrorToast();
  const successToast = useSuccessToast();
  const inputFields = Array.from(Array(6).keys());

  const handleOtpChange = (value: string) => setOtp(value);

  const handleSendRequest = async () => {
    try {
      await dispatch(sendVerifyEmail()).unwrap();
      if (isOpen) {
        successToast({
          title: 'Resend OTP successfully!',
          description: 'OTP token has been sent to your email',
        });
      } else {
        onOpen();
      }
    } catch (error: any) {
      errorToast({
        description: error.message,
      });
    }
  };

  const handleVerifyAccount = async () => {
    try {
      await dispatch(verifyEmail(otp)).unwrap();
      isOpen && onClose();
      successToast({
        title: 'Verify successfully!',
        description: 'Your account has been verified',
      });
    } catch (error: any) {
      errorToast({
        description: error.message,
      });
    }
  };

  return (
    <>
      <Flex
        border={'1px'}
        borderColor={'gray.100'}
        rounded={'md'}
        w={'100%'}
        px={5}
        py={4}
        justifyContent={'space-between'}
      >
        <Box>
          <Heading fontSize={'xl'} pb={3}>
            Account verification
          </Heading>
          <Flex alignItems={'center'} gap={2}>
            <Text>
              Status: {user?.isVerifiedEmail ? 'Verified' : 'Not verified'}
            </Text>
            {user?.isVerifiedEmail ? (
              <CheckCircleIcon w={4} h={4} color="green.500" />
            ) : (
              <WarningTwoIcon w={4} h={4} color="yellow.500" />
            )}
          </Flex>
        </Box>
        {!user?.isVerifiedEmail && (
          <Box>
            <Button
              colorScheme={'blue'}
              variant={'outline'}
              onClick={handleSendRequest}
              isDisabled={isLoading}
            >
              Verify account
            </Button>
          </Box>
        )}
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Verify account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              flexDir={'column'}
              justifyContent={'center'}
              alignItems={'center'}
              textAlign={'center'}
              gap={6}
              py={2}
              pb={6}
            >
              <Text>
                Code is sent to{' '}
                <Text as={'span'} fontWeight={'medium'} color={'gray.500'}>
                  {user?.email}
                </Text>
              </Text>

              <Box>
                <HStack mb={4}>
                  <PinInput value={otp} onChange={handleOtpChange}>
                    {inputFields.map((num: number) => (
                      <PinInputField key={num} />
                    ))}
                  </PinInput>
                </HStack>
                <Button
                  variant={'solid'}
                  colorScheme={'blue'}
                  onClick={handleVerifyAccount}
                  w={'280px'}
                  isDisabled={otp.length !== 6}
                >
                  Verify
                </Button>
              </Box>

              <Flex
                textAlign={'center'}
                justifyContent={'center'}
                alignItems={'center'}
                gap={1}
              >
                <Text>Didn't receive code?</Text>
                <Button
                  variant={'link'}
                  colorScheme={'blue'}
                  onClick={handleSendRequest}
                >
                  Resend
                </Button>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AccountVerification;
