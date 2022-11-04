import Pagination from '@/components/common/Pagination';
import AnswerHeader from '@/components/question/detail/answer/AnswerHeader';
import AnswerItem from '@/components/question/detail/answer/AnswerItem';
import { useAnswerPageQuery, useAnswersQuery } from '@/hooks/queries/useAnswer';
import { media } from '@/styles/mediaQuery';
import { Suspense, useEffect, useState } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { Question } from '@/types/response/questions';
import { PAGINATION_SIZE } from '@/constants/paginationSize';
import { useRecoilValue } from 'recoil';
import { userState } from '@/store/users';
import { Answer } from '@/types/response/answers';
import AnswerListSkeleton from '@/components/question/detail/answer/AnswerSection/index.skeleton';
import RetryErrorBoundary from '@/components/common/errorrBoundary/RetryErrorBoundary';

const EditorSection = dynamic(() => import('@/components/question/detail/answer/EditorSection'), { ssr: false });

const AnswerSection = ({ question }: { question: Question }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedAnswer, setSortedAnswer] = useState([]);

  const { data: page } = useAnswerPageQuery({ size: PAGINATION_SIZE.ANSWER_LIST, questionId: question.questionId });

  const { data: answers } = useAnswersQuery({
    page: currentPage - 1,
    size: PAGINATION_SIZE.ANSWER_LIST,
    questionId: question.questionId,
  });

  useEffect(() => {
    answers?.sort((a: Answer, b: Answer) => b.selected - a.selected);
    setSortedAnswer(answers);
  }, [answers]);

  const handlePageClick = (number: number) => {
    setCurrentPage(number + 1);
  };

  return (
    <AnswerListSectionWrapper>
      {sortedAnswer &&
        sortedAnswer.map((answer: Answer) => <AnswerItem key={answer.answerId} question={question} {...answer} />)}
      <Pagination totalPage={page?.count} currentPage={currentPage} onPageClick={handlePageClick} />
    </AnswerListSectionWrapper>
  );
};

const AnswerListSection = ({ question }: { question: Question }) => {
  const user = useRecoilValue(userState);

  return (
    <>
      <AnswerHeader answerCount={question.answerCount} />
      <RetryErrorBoundary>
        <Suspense fallback={<AnswerListSkeleton />}>
          <AnswerSection question={question} />
        </Suspense>
      </RetryErrorBoundary>
      <AnswerWriteSectionWrapper>
        <ToastEditorWrapper>
          <Notice>{`${user.nickname}님, 답변해주세요! 😉`}</Notice>
          <EditorSectionWrapper>
            <EditorSection questionId={question.questionId} content={''} />
          </EditorSectionWrapper>
        </ToastEditorWrapper>
      </AnswerWriteSectionWrapper>
    </>
  );
};

const AnswerListSectionWrapper = styled.div`
  width: 85vw;
  max-width: 700px;
  margin: 0 auto;
`;

const AnswerWriteSectionWrapper = styled.div`
  width: 85vw;
  max-width: 700px;
  margin: 3em auto;
`;

const ToastEditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3em 2em;
  margin-top: 2em;
  background-color: ${({ theme }) => theme.backgrondLightColor};
  border: 1px solid ${({ theme }) => theme.greyLineColor};
  border-radius: 5px;
  ${media.mobile} {
    padding: 0;
    border: none;
    background-color: ${({ theme }) => theme.backgrondDarkColor};
  }
`;

const Notice = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 1em;
`;

const EditorSectionWrapper = styled.div`
  width: 85vw;
  max-width: 100%;
  display: flex;
  margin: 0 auto;
  margin-top: 3em;
  padding-bottom: 5em;
  flex-direction: column;
`;

export default AnswerListSection;
