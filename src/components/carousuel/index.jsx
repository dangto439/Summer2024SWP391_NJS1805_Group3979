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
            src="https://www.shutterstock.com/image-photo/badminton-rackets-white-cream-shuttlecocks-600nw-2291468727.jpg"
            alt=""
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src="https://cdn.shopvnb.com/uploads/images/tin_tuc/hinh-anh-vot-cau-long-2-1687828854.webp"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://cdn.shopvnb.com/uploads/images/tin_tuc/top-5-cay-vot-cau-long-lining-duoi-2-trieu-cuc-cao-cap-dang-mua-nhat-vao-dau-nam-2021-1.webp"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://bacgiang.gov.vn/documents/20181/14276331/1654065759193_2.jpg/52ce2036-0c64-4fb4-a8f0-4bb6feeb52b5?t=1654065759200"
            alt=""
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
