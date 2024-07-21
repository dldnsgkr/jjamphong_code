import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const InfiniteCarousel = () => {
  const settings = {
    dots: false,
    infinite: true, // 무한 스크롤
    speed: 500, // 애니메이션 속도
    slidesToShow: 1, // 한 번에 표시할 슬라이드 수
    slidesToScroll: 1, // 한 번에 스크롤할 슬라이드 수
    autoplay: true, // 자동 재생
    autoplaySpeed: 2000, // 자동 재생 속도 (ms)
    cssEase: 'linear', // 부드러운 스크롤
  };
  return (
    <Slider {...settings}>
      <div>
        <h3>Slide 1</h3>
      </div>
      <div>
        <h3>Slide 2</h3>
      </div>
      <div>
        <h3>Slide 3</h3>
      </div>
      <div>
        <h3>Slide 4</h3>
      </div>
    </Slider>
  );
};

export default InfiniteCarousel;
