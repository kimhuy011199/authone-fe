import { useState } from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
import SettingItemLayout from '../SettingItemLayout';
import ChangePasswordForm from '../ChangePasswordForm';

const ChangePassword = () => {
  const [showForm, setShowForm] = useState(false);

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <SettingItemLayout title={'Change password'}>
      <>
        {showForm ? (
          <ChangePasswordForm onClose={handleCloseForm} />
        ) : (
          <>
            <Text color={'gray.600'}>
              Changing your password quarterly reduces your risk of exposure and
              avoids a number of IT Security dangers.
            </Text>
            <Box>
              <Button
                colorScheme={'blue'}
                variant={'outline'}
                onClick={handleShowForm}
              >
                Change password
              </Button>
            </Box>
          </>
        )}
      </>
    </SettingItemLayout>
  );
};

export default ChangePassword;
