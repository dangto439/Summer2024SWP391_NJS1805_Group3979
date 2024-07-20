import { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./index.scss";
// import "./styles.css";

// import required modules
import {
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
  Autoplay,
} from "swiper/modules";
import { useNavigate } from "react-router-dom";
import api from "../../config/axios";

export default function CarouselClub() {
  const [listClub, setListClub] = useState([]);
  const [listClubOutstanding, setListClubOutstanding] = useState([]);
  const navigate = useNavigate();
  const fetchListClubData = async () => {
    try {
      const response = await api.get("/clubs/10");
      const responseOutstanding = await api.get("/clubs/outstanding");
      setListClubOutstanding(responseOutstanding.data);
      setListClub(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchListClubData();
  }, []);
  const handleBooking = (club) => {
    // console.log(club);
    navigate(`/booking/${club.clubId}`);
    // navigate(`/booking/${club}`);
  };

  const handleShowDetailClub = (club) => {
    console.log(club);
    navigate(`/club-detail/${club.clubId}`);
  };
  return (
    <>
      <div className="carousel-club-header">
        <h1 className="carousel-club-title">DANH SÁCH CÁC SÂN CẦU LÔNG MỚI</h1>
      </div>
      <Swiper
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        slidesPerView={2}
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
        className="mySwiper"
      >
        <div className="carousel-club">
          {listClub.map((club) => (
            <>
              <SwiperSlide>
                <div key={club.clubId} className="carousel-club-card">
                  <div className="carousel-club-image">
                    <img
                      onClick={() => handleShowDetailClub(club)}
                      src={
                        club.urlImages ||
                        "https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko="
                      }
                      alt={club.clubName}
                      onError={(e) => {
                        e.target.onerror = null; // disable the error handling after first error
                        e.target.src =
                          "https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko=";
                      }}
                    />
                  </div>
                  <div className="carousel-club-details">
                    <h2 onClick={() => handleShowDetailClub(club)}>
                      {club.clubName}
                    </h2>
                    <p>
                      <i className="carousel-club-address"></i>{" "}
                      {club.clubAddress}, {club.district}, {club.province}
                    </p>
                    <p>
                      <i className="carousel-club-clock"></i> {club.openTime}:00
                      - {club.closeTime}:00
                    </p>
                    <p>
                      <i className="carousel-club-phone"></i> Hotline:{" "}
                      {club.hotline}
                    </p>
                    <p className="carousel-club-description">
                      {club.description}
                    </p>

                    <div className="buttons">
                      <button
                        className="booking-button-carousel"
                        onClick={() => handleBooking(club)}
                      >
                        Đặt lịch
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </>
          ))}
        </div>
      </Swiper>

      <div className="carousel-club-header">
        <h1 className="carousel-club-title">
          DANH SÁCH CÁC SÂN CẦU LÔNG NỔI BẬT
        </h1>
      </div>
      <Swiper
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
        }}
        slidesPerView={2}
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
        className="mySwiper"
      >
        <div className="carousel-club">
          {listClubOutstanding.map((club) => (
            <>
              <SwiperSlide>
                <div key={club.clubId} className="carousel-club-card">
                  <div className="carousel-club-image">
                    <img
                      onClick={() => handleShowDetailClub(club)}
                      src={
                        club.urlImages ||
                        "https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko="
                      }
                      alt={club.clubName}
                      onError={(e) => {
                        e.target.onerror = null; // disable the error handling after first error
                        e.target.src =
                          "https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko=";
                      }}
                    />
                  </div>
                  <div className="carousel-club-details">
                    <h2 onClick={() => handleShowDetailClub(club)}>
                      {club.clubName}
                    </h2>
                    <p>
                      <i className="carousel-club-address"></i>{" "}
                      {club.clubAddress}, {club.district}, {club.province}
                    </p>
                    <p>
                      <i className="carousel-club-clock"></i> {club.openTime}:00
                      - {club.closeTime}:00
                    </p>
                    <p>
                      <i className="carousel-club-phone"></i> Hotline:{" "}
                      {club.hotline}
                    </p>
                    <p className="carousel-club-description">
                      {club.description}
                    </p>

                    <div className="carousel-buttons">
                      <button
                        className="booking-button"
                        onClick={() => handleBooking(club)}
                      >
                        Đặt lịch
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </>
          ))}
        </div>
      </Swiper>
    </>
  );
}
