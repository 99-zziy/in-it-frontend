import Pagination from '@/components/common/Pagination';
import withAuth from '@/components/hoc/withAuth';
import MypageLayout from '@/components/layouts/MypageLayout';
import QuestionListSection from '@/components/mypage/question/QuestionListSection';
import { PAGINATION_SIZE } from '@/constants/paginationSize';
import { useUserQuestionPageQuery } from '@/hooks/queries/useQuestion';
import { useState } from 'react';
import styled from 'styled-components';

const MyQuestion = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: page } = useUserQuestionPageQuery(PAGINATION_SIZE.USER_QUESTION_LIST);

  const handlePageClick = (number: number) => {
    setCurrentPage(number + 1);
  };

  return (
    <MypageLayout>
      <>
        <UserQuestionSection>
          <QuestionListSection currentPage={currentPage} />
        </UserQuestionSection>
        <Pagination totalPage={page?.count} currentPage={currentPage} onPageClick={handlePageClick} />
      </>
    </MypageLayout>
  );
};

const UserQuestionSection = styled.ul`
  padding-top: 10px;
`;

export default withAuth(MyQuestion);
