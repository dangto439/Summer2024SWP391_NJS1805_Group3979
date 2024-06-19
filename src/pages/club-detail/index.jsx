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

function CourtDetail() {
  return (
    <div className="court-detail">
      <h1>Sân Cầu Lông Trúc Long, Thủ Đức, HCM</h1>
      <div className="court-content">
        <div className="court-description">
          <InfoCircleOutlined />
          <h2>MÔ TẢ</h2>
          <div className="text-wrap">
            <div className="text-line"></div>
          </div>
          <p>
            Sân Cầu Lông Trúc Long, Thủ Đức, HCM là sân mới, khai trương đầu năm
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
            mang đến cho khách hàng những trải nghiệm tốt nhất khi đến sân.
          </p>
        </div>
        <div className="court-image">
          <PictureOutlined />
          <h2>HÌNH ẢNH</h2>
          <div className="text-wrap">
            <div className="text-line"></div>
          </div>
          <img
            src="https://khanhanlaw.com/Uploads/xin-cap-phep-kinh-doanh-mon-the-thao-cau-long-1.jpg"
            alt="Sân Cầu Lông Trúc Long"
          />
        </div>
      </div>
      <div className="court-introduction">
        <div className="court-infomation">
          <InfoCircleOutlined />
          <h2>THÔNG TIN CHI TIẾT</h2>
          <div className="text-wrap">
            <div className="text-line"></div>
          </div>
          <ul>
            <li>
              <i className="fas fa-map-marker-alt"></i>
              <RoomIcon fontSize="small" /> 75 Hoàng Hữu Nam, Phường Tân Phú,
              Thành Phố Thủ Đức, Hồ Chí Minh
            </li>
            <li>
              <i className="fas fa-clock">
                <AccessTimeFilledIcon fontSize="small" />
              </i>{" "}
              5:00 - 23:00
            </li>

            <li>
              <i className="fas fa-futbol"></i> Tổng 9 sân
            </li>
            <li>
              <i className="court-phone">
                <PersonIcon fontSize="small" />
              </i>{" "}
              Tsan Tri Duc
            </li>
            <li>
              <i className="fas fa-phone">
                <CallIcon fontSize="small" />
              </i>{" "}
              0865 412 899
            </li>

            <li>
              <i className="fas fa-money-bill-wave"></i> 120,000 VND
            </li>
          </ul>
        </div>

        <div className="court-utilities">
          <UnorderedListOutlined />
          <h2>Tiện Ích</h2>
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
      </div>
    </div>
  );
}

export default CourtDetail;
