import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import OtpInput from '../OtpInput';

interface OtpModalProps {
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onSubmit: (otp: string) => void;
  heading: string;
  content: string;
}

const OtpModal = (props: OtpModalProps) => {
  const { isOpen, onClose, onSubmit, heading, content, isLoading } = props;

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{heading}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              flexDir={'column'}
              justifyContent={'center'}
              alignItems={'center'}
              textAlign={'center'}
              gap={6}
              py={2}
              pb={6}
            >
              <Text px={5}>{content}</Text>
              <OtpInput onSubmit={onSubmit} isLoading={isLoading} />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default OtpModal;
