import { Box, Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { WarningTwoIcon } from '@chakra-ui/icons';
import { useAppDispatch, useAppSelector } from '../../../stores/hook';
import { useErrorToast, useSuccessToast } from '../../hooks/useAppToast';
import { sendVerifyEmail, verifyEmail } from '../../../stores/users/userSlice';
import { RootState } from '../../../stores';
import OtpModal from '../OtpModal';

const AccountVerification = () => {
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state: RootState) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const errorToast = useErrorToast();
  const successToast = useSuccessToast();

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

  const handleVerifyAccount = async (otp: string) => {
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

  if (user?.isVerifiedEmail) {
    return null;
  }

  return (
    <>
      <Flex py={3} bg={'red.500'}>
        <Flex
          mx={'auto'}
          w={'100%'}
          maxW={'3xl'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Flex alignItems={'center'} gap={2}>
            <WarningTwoIcon w={4} h={4} color={'white'} />
            <Text color={'white'}>
              Verify your account to enable all cool features!
            </Text>
          </Flex>
          <Box>
            <Button
              colorScheme={'red'}
              bg={'white'}
              variant={'outline'}
              onClick={handleSendRequest}
              isDisabled={isLoading}
            >
              Verify account
            </Button>
          </Box>
        </Flex>
      </Flex>

      <OtpModal
        isOpen={isOpen}
        isLoading={isLoading}
        onSubmit={handleVerifyAccount}
        onClose={onClose}
        heading={'Account verification'}
        content={`Code is sent to ${user?.email}. Enter received code to verify your account.`}
      />
    </>
  );
};

export default AccountVerification;
