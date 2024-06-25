/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "./index.scss";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Carousel({
  numberOfSlide,
  category,
  autoplay = false,
}) {
  return (
    <div className="carousel">
      <Swiper
        slidesPerView={numberOfSlide}
        spaceBetween={10}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={true}
        modules={autoplay ? [Pagination, Autoplay] : [Pagination]}
        className={`${numberOfSlide > 1 ? "multi-item" : ""}`}
      >
        <SwiperSlide>
          <img
            src="https://elan-inventa.com/sites/default/files/styles/empty/public/produkti/Badminton%201.jpg?itok=GxLeZNas"
            alt=""
          />
        </SwiperSlide>
      </Swiper>
      <div className="infomation">
        <h1>Chào mừng đến với DatSan79</h1>
        <p>
          Bạn đang tìm kiếm một sân cầu lông chất lượng để thỏa mãn đam mê và
          nâng cao kỹ năng? Hãy đến với{" "}
          <span className="highlight">DatSan79</span>, nơi cung cấp những sân
          cầu lông tốt nhất dành cho bạn, giúp bạn dễ dàng tìm và đặt sân cầu
          lông tốt nhất gần bạn. Với cơ sở vật chất hiện đại và tiêu chuẩn quốc
          tế, chúng tôi đảm bảo mang đến cho bạn trải nghiệm chơi cầu lông tuyệt
          vời nhất.
        </p>
        <button>Đặt sân ngay</button>
      </div>
    </div>
  );
}
