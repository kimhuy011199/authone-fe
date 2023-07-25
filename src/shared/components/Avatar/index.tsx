import { useState } from 'react';
import { Box, Button, Image, Input } from '@chakra-ui/react';
import { useErrorToast } from '../../hooks/useAppToast';

const FILE_SIZE_MAX = 200000;

const Avatar = () => {
  const errorToast = useErrorToast();
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
      // const data = await dispatch(uploadImg({ data: base64EncodedImage }));
      console.log(base64EncodedImage);
      setInputValue('');
      // previewImgSrc(data)
    } catch (err) {}
  };

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
          src={
            previewImgSrc
              ? previewImgSrc
              : 'https://res.cloudinary.com/cloudinaryassets/image/upload/v1633613052/avatar-male_rdymxf.png'
          }
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
          variant={'outline'}
          bg={'white'}
        >
          Save
        </Button>
      )}
    </Box>
  );
};

export default Avatar;
