import TestImage from '../../../assets/test/home__carousel_test-image.avif';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import '@style/web/components/carousel/infiniteCarousel.scss';

const InfiniteCarousel = () => {
  const data = [
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
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        // pagination={{
        //   clickable: true,
        // }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        {data.map((value, key) => (
          <SwiperSlide key={key}>
            <div className="blog-wrap">
              <img src={TestImage} alt="testimage" />
              <div className="blog-wrap__text-container">
                <span>{value.writer}</span>
                <p>{value.title}</p>
                <p>{value.introduceText}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default InfiniteCarousel;
