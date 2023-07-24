import { useToast } from '@chakra-ui/react';

interface ToastProps {
  title?: string;
  description?: string;
  status?: 'error' | 'success';
  duration?: number;
  isClosable?: boolean;
}

export function useErrorToast() {
  const toast = useToast();
  return (props: ToastProps = {}) => {
    const { title, description, duration, isClosable } = props;
    return toast({
      title: title ?? 'Error',
      description: description ?? 'Something went wrong, please try again!',
      status: 'error',
      duration: duration ?? 5000,
      isClosable: isClosable ?? true,
    });
  };
}

export function useSuccessToast() {
  const toast = useToast();
  return (props: ToastProps = {}) => {
    const { title, description, duration, isClosable } = props;
    return toast({
      title: title ?? 'Success',
      description: description ?? 'Action sucessfully',
      status: 'success',
      duration: duration ?? 5000,
      isClosable: isClosable ?? true,
    });
  };
}
