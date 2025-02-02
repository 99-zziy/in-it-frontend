import styled from 'styled-components';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';

function Pagination({ totalPage, currentPage, onPageClick }) {
  const pages = Array.from({ length: totalPage }, (v, i) => i);

  if (!totalPage) return <></>;

  return (
    <PaginationContainer>
      <ButtonBackWrapper isShowButton={currentPage !== 1} onClick={() => onPageClick(currentPage - 1)}>
        <IoIosArrowBack className="arrow-button" />
      </ButtonBackWrapper>
      {pages.map((number, index) => (
        <Page key={index} isActive={currentPage === number + 1} onClick={() => onPageClick(number)}>
          {number + 1}
        </Page>
      ))}
      <ButtonForwardWrapper isShowButton={currentPage !== totalPage} onClick={() => onPageClick(currentPage + 1)}>
        <IoIosArrowForward className="arrow-button" />
      </ButtonForwardWrapper>
    </PaginationContainer>
  );
}

const PaginationContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 1em;
  .arrow-button {
    cursor: pointer;
  }
`;

const ButtonBackWrapper = styled.div`
  visibility: ${({ isShowButton }) => (isShowButton ? 'visible' : 'hidden')};
  :hover {
    color: #111;
    font-size: 1.2rem;
  }
`;

const ButtonForwardWrapper = styled.div`
  visibility: ${({ isShowButton }) => (isShowButton ? 'visible' : 'hidden')};
  :hover {
    color: #111;
    font-size: 1.2rem;
  }
`;

const Page = styled.div`
  cursor: pointer;
  width: 30px;
  height: 30px;
  font-size: 1.1rem;
  text-align: center;
  font-weight: ${({ isActive }) => (isActive ? '700' : '400')};
  color: ${({ isActive }) => (isActive ? '#000' : '#333')};
  :hover {
    color: #111;
    font-size: 1.2rem;
  }
`;

export default Pagination;
