import { PrimaryColor } from '@/assets/colors';
import Button from '@/components/Button';
import SearchBar from '@/components/SearchBar';
import { loginState } from '@/store/users';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

const Header = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const goToLogin = () => {
    navigate('/login');
  };
  const goToMyPage = () => {
    navigate('/my-page/profile');
  };

  return (
    <HeaderContainer>
      <LeftSection>
        <LogoSection>
          <h1>In it</h1>
          <p>코드리뷰 사이트: in it()</p>
        </LogoSection>
        <SearchBar placeholder="" />
      </LeftSection>
      {isLogin ? (
        <Button onClick={goToMyPage} className={'my-page-button'}>
          {'마이페이지'}
        </Button>
      ) : (
        <Button onClick={goToLogin} className={'login-button'}>
          {'로그인'}
        </Button>
      )}
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  height: 40px;
  background-color: white;
  padding: 10px 10%;
  display: flex;
  justify-content: space-between;
  .login-button {
    border: 1px solid ${PrimaryColor};
    color: ${PrimaryColor};
    background-color: white;
    width: 100px;
    height: 40px;
  }
  .my-page-button {
    border-radius: 0;
    color: ${PrimaryColor};
    background-color: white;
    width: 100px;
    height: 40px;
  }
`;

const LeftSection = styled.div`
  display: flex;
`;

const LogoSection = styled.div`
  margin-right: 20px;
  h1 {
    font-size: 1.3rem;
    font-weight: 800;
    color: ${PrimaryColor};
  }
  p {
    font-size: 0.6rem;
    font-weight: 800;
    color: ${PrimaryColor};
  }
`;

export default Header;