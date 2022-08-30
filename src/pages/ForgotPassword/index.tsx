import ForgotPasswordFirstStep from '@/pages/ForgotPassword/ForgotPasswordFirstStep';
import ForgotPasswordSecondStep from '@/pages/ForgotPassword/ForgotPasswordSecondStep';
import { forgotPasswordState } from '@/store/users';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

const ForgotPasswordPage = () => {
  const forgotPassword = useRecoilValue(forgotPasswordState);

  return (
    <ForgotPasswordWrapper>
      {forgotPassword.step === 1 ? <ForgotPasswordFirstStep /> : <ForgotPasswordSecondStep />}
    </ForgotPasswordWrapper>
  );
};

const ForgotPasswordWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 20em;
`;

export default ForgotPasswordPage;
