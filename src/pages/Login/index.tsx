import Button from '@/components/Button';
import ValidationInput from '@/components/Input/ValidationInput';
import { useLoginMutation } from '@/hooks/queries/useUser';
import useValidationInput, { UseValidationInputReturn } from '@/hooks/useValidationInput';
import { loginState } from '@/store/users';
import { media } from '@/styles/mediaQuery';
import { validateLoginEmail, validateLoginPwd, VALIDATION_ERROR_MSG } from '@/utils/validations';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

const LoginPage = () => {
  const navigate = useNavigate();
  const email = useValidationInput('', validateLoginEmail);
  const password = useValidationInput('', validateLoginPwd);

  const setIsLogin = useSetRecoilState(loginState);
  const mutationLogin = useLoginMutation({
    onSuccess: () => {
      navigate('/');
      setIsLogin(true);
    },
  });

  const moveToSignUp = () => {
    navigate('/sign-up');
  };

  const moveToForgotPassword = () => {
    navigate('/forgot-password');
  };

  const handleLogin = (email: UseValidationInputReturn, password: UseValidationInputReturn) => {
    email.checkValidation();
    password.checkValidation();
    if (email.isValid && password.isValid) {
      mutationLogin.mutate({ email: email.value, password: password.value });
    }
  };

  return (
    <LoginContainer>
      <ValidationInput
        type={'email'}
        placeholder={'이메일을 입력해주세요'}
        value={email.value}
        onChange={email.onChange}
        isValid={email.isValid}
        msg={VALIDATION_ERROR_MSG.EMPTY_EMAIL}
      />
      <ValidationInput
        type={'password'}
        placeholder={'비밀번호를 입력해주세요'}
        value={password.value}
        onChange={password.onChange}
        isValid={password.isValid}
        msg={VALIDATION_ERROR_MSG.EMPTY_PASSWORD}
      />
      <LoginButton onClick={() => handleLogin(email, password)}>{'로그인'}</LoginButton>
      <SignUpContainer>
        <u onClick={moveToForgotPassword}>비밀번호 찾기</u>
        <u onClick={moveToSignUp}>회원가입</u>{' '}
      </SignUpContainer>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 20em;
  ${media.mobile} {
    width: 300px;
  }
  img {
    width: 150px;
    margin-bottom: 2em;
  }
`;

const SignUpContainer = styled.div`
  justify-content: space-between;
  display: flex;
  margin-top: 1em;
  u {
    color: ${({ theme }) => theme.pointColor};
    font-size: 0.9rem;
    &:hover {
      cursor: pointer;
    }
  }
`;

const LoginButton = styled(Button)`
  background-color: ${({ theme }) => theme.primaryColor};
  border-radius: 0;
`;

export default LoginPage;
