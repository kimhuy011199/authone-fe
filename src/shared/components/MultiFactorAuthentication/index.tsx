import { useNavigate } from 'react-router-dom';
import { Box, Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { CheckCircleIcon, WarningTwoIcon } from '@chakra-ui/icons';
import { useAppDispatch, useAppSelector } from '../../../stores/hook';
import { useErrorToast, useSuccessToast } from '../../hooks/useAppToast';
import { toggleMfa } from '../../../stores/users/userSlice';
import { RootState } from '../../../stores';
import OtpModal from '../OtpModal';
import SettingItemLayout from '../SettingItemLayout';

const MultiFactorAuthentication = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, isLoading } = useAppSelector((state: RootState) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const errorToast = useErrorToast();
  const successToast = useSuccessToast();

  const handleToggleMfa = async () => {
    if (user?.isEnabledMfa) {
      onOpen();
    } else {
      navigate('/setup-mfa');
    }
  };

  const handleDisabledMfa = async (otp: string) => {
    try {
      await dispatch(toggleMfa(otp)).unwrap();
      isOpen && onClose();
      successToast({
        title: 'MFA disabled',
        description: 'Your account has been disabled MFA',
      });
    } catch (error: any) {
      errorToast({
        description: error.message,
      });
    }
  };

  return (
    <>
      <SettingItemLayout title={'Multifactor authentication'}>
        <Flex alignItems={'center'} gap={2} fontWeight={'medium'}>
          <Text>Status: {user?.isEnabledMfa ? 'Enabled' : 'Disabled'}</Text>
          {user?.isEnabledMfa ? (
            <CheckCircleIcon w={4} h={4} color="green.500" />
          ) : (
            <WarningTwoIcon w={4} h={4} color="yellow.500" />
          )}
        </Flex>
        <Text color={'gray.600'}>
          Enable multifactor authentication to add an extra layer of security to
          your account.
        </Text>
        <Box>
          <Button
            colorScheme={'blue'}
            variant={'outline'}
            onClick={handleToggleMfa}
            isDisabled={isLoading}
          >
            {user?.isEnabledMfa ? 'Disable MFA' : 'Enable MFA'}
          </Button>
        </Box>
      </SettingItemLayout>
      <OtpModal
        isOpen={isOpen}
        isLoading={isLoading}
        onSubmit={handleDisabledMfa}
        onClose={onClose}
        heading={'Multifactor authentication'}
        content={
          'Enter the app-generated authentication code to confirm disabled MFA.'
        }
      />
    </>
  );
};

export default MultiFactorAuthentication;
