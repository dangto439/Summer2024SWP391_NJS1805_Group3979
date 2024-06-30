import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Form, Select } from "antd";
import PlaceIcon from "@mui/icons-material/Place";
import "./index.scss";
import dataProvnices from "../../../province";

const InputLocation = () => {
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

  return (
    <div className="input-location">
      <div className="input-location-form">
        <div className="input-location-welcome">
          <h1 className="h1-input-location">Xin chào!</h1>
          <h4>Chơi cầu lông ngay với DatSan79</h4>
        </div>

        <Form className="form-location" labelCol={{ span: 24 }}>
          <div className="form-group-location">
            <div className="form-icon">
              <PlaceIcon fontSize="large" />
            </div>
            <Form.Item className="form-item" label="Thành phố">
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

          <div className="form-group-location">
            <div className="form-icon">
              <PlaceIcon fontSize="large" />
            </div>

            <Form.Item className="form-item" label="Quận">
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
            <Button>
              <SearchOutlined />
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default InputLocation;
