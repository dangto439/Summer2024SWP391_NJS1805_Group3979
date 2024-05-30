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
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={true}
        modules={autoplay ? [Pagination, Autoplay] : [Pagination]}
        className={`${numberOfSlide > 1 ? "multi-item" : ""}`}
      >
        <SwiperSlide>
          <img
            src="https://i.ytimg.com/vi/G-mmtUxSt5k/maxresdefault.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://i.ytimg.com/vi/G-mmtUxSt5k/maxresdefault.jpg"
            alt=""
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src="https://i.ytimg.com/vi/G-mmtUxSt5k/maxresdefault.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://i.ytimg.com/vi/G-mmtUxSt5k/maxresdefault.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://i.ytimg.com/vi/G-mmtUxSt5k/maxresdefault.jpg"
            alt=""
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
