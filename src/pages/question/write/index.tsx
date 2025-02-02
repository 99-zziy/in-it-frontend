import BannerSection from '@/components/question/write/BannerSection';
import QuestionLayout from '@/components/layouts/QuestionLayout';
import LoginRequestModal from '@/components/common/dialog/LoginRequestDialog';
import { useRecoilValue } from 'recoil';
import { loginState } from '@/store/users';
import QuestionWriteSection from '@/components/question/write/QuestionWriteSection';
import withAuth from '@/components/hoc/withAuth';

const QuestionWritePage = () => {
  const isLogin = useRecoilValue(loginState);

  return (
    <QuestionLayout>
      <>
        <BannerSection />
        <QuestionWriteSection />
        {isLogin ? null : <LoginRequestModal />}
      </>
    </QuestionLayout>
  );
};

export default withAuth(QuestionWritePage);
