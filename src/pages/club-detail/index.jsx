import "./index.scss";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import CallIcon from "@mui/icons-material/Call";
import RoomIcon from "@mui/icons-material/Room";
import PersonIcon from "@mui/icons-material/Person";
import {
  InfoCircleOutlined,
  PictureOutlined,
  UnorderedListOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../config/axios";
import { useParams } from "react-router-dom";
import { Button } from "antd";

function ClubDetail() {
  const { clubId } = useParams();
  const [club, setClub] = useState({});
  const [owner, setOwner] = useState([]);
  // console.log(id);

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
  return (
    <div className="club-detail">
      <h1>{club.clubName}</h1>
      <div className="club-content">
        <div className="club-image">
          <PictureOutlined />
          <h2>HÌNH ẢNH</h2>
          <div className="text-wrap">
            <div className="text-line"></div>
          </div>
          <img src={club.urlImages} alt="Sân Cầu Lông Trúc Long" />
        </div>
        <div className="club-description">
          <InfoCircleOutlined />
          <h2>MÔ TẢ</h2>
          <div className="text-wrap">
            <div className="text-line"></div>
          </div>
          <p>
            {club.description}
            {/* Sân Cầu Lông Trúc Long, Thủ Đức, HCM là sân mới, khai trương đầu năm
            2024. Sân rộng rãi, nhiều sân
          </p>
          <p>Đạt tiêu chuẩn, Giải các SE.</p>
          <p>Sân Cầu Lông TRÚC LONG hiện đang hoạt động với:</p>
          <ul>
            <li>Với kích thước 9 sân tiêu chuẩn.</li>
            <li>Trần cao 12m, Chuẩn Quốc Tế</li>
            <li>
              Khu vệ sinh nằm bên ngoài, không ảnh hưởng sân cầu, có vệ tắm phục
              vụ anh em sau khi đánh cầu.
            </li>
            <li>Hệ thống đèn sáng đạt tiêu chuẩn thi đấu với thoải mái.</li>
            <li>Lối đi chuyển thường rộng, thoải mái.</li>
          </ul>
          <p>
            Các bạn có thể liên hệ: 0865 412 899. Các bạn muốn cái lẻ hoặc sân
            thường xuyên thì cũng vậy nhé!
          </p>
          <p>
            Vị trí ngay gần Vinhome Grand Park, Quận 9 dễ tìm, gần các quận lân
            cận Thủ Đức, Quận 2, Bình Thạnh, Bình Dương,...
          </p>
          <p>
            Với mục tiêu mang lại sân chơi lành mạnh, phù hợp cho mọi lứa tuổi
            nên riêng lẻ hoặc đội liên hệ ban cổ án em mạnh liệt với bộ môn Cầu
            Lông.
          </p>
          <p>
            Sân Cầu Lông đang hoàn thiện để cùng tập hợp toàn những dịch vụ và
            mang đến cho khách hàng những trải nghiệm tốt nhất khi đến sân. */}
          </p>
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
              <RoomIcon fontSize="small" /> {club.clubAddress}, {club.district},{" "}
              {club.province}
            </li>
            <li>
              <i className="fas fa-clock">
                <AccessTimeFilledIcon fontSize="small" />
              </i>{" "}
              {club.openTime}g - {club.closeTime}g
            </li>

            <li>
              <i className="nav-icon fal fa-shuttlecock"></i> Tổng{" "}
              {owner.capacity} sân
            </li>
            <li>
              <i className="club-phone">
                <PersonIcon fontSize="small" />
              </i>{" "}
              {owner.nameOwner}
            </li>
            <li>
              <i className="fas fa-phone">
                <CallIcon fontSize="small" />
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
              <CheckCircleOutlined className="icon" />
              Wifi
            </li>
            <li>
              <CheckCircleOutlined className="icon" />
              Chỗ gửi xe
            </li>
            <li>
              <CheckCircleOutlined className="icon" />
              Nước uống
            </li>
            <li>
              <CheckCircleOutlined className="icon" />
              Ghế nghỉ ngơi
            </li>
            <li>
              <CheckCircleOutlined className="icon" />
              Tổ chức sự kiện giải đấu
            </li>
          </ul>
        </div>
        <Button className="booking-button">Đặt lịch</Button>
      </div>
    </div>
  );
}

export default ClubDetail;
