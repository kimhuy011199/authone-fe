import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from '../../../stores/hook';
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
import { updatePassword } from '../../../stores/users/userSlice';

type ChangePasswordFormData = {
  oldPassword: string;
  password: string;
  confirmPassword: string;
};

interface ChangePasswordFormProps {
  onClose: () => void;
}

const ChangePasswordForm = (props: ChangePasswordFormProps) => {
  const { onClose } = props;
  const errorToast = useErrorToast();
  const successToast = useSuccessToast();
  const dispatch = useAppDispatch();

  const schema = yup.object().shape({
    oldPassword: yup
      .string()
      .required('Password is required')
      .min(8, 'Minimum length should be 8'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Minimum length should be 8'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), ''], 'Passwords must match')
      .required('Password is required'),
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordFormData>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<ChangePasswordFormData> = async (values) => {
    try {
      const { confirmPassword, ...data } = values;
      await dispatch(updatePassword(data)).unwrap();
      successToast({
        title: 'Password updated',
        description: 'Your password has been changed!',
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
        <FormControl id="oldpassword" isInvalid={!!errors?.oldPassword}>
          <FormLabel htmlFor="oldpassword">Old password</FormLabel>
          <Input
            id="oldpassword"
            type="password"
            placeholder="Your old password"
            {...register('oldPassword')}
          />
          <FormErrorMessage>
            {errors?.oldPassword && errors?.oldPassword?.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl id="password" isInvalid={!!errors?.password}>
          <FormLabel htmlFor="password">New password</FormLabel>
          <Input
            id="password"
            type="password"
            placeholder="Your new password"
            {...register('password')}
          />
          <FormErrorMessage>
            {errors?.password && errors?.password?.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl id="repassword" isInvalid={!!errors?.confirmPassword}>
          <FormLabel htmlFor="confirmPassword">Confirm password</FormLabel>
          <Input
            id="repassword"
            type="password"
            placeholder="Confirm your password"
            {...register('confirmPassword')}
          />
          <FormErrorMessage>
            {errors?.confirmPassword && errors?.confirmPassword?.message}
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

export default ChangePasswordForm;
