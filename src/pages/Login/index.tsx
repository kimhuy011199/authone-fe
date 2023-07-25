import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  FormErrorMessage,
  Grid,
  useDisclosure,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../stores/hook';
import { RootState } from '../../stores';
import { loginUser, verifyMfa } from '../../stores/users/userSlice';
import { userType } from '../../stores/users/userType';
import loginImg from '../../assets/login.svg';
import { useErrorToast } from '../../shared/hooks/useAppToast';
import AuthenticationSideImage from '../../shared/components/AuthenticationSideImage';
import OtpModal from '../../shared/components/OtpModal';

type LoginFormData = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const errorToast = useErrorToast();
  const [mfaToken, setMfaToken] = useState('');
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, isLoading, error, message } = useAppSelector(
    (state: RootState) => state.user
  );

  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Email is required')
      .email('Invalid email format'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Minimum length should be 8'),
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<LoginFormData> = async (values) => {
    try {
      const data = await dispatch(loginUser(values)).unwrap();
      if (data?.mfaToken) {
        setMfaToken(data.mfaToken);
        !isOpen && onOpen();
      }
    } catch (error: any) {}
  };

  const handleSubmitOtp = async (otp: string) => {
    try {
      const data = { otp, mfaToken };
      await dispatch(verifyMfa(data)).unwrap();
    } catch (error: any) {
      errorToast({
        description: error.message,
      });
    }
  };

  const handleCloseModal = () => {
    onClose();
    setMfaToken('');
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  return (
    <>
      <Grid templateColumns="repeat(2, 1fr)" minH={'100vh'}>
        <AuthenticationSideImage src={loginImg} alt="login" />
        <Flex justify={'center'} direction={'column'} mx={'auto'} gap={2}>
          <Heading fontSize={'4xl'}>Welcome back!</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            Login to AuthOne to enjoy our cool features ✌️
          </Text>
          {error === userType.LOGIN_USER && (
            <Box
              bgColor={'red.50'}
              rounded={'base'}
              py={2}
              px={4}
              border={'1px'}
              borderColor={'red.400'}
            >
              <Text color={'red.600'}>{message}</Text>
            </Box>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4} mt={4}>
              <FormControl id="email" isInvalid={!!errors?.email}>
                <FormLabel htmlFor="email">Email address</FormLabel>
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
              <FormControl id="password" isInvalid={!!errors?.password}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="Your password"
                  {...register('password')}
                />
                <FormErrorMessage>
                  {errors?.password && errors?.password?.message}
                </FormErrorMessage>
              </FormControl>
              <Text
                color={'blue.500'}
                fontWeight={'medium'}
                textAlign={'right'}
              >
                <Link to={'/forgot-password'}>Forgot password?</Link>
              </Text>
              <Button
                type="submit"
                isDisabled={isSubmitting || isLoading}
                colorScheme={'blue'}
                variant={'solid'}
              >
                Login
              </Button>
              <Flex textAlign={'center'} justifyContent={'center'} gap={1}>
                <Text>Don't have account?</Text>
                <Text color={'blue.500'} fontWeight={'medium'}>
                  <Link to={'/register'}>Regsiter</Link>
                </Text>
              </Flex>
            </Stack>
          </form>
        </Flex>
      </Grid>
      <OtpModal
        isOpen={isOpen}
        isLoading={isLoading}
        onSubmit={handleSubmitOtp}
        onClose={handleCloseModal}
        heading={'Multifactor authentication'}
        content={
          'Enter the app-generated authentication code to finish login process.'
        }
      />
    </>
  );
};

export default Login;
