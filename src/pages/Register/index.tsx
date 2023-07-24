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
  Image,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../stores/hook';
import { RootState } from '../../stores';
import { registerUser } from '../../stores/users/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { userType } from '../../stores/users/userType';
import registerImg from '../../assets/register.svg';

type RegisterFormData = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
};

const Regsiter = () => {
  const navigate = useNavigate();
  const { user, isLoading, error, message } = useAppSelector(
    (state: RootState) => state.user
  );
  console.log({ user, isLoading, error, message });

  const dispatch = useAppDispatch();

  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Email is required')
      .email('Invalid email format'),
    name: yup.string().required('Name is required'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Minimum length should be 8'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), ''], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<RegisterFormData> = (values) => {
    const { confirmPassword, ...data } = values;
    dispatch(registerUser(data));
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  return (
    <Grid templateColumns="repeat(2, 1fr)" minH={'100vh'}>
      <Flex justify={'center'} direction={'column'} mx={'auto'} gap={3}>
        <Heading fontSize={'4xl'}>Join us for free!</Heading>
        <Text fontSize={'lg'} color={'gray.600'}>
          Create a new AuthOne account to get started 🚀
        </Text>
        {error === userType.REGISTER_USER && (
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

            <Button
              type="submit"
              isLoading={isSubmitting || isLoading}
              loadingText="Submitting"
              colorScheme={'blue'}
              variant={'solid'}
            >
              Register
            </Button>

            <Flex textAlign={'center'} justifyContent={'center'} gap={1}>
              <Text>Already have account?</Text>
              <Text color={'blue.400'} fontWeight={'semibold'}>
                <Link to={'/login'}>Login</Link>
              </Text>
            </Flex>
          </Stack>
        </form>
      </Flex>
      <Stack p={3}>
        <Flex h={'100%'} bg={'gray.100'} rounded={'lg'}>
          <Flex w={'100%'} maxW={'md'} mx={'auto'}>
            <Image src={registerImg} alt="register" />
          </Flex>
        </Flex>
      </Stack>
    </Grid>
  );
};

export default Regsiter;
