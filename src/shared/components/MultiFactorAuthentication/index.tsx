import { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Image,
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
import { getQRCode, toggleMfa } from '../../../stores/users/userSlice';
import { RootState } from '../../../stores';

const MultiFactorAuthentication = () => {
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state: RootState) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [otp, setOtp] = useState('');
  const [qrCode, setQrCode] = useState('');
  const errorToast = useErrorToast();
  const successToast = useSuccessToast();
  const inputFields = Array.from(Array(6).keys());

  const handleOtpChange = (value: string) => setOtp(value);

  const handleGetQRCode = async () => {
    setOtp('');
    try {
      if (!user?.isEnabledMfa) {
        const data = await dispatch(getQRCode()).unwrap();
        setQrCode(data);
      }
      onOpen();
    } catch (error: any) {
      errorToast({
        description: error.message,
      });
    }
  };

  const handleToggleMFA = async () => {
    try {
      await dispatch(toggleMfa(otp)).unwrap();
      isOpen && onClose();
      successToast({
        title: `${
          !user?.isEnabledMfa ? 'Enabled' : 'Disabled'
        } MFA successfully!`,
        description: `Your account has been ${
          !user?.isEnabledMfa ? 'enabled' : 'disabled'
        } MFA`,
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
            Multifactor authentication
          </Heading>
          <Flex alignItems={'center'} gap={2}>
            <Text>Status: {user?.isEnabledMfa ? 'Enabled' : 'Disabled'}</Text>
            {user?.isEnabledMfa ? (
              <CheckCircleIcon w={4} h={4} color="green.500" />
            ) : (
              <WarningTwoIcon w={4} h={4} color="yellow.500" />
            )}
          </Flex>
        </Box>
        <Box>
          <Button
            colorScheme={'blue'}
            variant={'outline'}
            onClick={handleGetQRCode}
            isDisabled={isLoading}
          >
            {user?.isEnabledMfa ? 'Disable ' : 'Enable '}
            MFA
          </Button>
        </Box>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Multifactor authentication</ModalHeader>
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
              {qrCode && <Image src={qrCode} />}
              <Text px={5}>
                {!user?.isEnabledMfa
                  ? 'Using Autheticator app to scan QRCode and enter OTP token to enable MFA'
                  : 'Enter OTP token to disable MFA'}
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
                  onClick={handleToggleMFA}
                  w={'280px'}
                  isDisabled={otp.length !== 6}
                >
                  Submit
                </Button>
              </Box>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MultiFactorAuthentication;
