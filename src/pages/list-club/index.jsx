import "./index.scss";
import { Await, useNavigate } from "react-router-dom";
import RoomIcon from "@mui/icons-material/Room";
import { useEffect, useState } from "react";
import api from "../../config/axios";
import dataProvnices from "../../../province";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Pagination } from "antd";

function ListClub() {
  const [listClub, setListClub] = useState([]);
  const [listClubOutstanding, setListClubOutstanding] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5); // Number of clubs per page
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState("");
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);

  const optionsCities = Object.keys(dataProvnices).map((city) => {
    return {
      label: city,
      value: city,
    };
  });
  const optionsDistrict = districts.map((district) => {
    return { label: district, value: district };
  });
  const handleCityChange = (event) => {
    const city = event;
    setSelectedCity(city);
    setDistricts(dataProvnices[city] || []);
    setSelectedDistrict("");
  };

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event);
  };

  const fetchListClubData = async () => {
    try {
      const response = await api.get("/clubs");
      const responseOutstanding = await api.get("/clubs/outstanding");
      setListClubOutstanding(responseOutstanding.data);
      setListClub(response.data);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchListClubData();
  }, []);

  const handleBooking = (club) => {
    navigate(`/booking/${club.clubId}`);
  };

  const handleShowDetailClub = (club) => {
    navigate(`/club-detail/${club.clubId}`);
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };
  const paginatedClubs = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleOnSubmit = (value) => {
    console.log(value);
    console.log(listClub);

    const containsString = (mainStr, subStr) => {
      return mainStr.toLowerCase().indexOf(subStr.toLowerCase()) !== -1;
    };

    setData(
      listClub
        .filter(
          (item) => !value.search || containsString(item.clubName, value.search)
        )
        .filter((item) => !value.district || item.district === value.district)
        .filter((item) => !value.city || item.province === value.city)
    );
  };

  return (
    <div className="list-club">
      <h1>SÂN CẦU LÔNG VIỆT NAM</h1>
      <div className="list-club-outstanding">
        <div className="list-club-main-image">
          <img src="https://media-cdn-v2.laodong.vn/storage/newsportal/2022/12/8/1125177/Tap-Dong-Tac-Co-Ban.jpg" />

          <div className="list-club-all">
            <div className="list-club-search">
              <Form className="form-search" onFinish={handleOnSubmit}>
                <Form.Item name="search">
                  <div className="list-club-search-name">
                    <Input
                      size="large"
                      placeholder="Nhập tên sân cần tìm..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    />
                  </div>
                </Form.Item>

                <Form.Item
                  className="form-item"
                  label="Thành phố/Tỉnh"
                  name="city"
                >
                  <Select
                    size="large"
                    style={{ width: 200 }}
                    className="list-club-location-provinces"
                    onChange={handleCityChange}
                    options={optionsCities}
                    placeholder="Chọn Thành phố/Tỉnh"
                  />
                </Form.Item>

                <Form.Item
                  className="form-item"
                  label="Quận/Huyện"
                  name="district"
                >
                  <Select
                    size="large"
                    className="list-club-location-"
                    style={{ width: 200 }}
                    onChange={handleDistrictChange}
                    disabled={!selectedCity}
                    options={optionsDistrict}
                    placeholder="Chọn Quận/Huyện"
                  />
                </Form.Item>

                <Form.Item>
                  <div className="form-search-button">
                    <Button
                      size="large"
                      className="submit-search-button"
                      htmlType="submit"
                      icon={<SearchOutlined />}
                    ></Button>
                  </div>
                </Form.Item>
              </Form>
            </div>

            {paginatedClubs.map((club) => (
              <>
                <div key={club.clubId} className="list-club-card">
                  <div className="list-club-image">
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
                  <div className="list-club-details">
                    <h2 onClick={() => handleShowDetailClub(club)}>
                      {club.clubName}
                    </h2>
                    <p>
                      <i className="list-club-address"></i> {club.clubAddress},{" "}
                      {club.district}, {club.province}
                    </p>
                    <p>
                      <i className="list-club-clock"></i> {club.openTime}g -{" "}
                      {club.closeTime}g
                    </p>
                    <p>
                      <i className="list-club-phone"></i> Hotline:{" "}
                      {club.hotline}
                    </p>
                    <p className="list-club-description">{club.description}</p>
                    <div className="buttons">
                      <button
                        className="booking-button-list"
                        onClick={() => handleBooking(club)}
                      >
                        Đặt lịch
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ))}
            <Pagination
              className="pagination-club"
              current={currentPage}
              pageSize={pageSize}
              total={data.length}
              onChange={handlePageChange}
              align="center"
            />
          </div>
        </div>

        <div className="list-club-outstanding-info">
          <h2>Các sân nổi bật</h2>
          <div className="text-wrap">
            <div className="text-line"></div>
          </div>
          {listClubOutstanding.map((club) => (
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
                    <RoomIcon fontSize="small" /> {club.clubAddress},{" "}
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
    </div>
  );
}

export default ListClub;
