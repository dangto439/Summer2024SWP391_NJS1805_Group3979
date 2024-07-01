import "./index.scss";
import { useNavigate } from "react-router-dom";
import RoomIcon from "@mui/icons-material/Room";
import { useEffect, useState } from "react";
import api from "../../config/axios";
import dataProvnices from "../../../province";
import { Button, Form, Input, Select } from "antd";

function ListClub() {
  const [listClub, setListClub] = useState([]);
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState("");
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const handleCityChange = (event) => {
    const city = event;
    console.log(city);
    setSelectedCity(city);
    setDistricts(dataProvnices[city] || []);
    setSelectedDistrict("");
  };

  const handleDistrictChange = (event) => {
    console.log(event);
    setSelectedDistrict(event);
  };

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
    <div className="list-club">
      <h1>SÂN CẦU LÔNG VIỆT NAM</h1>
      <div className="list-club-outstanding">
        <div className="list-club-main-image">
          <img src="https://firebasestorage.googleapis.com/v0/b/badminton-booking-platform.appspot.com/o/16e57efc9d56c29d4ab7a651bd082efd.jpg?alt=media&token=2fd078ff-5d26-4bb3-9b34-583a626fd7b7" />
        </div>

        <div className="list-club-outstanding-info">
          <h2>Các sân nổi bật</h2>
          <div className="text-wrap">
            <div className="text-line"></div>
          </div>
          {listClub.map((club) => (
            <>
              <div
                key={club.clubId}
                className="list-club-outstanding-info-card"
              >
                <div className="list-club-outstanding-image">
                  <img
                    onClick={() => handleShowDetailClub(club)}
                    src={club.urlImages}
                    alt="none"
                  />
                </div>
                <div className="list-club-outstanding-name">
                  <h2 onClick={() => handleShowDetailClub(club)}>
                    {club.clubName}
                  </h2>
                  <p>
                    <i className="list-club-outstanding-address"></i>
                    <RoomIcon fontSize="small" /> {club.clubAddress},{""}
                    {club.district}, {club.province}
                  </p>
                </div>
              </div>
              <div className="text-wrap">
                <div className="text-line"></div>
              </div>
            </>
          ))}
        </div>
      </div>

      <div className="list-club-search">
        <Form className="form-search">
          <div className="list-club-search-name">
            <Form.Item>
              <Input placeholder="Nhập tên sân cần tìm..." />
            </Form.Item>
          </div>

          <div className="list-club-location-provinces">
            <Form.Item className="form-item" label="Thành phố/Tỉnh">
              <Select
                style={{ width: 200 }}
                id="city"
                value={selectedCity}
                onChange={handleCityChange}
              >
                <option value="">--Chọn Thành phố--</option>
                {Object.keys(dataProvnices).map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </Select>
            </Form.Item>
          </div>

          <div className="list-club-location-">
            <Form.Item className="form-item" label="Quận/Huyện">
              <Select
                style={{ width: 200 }}
                id="district"
                value={selectedDistrict}
                onChange={handleDistrictChange}
                disabled={!selectedCity}
              >
                <option value="">--Chọn Quận/Huyện--</option>
                {districts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </Select>
            </Form.Item>
          </div>

          <div className="form-search">
            <Button>{/* <SearchOutlined /> */}button</Button>
          </div>
        </Form>
      </div>

      {listClub.map((club) => (
        <>
          <div key={club.clubId} className="list-club-card">
            <div className="list-club-image">
              <img
                onClick={() => handleShowDetailClub(club)}
                src={club.urlImages}
                alt={club.clubName}
              />
            </div>
            <div className="list-club-details">
              <h2 onClick={() => handleShowDetailClub(club)}>
                {club.clubName}
              </h2>
              <p>
                <i className="list-club-address"></i> {club.clubAddress},{" "}
                {club.district}, {club.province}
              </p>
              <p>
                <i className="list-club-clock"></i> {club.openTime} -{" "}
                {club.closeTime}
              </p>
              <p>
                <i className="list-club-phone"></i> Hotline: {club.hotline}
              </p>
              <p className="list-club-description">{club.description}</p>

              <div className="buttons">
                <button
                  className="booking-button"
                  onClick={() => handleBooking(club)}
                >
                  Đặt lịch
                </button>
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
}

export default ListClub;
