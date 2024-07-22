import InfiniteCarousel from '@components/web/carousel/InfiniteCarousel';
import TestImage from '../../assets/test/home__carousel_test-image.avif';
import '@style/web/pages/web/home.scss';

const Home = () => {
  const carouselData = [
    {
      url: TestImage,
      title: '제목',
      writer: '글쓴이',
      introduceText:
        'blablablablablabl ablablablablablablablablablab lablablablablabl ablablablablab lablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla',
    },
    {
      url: TestImage,
      title: '제목',
      writer: '글쓴이',
      introduceText:
        'blablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla',
    },
    {
      url: TestImage,
      title: '제목',
      writer: '글쓴이',
      introduceText:
        'blablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla',
    },
    {
      url: TestImage,
      title: '제목',
      writer: '글쓴이',
      introduceText:
        'blablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla',
    },
    {
      url: TestImage,
      title: '제목',
      writer: '글쓴이',
      introduceText:
        'blablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla',
    },
    {
      url: TestImage,
      title: '제목',
      writer: '글쓴이',
      introduceText:
        'blablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla',
    },
    {
      url: TestImage,
      title: '제목',
      writer: '글쓴이',
      introduceText:
        'blablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla',
    },
    {
      url: TestImage,
      title: '제목',
      writer: '글쓴이',
      introduceText:
        'blablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla',
    },
    {
      url: TestImage,
      title: '제목',
      writer: '글쓴이',
      introduceText:
        'blablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla',
    },
    {
      url: TestImage,
      title: '제목',
      writer: '글쓴이',
      introduceText:
        'blablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla',
    },
    {
      url: TestImage,
      title: '제목',
      writer: '글쓴이',
      introduceText:
        'blablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla',
    },
    {
      url: TestImage,
      title: '제목',
      writer: '글쓴이',
      introduceText:
        'blablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla',
    },
    {
      url: TestImage,
      title: '제목',
      writer: '글쓴이',
      introduceText:
        'blablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla',
    },
    {
      url: TestImage,
      title: '제목',
      writer: '글쓴이',
      introduceText:
        'blablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla',
    },
    {
      url: TestImage,
      title: '제목',
      writer: '글쓴이',
      introduceText:
        'blablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla',
    },
    {
      url: TestImage,
      title: '제목',
      writer: '글쓴이',
      introduceText:
        'blablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla',
    },
    {
      url: TestImage,
      title: '제목',
      writer: '글쓴이',
      introduceText:
        'blablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla',
    },
  ];
  return (
    <main>
      <section>
        <InfiniteCarousel carouselData={carouselData} />
      </section>
    </main>
  );
};

export default Home;
