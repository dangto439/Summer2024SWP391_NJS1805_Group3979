/* eslint-disable no-unused-vars */
import "./index.scss";
import { useNavigate, useLocation } from "react-router-dom";
import RoomIcon from "@mui/icons-material/Room";
import { useEffect, useState } from "react";
import api from "../../config/axios";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Pagination } from "antd";
import axios from "axios";

function ListClub() {
  const [listClub, setListClub] = useState([]);
  const [listClubOutstanding, setListClubOutstanding] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5); // Number of clubs per page
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const [provinceGhn, setProvinceGhn] = useState([]);
  const [districtGhn, setDistrictsGhn] = useState([]);
  const session = sessionStorage.getItem("search");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("search");
    if (searchQuery) {
      // setInput(searchQuery);
      handleSearchAPI(searchQuery);
      console.log(searchQuery);
      // console.log(input);
    }
  }, [location.search]);

  const handleCityChange = (event) => {
    const resProv = provinceGhn.find((item) => item.value === event);
    setSelectedCity(resProv.label);
    fetchDistrict(event);
  };

  const handleDistrictChange = (event) => {
    const resDis = districtGhn.find((item) => item.value === event);
    setSelectedDistrict(resDis.label);
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

  const FetchAllProvice = async () => {
    const response = await axios
      .get(
        "https://online-gateway.ghn.vn/shiip/public-api/master-data/province",
        {
          headers: {
            Token: "9f5dafd2-8d28-11ee-af43-6ead57e9219a",
          },
        }
      )
      .then((res) => {
        const formatData = res.data.data.map((province) => ({
          value: province.ProvinceID,
          label: province.ProvinceName,
        }));
        setProvinceGhn(formatData);
      });
  };

  const fetchDistrict = async (data) => {
    const response = await axios
      .get(
        "https://online-gateway.ghn.vn/shiip/public-api/master-data/district",
        {
          params: { province_id: data },
          headers: {
            Token: "9f5dafd2-8d28-11ee-af43-6ead57e9219a",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        const formatData = res.data.data.map((district) => ({
          value: district.DistrictID,
          label: district.DistrictName,
        }));
        setDistrictsGhn(formatData);
      });
  };

  useEffect(() => {
    if (session != "true") {
      fetchListClubData();
    }
    sessionStorage.removeItem("search");
    FetchAllProvice();
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

  const containsString = (mainStr, subStr) => {
    return mainStr.toLowerCase().indexOf(subStr.toLowerCase()) !== -1;
  };

  const handleSearchAPI = async (value) => {
    try {
      const response = await api.get(`/club/name?name=${value}`);
      console.log("API Response Data:", response.data); // Kiểm tra dữ liệu từ API
      setData(response.data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (searchQuery) => {
    console.log(searchQuery);
    setData(
      listClub
        .filter(
          (item) => !searchQuery || containsString(item.clubName, searchQuery)
        )
        .filter(
          (item) => !selectedDistrict || item.district === selectedDistrict
        )
        .filter((item) => !selectedCity || item.province === selectedCity)
    );
  };

  const handleOnSubmit = (value) => {
    handleSearch(value.search);
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
                    options={provinceGhn}
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
                    options={districtGhn}
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
                      <i className="list-club-clock"></i> {club.openTime}:00 -{" "}
                      {club.closeTime}:00
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
