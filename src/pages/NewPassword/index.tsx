import { useSearchParams } from 'react-router-dom';

const NewPassword = () => {
  const [searchParams] = useSearchParams();

  const passwordToken = searchParams.get('pt');
  console.log(passwordToken);

  // return form enter new password
  // const data = { passwordToken, password }
  // submit function dispatch(verifyResetPassword(data))
  return <div>NewPassword</div>;
};

export default NewPassword;
