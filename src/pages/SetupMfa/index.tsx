import { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useErrorToast } from '../../shared/hooks/useAppToast';
import { useAppDispatch, useAppSelector } from '../../stores/hook';
import { RootState } from '../../stores';
import { getQRCode, toggleMfa } from '../../stores/users/userSlice';
import OtpInput from '../../shared/components/OtpInput';
import Loading from '../../shared/components/Loading';
import SuccessModal from '../../shared/components/SuccessModal';
import Logo from '../../shared/components/Logo';

const SetupMfa = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isOpen, onOpen } = useDisclosure();
  const { user, isLoading } = useAppSelector((state: RootState) => state.user);
  const [qrCode, setQrCode] = useState('');
  const errorToast = useErrorToast();

  const handleGetQRCode = async () => {
    try {
      const data = await dispatch(getQRCode()).unwrap();
      setQrCode(data);
    } catch (error: any) {
      errorToast({
        description: error.message,
      });
    }
  };

  const handleShowEnabledModal = () => {
    onOpen();
  };

  const handleEnableMFA = async (otp: string) => {
    try {
      await dispatch(toggleMfa(otp)).unwrap();
    } catch (error: any) {
      errorToast({
        description: error.message,
      });
    }
  };

  useEffect(() => {
    if (!user?.isEnabledMfa) {
      handleGetQRCode();
    } else {
      handleShowEnabledModal();
    }
  }, [user?.isEnabledMfa]);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Flex
        alignItems={'center'}
        justifyContent={'center'}
        direction={'column'}
        w={'100%'}
        minH={'100vh'}
      >
        <Flex
          alignItems={'center'}
          justifyContent={'center'}
          textAlign={'center'}
          direction={'column'}
          mx={'auto'}
          gap={2}
          maxW={'xl'}
          w={'100%'}
        >
          <Logo />
          <Heading fontSize={'3xl'}>Set up multifactor authentication</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            Enable multifactor authentication and increase your account
            security. 🔒
          </Text>
          {qrCode && (
            <Box border={'1px'} borderColor={'gray.200'} my={4}>
              <Image src={qrCode} />
            </Box>
          )}
          <Text pb={3}>
            Scan the QR code using Google Authenticator. Then, enter the
            app-generated authentication code to confirm your setup.
          </Text>
          <OtpInput
            onSubmit={handleEnableMFA}
            isLoading={!qrCode || isLoading}
          />
        </Flex>
      </Flex>
      <SuccessModal
        isOpen={isOpen}
        content={
          'Enabled multifactor authentication successfully! Go to homepage and enjoy our cool features.'
        }
      />
    </>
  );
};

export default SetupMfa;
