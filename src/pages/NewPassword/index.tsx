import { useSearchParams } from 'react-router-dom';
import { useErrorToast } from '../../shared/hooks/useAppToast';
import { useAppDispatch } from '../../stores/hook';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import SuccessModal from '../../shared/components/SuccessModal';
import { verifyResetPassword } from '../../stores/users/userSlice';
import Logo from '../../shared/components/Logo';

type NewPasswordFormData = {
  password: string;
  confirmPassword: string;
};

const NewPassword = () => {
  const [searchParams] = useSearchParams();

  const passwordToken = searchParams.get('pt');

  const errorToast = useErrorToast();
  const dispatch = useAppDispatch();
  const { isOpen, onOpen } = useDisclosure();

  const schema = yup.object().shape({
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
    formState: { errors, isSubmitting },
  } = useForm<NewPasswordFormData>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<NewPasswordFormData> = async (values) => {
    try {
      const { password } = values;
      if (passwordToken) {
        await dispatch(
          verifyResetPassword({ password, passwordToken })
        ).unwrap();
        onOpen();
      }
    } catch (error: any) {
      errorToast({
        description: error.message,
      });
    }
  };

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
          gap={4}
          maxW={80}
          w={'100%'}
        >
          <Logo />
          <Heading fontSize={'3xl'}>Create new password</Heading>
          <Text pb={3} color={'gray.600'}>
            Please enter your new password below and then login again to enjoy
            our cool featues.
          </Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4} w={80}>
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
              <FormControl
                id="repassword"
                isInvalid={!!errors?.confirmPassword}
              >
                <FormLabel htmlFor="confirmPassword">
                  Confirm password
                </FormLabel>
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
              <Button
                type="submit"
                isDisabled={isSubmitting || !passwordToken}
                colorScheme={'blue'}
                variant={'solid'}
              >
                Create new password
              </Button>
            </Stack>
          </form>
        </Flex>
      </Flex>
      <SuccessModal
        isOpen={isOpen}
        content={
          'New password is created successfully! Go to login page and get started.'
        }
        location="/login"
        buttonContent="Go to login"
      />
    </>
  );
};

export default NewPassword;
