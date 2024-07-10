import "./index.scss";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import { GiTennisCourt } from "react-icons/gi";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import {
  InfoCircleOutlined,
  PictureOutlined,
  UnorderedListOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../config/axios";
import { useNavigate, useParams } from "react-router-dom";

function ClubDetail() {
  const { clubId } = useParams();
  const [club, setClub] = useState({});
  const [owner, setOwner] = useState([]);
  const navigate = useNavigate();

  const getClubById = async () => {
    try {
      const response = await api.get(`/club/${clubId}`);
      const answer = await api.get(`/club/name-club-owner/${clubId}`);
      console.log(response.data);
      setClub(response.data);
      setOwner(answer.data);
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  useEffect(() => {
    getClubById();
  }, [clubId]);

  const handleBooking = (club) => {
    // console.log(club);
    navigate(`/booking/${club.clubId}`);
    // navigate(`/booking/${club}`);
  };
  return (
    <div className="club-detail">
      {/* <div className="club-detail-main-image">
        <img src="https://danviet.mediacdn.vn/296231569849192448/2022/4/28/tien-minh-16511235589661350080581.jpg" />
      </div> */}
      <h1>{club.clubName}</h1>
      <div className="club-content">
        <div className="club-image">
          <PictureOutlined /> <h2>HÌNH ẢNH</h2>
          <div className="text-wrap">
            <div className="text-line"></div>
          </div>
          <img src={club.urlImages} alt={club.clubName} />
        </div>
        <div className="club-description">
          <InfoCircleOutlined /> <h2>MÔ TẢ</h2>
          <div className="text-wrap">
            <div className="text-line"></div>
          </div>
          <p>{club.description}</p>
        </div>
      </div>
      <div className="club-introduction">
        <div className="club-infomation">
          <InfoCircleOutlined />
          <h2>THÔNG TIN CHI TIẾT</h2>
          <div className="text-wrap">
            <div className="text-line"></div>
          </div>
          <ul>
            <li>
              <i className="fas fa-map-marker-alt"></i>
              <RoomOutlinedIcon fontSize="small" /> {club.clubAddress},{" "}
              {club.district}, {club.province}
            </li>
            <li>
              <i className="fas fa-clock">
                <AccessTimeIcon fontSize="small" />
              </i>{" "}
              {club.openTime}g - {club.closeTime}g
            </li>

            <li>
              <i className="nav-icon fal fa-shuttlecock">
                <GiTennisCourt />
              </i>{" "}
              Tổng {owner.capacity} sân
            </li>
            <li>
              <i className="club-phone">
                <PersonOutlineOutlinedIcon fontSize="small" />
              </i>{" "}
              {owner.nameOwner}
            </li>
            <li>
              <i className="fas fa-phone">
                <PhoneOutlinedIcon fontSize="small" />
              </i>{" "}
              {club.hotline}
            </li>
            
          </ul>
        </div>

        <div className="club-utilities">
          <UnorderedListOutlined />
          <h2>TIỆN ÍCH</h2>
          <div className="text-wrap">
            <div className="text-line"></div>
          </div>
          <ul>
            <li>
              <CheckCircleOutlined className="icon" /> Wifi
            </li>
            <li>
              <CheckCircleOutlined className="icon" /> Chỗ gửi xe
            </li>
            <li>
              <CheckCircleOutlined className="icon" /> Nước uống
            </li>
            <li>
              <CheckCircleOutlined className="icon" /> Ghế nghỉ ngơi
            </li>
            <li>
              <CheckCircleOutlined className="icon" /> Tổ chức sự kiện giải đấu
            </li>
          </ul>
        </div>
        <div className="club-booking-button">
        
            <button
            onClick={() => handleBooking(club)}
            className="booking-button-detail"
          >
            <p>Đặt lịch ngay</p>
          </button>
           
        </div>
      </div>
    </div>
  );
}

export default ClubDetail;
