import { Flex } from '@chakra-ui/react';
import SettingLayout from '../../../shared/components/SettingLayout';
import MultiFactorAuthentication from '../../../shared/components/MultiFactorAuthentication';
import ChangePassword from '../../../shared/components/ChangePassword';
import UserInformation from '../../../shared/components/UserInformation';
import AccountVerification from '../../../shared/components/AccountVerification';
import Logout from '../../../shared/components/Logout';

const Authenticated = () => {
  return (
    <>
      <AccountVerification />
      <Flex
        w={'100%'}
        maxW={'3xl'}
        flexDir={'column'}
        gap={4}
        my={8}
        mx={'auto'}
      >
        <SettingLayout title={'Information'}>
          <UserInformation />
        </SettingLayout>
        <SettingLayout title={'Security'}>
          <MultiFactorAuthentication />
          <ChangePassword />
        </SettingLayout>
        <Logout />
      </Flex>
    </>
  );
};

export default Authenticated;
