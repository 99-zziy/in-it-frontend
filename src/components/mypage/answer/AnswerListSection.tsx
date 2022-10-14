import { PAGINATION_SIZE } from '@/constants/paginationSize';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useUserAnswersQuery } from '@/hooks/queries/useAnswer';
import { MyAnswer } from '@/types/response/answers';
import { FiCornerDownRight } from 'react-icons/fi';

const ContentViewer = dynamic(() => import('@/components/common/ContentViewer'), { ssr: false });

const AnswerListFallback = ({ error, resetErrorBoundary }) => (
  <div>
    <p>나의 답글을 불러오는데 실패했어요 😭😭😭 </p>
  </div>
);

const AnswerListLoading = () => <div />;

const AnswerList = ({ currentPage }: { currentPage: number }) => {
  const router = useRouter();

  const { data: answers } = useUserAnswersQuery({
    page: currentPage - 1,
    size: PAGINATION_SIZE.USER_ANSWER_LIST,
  });

  const handleQuestionClick = (questionId: number) => {
    router.push(`/question/detail/${questionId}`);
  };

  return (
    <div>
      {answers?.managedAnswers?.map((answer: MyAnswer) => (
        <AnswerWrapper key={answer.id} onClick={() => handleQuestionClick(answer.questionId)}>
          <QuestionSection>
            <QLabel>Q</QLabel>
            <Title>{answer.questionTitle}</Title>
          </QuestionSection>
          <AnswerSection>
            <Arrow />
            <ALabel>A</ALabel>
            {answer.content && <ContentViewer content={answer.content} length={50} />}
          </AnswerSection>
        </AnswerWrapper>
      ))}
    </div>
  );
};

const AnswerListSection = ({ currentPage }: { currentPage: number }) => (
  <ErrorBoundary FallbackComponent={AnswerListFallback}>
    <Suspense fallback={<AnswerListLoading />}>
      <AnswerList currentPage={currentPage} />
    </Suspense>
  </ErrorBoundary>
);

const AnswerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 20px 4px 16px 30px;
  border-bottom: 1px solid #f2f2f2;
  background: 0;
  font-size: 12px;
  line-height: 1.6;
  letter-spacing: -0.5px;
  cursor: pointer;
  :hover {
    background-color: #f5f5f5;
  }
`;

const ALabel = styled.p`
  font-size: 1rem;
  font-weight: bold;
  margin-right: 0.5em;
  color: ${({ theme }) => theme.pointColor};
`;

const QuestionSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
`;

const AnswerSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
`;

const QLabel = styled.p`
  font-size: 1.1rem;
  font-weight: bold;
  margin-right: 0.5em;
  color: ${({ theme }) => theme.pointColor};
`;

const Title = styled.p`
  display: block;
  overflow: hidden;
  font-weight: bold;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.textColor};
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Arrow = styled(FiCornerDownRight)`
  width: 20px;
  margin-right: 0.5em;
  color: ${({ theme }) => theme.grayColor};
`;

export default AnswerListSection;
