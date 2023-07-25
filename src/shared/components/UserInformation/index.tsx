import { useState } from 'react';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { CheckCircleIcon, WarningTwoIcon } from '@chakra-ui/icons';
import SettingItemLayout from '../SettingItemLayout';
import { useAppSelector } from '../../../stores/hook';
import { RootState } from '../../../stores';
import UserInformationForm from '../UserInformationForm';
import Avatar from '../Avatar';

const UserInformation = () => {
  const { user, isLoading, error } = useAppSelector(
    (state: RootState) => state.user
  );
  const [showForm, setShowForm] = useState(false);

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <SettingItemLayout title={'User information'}>
      <Flex w={'100%'} gap={8} mt={3}>
        <Avatar />
        <Flex flexDir={'column'} gap={3} w={'full'}>
          {showForm ? (
            <UserInformationForm onClose={handleCloseForm} />
          ) : (
            <>
              <Flex alignItems={'center'} justifyContent={'space-between'}>
                <Box w={'full'}>
                  <Flex alignItems={'center'} justifyContent={'space-between'}>
                    <Text fontWeight={'medium'} color={'gray.500'}>
                      Email
                    </Text>
                    <Flex alignItems={'center'} gap={2} fontWeight={'medium'}>
                      <Text>
                        {user?.isVerifiedEmail ? 'Verified' : 'Not verified'}
                      </Text>
                      {user?.isVerifiedEmail ? (
                        <CheckCircleIcon w={4} h={4} color="green.500" />
                      ) : (
                        <WarningTwoIcon w={4} h={4} color="yellow.500" />
                      )}
                    </Flex>
                  </Flex>
                  <Text>{user?.email}</Text>
                </Box>
              </Flex>
              <Box>
                <Text fontWeight={'medium'} color={'gray.500'}>
                  Name
                </Text>
                <Text>{user?.name}</Text>
              </Box>
              <Box mt={2}>
                <Button
                  colorScheme={'blue'}
                  variant={'outline'}
                  onClick={handleShowForm}
                >
                  Update profile
                </Button>
              </Box>
            </>
          )}
        </Flex>
      </Flex>
    </SettingItemLayout>
  );
};

export default UserInformation;
