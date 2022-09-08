import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import TabPanel from '@/components/mypage/TabPanel';
import styled from 'styled-components';
import { ReactElement } from 'react';
import { media } from '@/styles/mediaQuery';

/* -------------------------------------------------------------------------------------------------
 * MypageLayout -> mypage 레아아웃 (mypage 화면)
 * -----------------------------------------------------------------------------------------------*/

interface MypageLayoutProps {
  children: ReactElement;
}

const MypageLayout = ({ children }: MypageLayoutProps) => {
  return (
    <MyPageContainer>
      <Header />
      <TabPanel />
      <SectionWrapper>
        <SectionPanel>{children}</SectionPanel>
      </SectionWrapper>
      <Footer />
    </MyPageContainer>
  );
};

const MyPageContainer = styled.div`
  background-color: ${({ theme }) => theme.backgrondLightColor};
`;

const SectionWrapper = styled.div`
  height: calc(100vh - 110px);
  width: 80vw;
  max-width: 900px;
  margin: 0 auto;
  ${media.mobile} {
    width: 90vw;
  }
`;

const SectionPanel = styled.div`
  background-color: ${({ theme }) => theme.backgrondDarkColor};
  min-height: 50vh;
  border: 1px solid ${({ theme }) => theme.greyLineColor};
  border-radius: 8px;
`;

export default MypageLayout;