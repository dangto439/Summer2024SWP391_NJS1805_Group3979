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
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import api from "../../config/axios";

export default function CarouselClub() {
  const [listClub, setListClub] = useState([]);
  const navigate = useNavigate();
  const fetchListClubData = async () => {
    try {
      const response = await api.get("/clubs");
      // console.log(response.data);
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
      <Swiper
        autoplay={{
          delay: 4000,
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
                      src={club.urlImages}
                      alt={club.clubName}
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
                      <i className="carousel-club-clock"></i> {club.openTime} -{" "}
                      {club.closeTime}
                    </p>
                    <p>
                      <i className="carousel-club-phone"></i> Hotline:{" "}
                      {club.hotline}
                    </p>
                    <p className="carousel-club-description">
                      {club.description}
                    </p>

                    <div className="buttons">
                      <Button
                        className="booking-button"
                        onClick={() => handleBooking(club)}
                      >
                        Đặt lịch
                      </Button>
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