import {
  Button,
  Flex,
  Heading,
  Text,
  Stack,
  FormControl,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useErrorToast } from '../../shared/hooks/useAppToast';
import { useAppDispatch } from '../../stores/hook';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { requestResetPassword } from '../../stores/users/userSlice';

type EmailFormData = {
  email: string;
};

const ForgotPassword = () => {
  const dispatch = useAppDispatch();
  const errorToast = useErrorToast();

  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Email is required')
      .email('Invalid email format'),
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<EmailFormData>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<EmailFormData> = async (values) => {
    try {
      await dispatch(requestResetPassword(values.email)).unwrap();
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
          <Heading fontSize={'3xl'}>Reset your password</Heading>
          <Text pb={3} color={'gray.600'}>
            Please enter your email address below and we will send you
            instructions on how to reset your password.
          </Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4} w={80}>
              <FormControl id="email" isInvalid={!!errors?.email}>
                <Input
                  id="email"
                  type="text"
                  placeholder="Your email address"
                  {...register('email')}
                />
                <FormErrorMessage>
                  {errors?.email && errors?.email?.message}
                </FormErrorMessage>
              </FormControl>
              <Button
                type="submit"
                isDisabled={isSubmitting}
                colorScheme={'blue'}
                variant={'solid'}
              >
                Send mail
              </Button>
            </Stack>
          </form>
        </Flex>
      </Flex>
    </>
  );
};

export default ForgotPassword;
