import styled from 'styled-components';
import BannerImg1 from '@/assets/images/001.png';
import BannerImg2 from '@/assets/images/002.png';
import BannerImg3 from '@/assets/images/003.png';
import BannerImg4 from '@/assets/images/004.png';
import { media } from '@/styles/mediaQuery';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useMainContentQuery } from '@/hooks/queries/useQuestion';

const BannerSection = () => {
  const router = useRouter();
  const { data: recent } = useMainContentQuery('recent');
  const { data: point } = useMainContentQuery('point');
  const { data: random } = useMainContentQuery('random');
  const { data: popular } = useMainContentQuery('popular');

  const handleBannerClick = (id: number) => {
    if (!id) return;
    router.push(`question/detail/${id}`);
  };

  return (
    <BannerContainer>
      <Image
        src={BannerImg1}
        width={200}
        height={200}
        placeholder="blur"
        onClick={() => handleBannerClick(recent.questionId)}
      />
      <Image
        src={BannerImg2}
        width={200}
        height={200}
        placeholder="blur"
        onClick={() => handleBannerClick(point.questionId)}
      />
      <Image
        src={BannerImg3}
        width={200}
        height={200}
        placeholder="blur"
        onClick={() => handleBannerClick(random.questionId)}
      />
      <Image
        src={BannerImg4}
        width={200}
        height={200}
        placeholder="blur"
        onClick={() => handleBannerClick(popular.questionId)}
      />
    </BannerContainer>
  );
};

const BannerContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: white;
  cursor: pointer;
  padding-top: 3em;
  justify-content: space-between;
  padding-bottom: 3em;
  width: 80vw;
  max-width: 850px;
  ${media.tablet} {
    width: 90vw;
  }
  img {
    border-radius: 10px;
    margin: 2em 1em;
    box-shadow: rgb(50 50 93 / 25%) 0px 2px 5px -1px, rgb(0 0 0 / 30%) 0px 1px 3px -1px;
  }
`;

export default BannerSection;
