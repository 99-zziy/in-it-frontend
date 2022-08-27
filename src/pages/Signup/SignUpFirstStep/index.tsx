import { sendCode, verifyCode } from '@/api/auth';
import Button from '@/components/Button';
import ValidationInput from '@/components/Input/ValidationInput';
import useValidationInput from '@/hooks/useValidationInput';
import { signUpState } from '@/store/users';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

const SignUpFirstStep = () => {
  const navigate = useNavigate();
  const email = useValidationInput('', 'email');
  const code = useValidationInput('', 'code');
  const [isSentCode, setIsSentCode] = useState(false);
  const setSignUp = useSetRecoilState(signUpState);

  const moveToLogin = () => {
    navigate('/login');
  };

  const handleSendCode = async (email) => {
    if (email.isError) return;
    await sendCode(email);
    setIsSentCode(true);
  };

  const handleVerifyCode = async (code) => {
    if (code.isError) return;
    await verifyCode(code);
    setSignUp({
      step: 2,
      email: email.value,
    });
  };

  return (
    <>
      <ValidationInput input={email} label="이메일" type="email" placeholder="이메일을 입력해주세요." />
      <SendButton onClick={() => handleSendCode(email)}>{'인증번호 전송'}</SendButton>
      <InputCode isSentCode={isSentCode}>
        <ValidationInput input={code} label="인증번호" type="text" placeholder="인증번호" />
        <Button onClick={() => handleVerifyCode(code)}>{'확인'}</Button>
      </InputCode>
      <LoginContainer>
        <span>이미 계정이 있습니까?</span>
        <u onClick={moveToLogin}>로그인하기</u>
      </LoginContainer>
    </>
  );
};

const InputCode = styled.div`
  visibility: ${({ isSentCode }) => (isSentCode ? 'visible' : 'hidden')};
  button {
    width: 100%;
  }
`;

const LoginContainer = styled.div`
  width: 100%;
  justify-content: space-between;
  display: flex;
  span {
    color: white;
    font-size: 0.9rem;
  }
  u {
    color: white;
    font-size: 0.9rem;
    &:hover {
      cursor: pointer;
    }
  }
`;

const SendButton = styled(Button)`
  background-color: ${({ theme }) => theme.primaryColor};
`;
export default SignUpFirstStep;
