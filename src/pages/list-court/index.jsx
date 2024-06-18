import "./index.scss";
import { Button, Image } from "antd";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";

function ListCourt() {
  const listCourt = [
    {
      key: "1",
      clubName: "John Brown",
      clubAddress:
        "992 Đ. Nguyễn Duy Trinh, PHƯỜNG PHÚ HỮU, THÀNH PHỐ THỦ ĐỨC, Hồ Chí Minh",
      openTime: "5:00",
      closeTime: "23:00",
      hotline: "1900-9999",
      description:
        "SÂN CẦU LÔNG VŨ TRỤ, THỦ ĐỨC, HCM Có 2 sân 8-9, có sân trần cao thoáng mát. Sân thảm mới. Sân chơi buổi trưa nhưng vẫn mát, không bị hầm nóng, wc sang và sạch sẽ. Bãi xe rộng, nv thân..",
      urlImages:
        "https://khanhanlaw.com/Uploads/xin-cap-phep-kinh-doanh-mon-the-thao-cau-long-1.jpg",
    },
    {
      key: "1",
      clubName: "John Brown",
      clubAddress:
        "992 Đ. Nguyễn Duy Trinh, PHƯỜNG PHÚ HỮU, THÀNH PHỐ THỦ ĐỨC, Hồ Chí Minh",
      openTime: "5:00",
      closeTime: "23:00",
      hotline: "1900-9999",
      description:
        "SÂN CẦU LÔNG VŨ TRỤ, THỦ ĐỨC, HCM Có 2 sân 8-9, có sân trần cao thoáng mát. Sân thảm mới. Sân chơi buổi trưa nhưng vẫn mát, không bị hầm nóng, wc sang và sạch sẽ. Bãi xe rộng, nv thân..",
      urlImages:
        "https://khanhanlaw.com/Uploads/xin-cap-phep-kinh-doanh-mon-the-thao-cau-long-1.jpg",
    },
    {
      key: "1",
      clubName: "John Brown",
      clubAddress:
        "992 Đ. Nguyễn Duy Trinh, PHƯỜNG PHÚ HỮU, THÀNH PHỐ THỦ ĐỨC, Hồ Chí Minh",
      openTime: "5:00",
      closeTime: "23:00",
      hotline: "1900-9999",
      description:
        "SÂN CẦU LÔNG VŨ TRỤ, THỦ ĐỨC, HCM Có 2 sân 8-9, có sân trần cao thoáng mát. Sân thảm mới. Sân chơi buổi trưa nhưng vẫn mát, không bị hầm nóng, wc sang và sạch sẽ. Bãi xe rộng, nv thân..",
      urlImages:
        "https://khanhanlaw.com/Uploads/xin-cap-phep-kinh-doanh-mon-the-thao-cau-long-1.jpg",
    },
    {
      key: "1",
      clubName: "John Brown",
      clubAddress:
        "992 Đ. Nguyễn Duy Trinh, PHƯỜNG PHÚ HỮU, THÀNH PHỐ THỦ ĐỨC, Hồ Chí Minh",
      openTime: "5:00",
      closeTime: "23:00",
      hotline: "1900-9999",
      description:
        "SÂN CẦU LÔNG VŨ TRỤ, THỦ ĐỨC, HCM Có 2 sân 8-9, có sân trần cao thoáng mát. Sân thảm mới. Sân chơi buổi trưa nhưng vẫn mát, không bị hầm nóng, wc sang và sạch sẽ. Bãi xe rộng, nv thân..",
      urlImages:
        "https://khanhanlaw.com/Uploads/xin-cap-phep-kinh-doanh-mon-the-thao-cau-long-1.jpg",
    },
    {
      key: "1",
      clubName: "John Brown",
      clubAddress:
        "992 Đ. Nguyễn Duy Trinh, PHƯỜNG PHÚ HỮU, THÀNH PHỐ THỦ ĐỨC, Hồ Chí Minh",
      openTime: "5:00",
      closeTime: "23:00",
      hotline: "1900-9999",
      description:
        "SÂN CẦU LÔNG VŨ TRỤ, THỦ ĐỨC, HCM Có 2 sân 8-9, có sân trần cao thoáng mát. Sân thảm mới. Sân chơi buổi trưa nhưng vẫn mát, không bị hầm nóng, wc sang và sạch sẽ. Bãi xe rộng, nv thân..",
      urlImages:
        "https://khanhanlaw.com/Uploads/xin-cap-phep-kinh-doanh-mon-the-thao-cau-long-1.jpg",
    },

    // Add more courts here
  ];

  return (
    <div className="list-court">
      {listCourt.map((court) => (
        <>
          <div key={court.key} className="list-court-card">
            <div className="list-court-image">
              <Image src={court.urlImages} alt={court.clubName} />
            </div>
            <div className="list-court-details">
              <h2>{court.clubName}</h2>
              <p>
                <i className="list-court-address"></i> {court.clubAddress}
              </p>
              <p>
                <i className="list-court-clock"></i> {court.openTime} -{" "}
                {court.closeTime}
              </p>
              <p>
                <i className="list-court-phone"></i> Hotline: {court.hotline}
              </p>
              <p className="list-court-description">{court.description}</p>

              <div className="buttons">
                <Button className="booking-button">
                  <Link to="/court-detail" />
                  Đặt lịch
                </Button>

                <Button className="details-button">
                  <Link to="/court-detail" />
                  Chi tiết
                </Button>
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
}

export default ListCourt;
