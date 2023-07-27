import { useState } from 'react';
import { Box, Button, Image, Input } from '@chakra-ui/react';
import { useErrorToast, useSuccessToast } from '../../hooks/useAppToast';
import { updateAvatar } from '../../../stores/users/userSlice';
import { useAppDispatch, useAppSelector } from '../../../stores/hook';
import { RootState } from '../../../stores';

const FILE_SIZE_MAX = 200000;

const Avatar = () => {
  const { user, isLoading, error } = useAppSelector(
    (state: RootState) => state.user
  );
  const dispatch = useAppDispatch();
  const errorToast = useErrorToast();
  const successToast = useSuccessToast();
  const [inputValue, setInputValue] = useState('');
  const [previewImgSrc, setPreviewImgSrc] = useState('');
  const [selectedFile, setSelectedFile] = useState<any>();

  const handleInputValueChange = (e: any) => {
    try {
      const file = e.target?.files[0];
      if (!file) {
        return;
      }
      if (file.size >= FILE_SIZE_MAX) {
        return errorToast({
          description: 'File size larger than 20MB!',
        });
      }

      handleReadFile(file, setPreviewImgSrc);
      setSelectedFile(file);
      setInputValue(e.target.value);
    } catch (error) {}
  };

  const handleReadFile = (file: File, callback: (result: any) => void) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (reader.result) {
        callback(reader.result);
      }
    };
    reader.onerror = () => {};
  };

  const handleSubmitFile = () => {
    handleReadFile(selectedFile, uploadImage);
  };

  const uploadImage = async (base64EncodedImage: string | ArrayBuffer) => {
    try {
      await dispatch(updateAvatar(base64EncodedImage));
      setInputValue('');
      setPreviewImgSrc('');
      successToast({
        title: 'Avatar updated',
        description: 'Your avatar has been updated!',
      });
    } catch (error: any) {
      errorToast({
        description: error.message,
      });
    }
  };

  const avatarSrc =
    previewImgSrc ||
    user?.avatar ||
    'https://res.cloudinary.com/cloudinaryassets/image/upload/v1633613052/avatar-male_rdymxf.png';

  return (
    <Box pos={'relative'} w={'fit-content'} ml={2} h={36}>
      <Box pos={'relative'} w={28} h={28} rounded={'full'} overflow={'hidden'}>
        <Image
          pos={'absolute'}
          top={'50%'}
          left={'50%'}
          objectFit={'cover'}
          minH={28}
          minW={28}
          transform={'translate(-50%, -50%)'}
          src={avatarSrc}
        />
        <Input
          type={'file'}
          onChange={handleInputValueChange}
          value={inputValue}
          accept={'image/jpeg, image/png, image/svg+xml'}
          pos={'absolute'}
          inset={0}
          h={'100%'}
          variant={'unstyled'}
          opacity={0}
          cursor={'pointer'}
        />
      </Box>
      {previewImgSrc && (
        <Button
          pos={'absolute'}
          left={'50%'}
          transform={'translate(-50%, -50%)'}
          onClick={handleSubmitFile}
          colorScheme={'blue'}
          variant={'solid'}
          isLoading={isLoading}
          _loading={{
            backgroundColor: 'blue.500',
            opacity: 1,
          }}
        >
          Save
        </Button>
      )}
    </Box>
  );
};

export default Avatar;
