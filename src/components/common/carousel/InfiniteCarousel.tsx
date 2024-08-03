import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import '@style/web/components/common/carousel/infiniteCarousel.scss';

type InfiniteCarouselPropstype = {
  carouselData: {
    url: string;
    title: string;
    writer: string;
    introduceText: string;
  }[];
};

const InfiniteCarousel = ({
  carouselData,
}: InfiniteCarouselPropstype) => {
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
        {carouselData.map((value, key) => (
          <SwiperSlide
            key={key}
            style={{
              height: '100%',
              width: '25rem',
              marginRight: '0px',
            }}
          >
            <div className="blog-wrap">
              <img src={value.url} alt="testimage" />
              <div className="blog-wrap__text-container">
                <span className="blog-wrap__text-container--writer">
                  {value.writer}
                </span>
                <p className="blog-wrap__text-container--title">
                  {value.title}
                </p>
                <p className="blog-wrap__text-container--introduceText">
                  {value.introduceText}
                </p>
                <div className="border__gray" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default InfiniteCarousel;
