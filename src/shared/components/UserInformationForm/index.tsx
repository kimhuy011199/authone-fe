import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '../../../stores/hook';
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react';
import { useErrorToast, useSuccessToast } from '../../hooks/useAppToast';
import { updateUser } from '../../../stores/users/userSlice';
import { RootState } from '../../../stores';

type UserInformationFormData = {
  name: string;
};

interface UserInformationFormProps {
  onClose: () => void;
}

const UserInformationForm = (props: UserInformationFormProps) => {
  const { onClose } = props;
  const errorToast = useErrorToast();
  const successToast = useSuccessToast();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.user);

  const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserInformationFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: user?.name,
    },
  });

  const onSubmit: SubmitHandler<UserInformationFormData> = async (values) => {
    try {
      await dispatch(updateUser(values)).unwrap();
      successToast({
        title: 'Information updated',
        description: 'Your information has been updated!',
      });
      onClose();
    } catch (error: any) {
      errorToast({
        description: error.message,
      });
    }
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FormControl id="name" isInvalid={!!errors?.name}>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            id="name"
            type="text"
            placeholder="Your name"
            {...register('name')}
          />
          <FormErrorMessage>
            {errors?.name && errors?.name?.message}
          </FormErrorMessage>
        </FormControl>
        <Flex justifyContent={'space-between'}>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button
            type="submit"
            isDisabled={isSubmitting}
            loadingText="Register"
            colorScheme={'blue'}
            variant={'solid'}
          >
            Save
          </Button>
        </Flex>
      </Stack>
    </form>
  );
};

export default UserInformationForm;
