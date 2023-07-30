import { useNavigate } from 'react-router-dom';
import { CheckCircleIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';

interface SuccessModalProps {
  isOpen: boolean;
  content: string;
  location?: string;
  buttonContent?: string;
}

const SuccessModal = (props: SuccessModalProps) => {
  const { isOpen, content, location, buttonContent = '' } = props;
  const navigate = useNavigate();

  const handleNavigate = (location = '/') => {
    navigate(location);
  };

  return (
    <Modal isOpen={isOpen} onClose={() => {}} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Flex
            flexDir={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            textAlign={'center'}
            gap={5}
            py={8}
          >
            <CheckCircleIcon w={12} h={12} color="green.500" />
            <Text px={5}>{content}</Text>
            <Button
              variant={'outline'}
              colorScheme={'blue'}
              onClick={() => handleNavigate(location)}
            >
              {buttonContent || 'Go to homepage'}
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SuccessModal;
