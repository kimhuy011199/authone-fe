import { useState } from 'react';
import { Box, Button, HStack, PinInput, PinInputField } from '@chakra-ui/react';

interface OtpInputProps {
  onSubmit: (otp: string) => void;
  isLoading: boolean;
}

const OtpInput = (props: OtpInputProps) => {
  const { onSubmit, isLoading } = props;
  const [otp, setOtp] = useState('');
  const inputFields = Array.from(Array(6).keys());

  const handleOtpChange = (value: string) => setOtp(value);

  const handleSubmitOtp = async () => {
    onSubmit(otp);
  };

  return (
    <Box>
      <HStack mb={4}>
        <PinInput value={otp} onChange={handleOtpChange}>
          {inputFields.map((num: number) => (
            <PinInputField key={num} />
          ))}
        </PinInput>
      </HStack>
      <Button
        variant={'solid'}
        colorScheme={'blue'}
        onClick={handleSubmitOtp}
        w={'280px'}
        isDisabled={otp.length !== 6 || isLoading}
      >
        Submit
      </Button>
    </Box>
  );
};

export default OtpInput;
