import QuestionSection from '@/pages/Main/Section/QuestionSection';
import AnswerSection from '@/pages/MyPage/Section/AnswerSection';
import CommentSection from '@/pages/MyPage/Section/CommentSection';
import ProfileSection from '@/pages/MyPage/Section/ProfileSection';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const createSection = (tabIndex?: string) => {
  if (tabIndex === 'profile') return <ProfileSection />;
  if (tabIndex === 'question') return <QuestionSection />;
  if (tabIndex === 'answer') return <AnswerSection />;
  if (tabIndex === 'comment') return <CommentSection />;
};

const Section = () => {
  const { tabIndex } = useParams<{ tabIndex?: string }>();

  return (
    <SectionWrapper>
      <SectionPanel>{createSection(tabIndex)}</SectionPanel>
    </SectionWrapper>
  );
};

const SectionWrapper = styled.div`
  height: calc(100vh - 110px);
  padding-left: 10%;
  padding-right: 10%;
`;

const SectionPanel = styled.div`
  background-color: white;
  min-height: 50vh;
  border: 1px solid #e9ecef;
  border-radius: 8px;
`;

export default Section;