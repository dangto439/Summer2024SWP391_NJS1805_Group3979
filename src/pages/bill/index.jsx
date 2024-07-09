import "./index.scss";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../config/axios";
import { useState, useEffect } from "react";
import moment from "moment";
import { message } from "antd";

function Bill() {
  const user = useSelector(selectUser);
  const location = useLocation();
  const navigate = useNavigate();
  const { type, booking, club } = location.state;
  const [result, setResult] = useState([]);
  const [customerWallet, setCustomerWallet] = useState([]);
  const [clubOwnerWallet, setClubOwnerWallet] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    moment().format("DD-MM-YYYY")
  );

  useEffect(() => {
    fetchWallet();
    switch (type) {
      case "FLEXIBLE":
        handleBookingFlexible();
        break;
      case "FIXED":
        handleBookingFixed();
        break;
      case "DAILY":
        handleBookingDaily();
        break;
      default:
        break;
    }
  }, [type]);

  const fetchWallet = async () => {
    try {
      const [customerResponse, clubOwnerResponse] = await Promise.all([
        api.get(`wallet/${user.id}`),
        api.get(`wallet-owner/${club}`),
      ]);

      setCustomerWallet(customerResponse.data);
      setClubOwnerWallet(clubOwnerResponse.data);
    } catch (error) {
      message.error("Failed to fetch wallet information");
    }
  };

  const handleBookingFlexible = async () => {
    const response = await api.post(`booking/flexible`, booking);
    setResult(response.data);
  };

  const handleBookingFixed = async () => {
    const response = await api.post(`booking/fixed`, booking);
    setResult(response.data);
    console.log(response.data.bookingDetailResponseList);
    // Handle response or update state as needed
  };

  const handleBookingDaily = async () => {
    const response = await api.post(`booking/daily`, booking);
    setResult(response.data);
    console.log(response.data);
    // Handle response or update state as needed
  };

  const handleCreateTransactionAndWallet = async (bookingtransfer) => {
    const reponse = await api.post("/wallet/transfer-booking", bookingtransfer);
    console.log(reponse.data);
  };

  const handleSubmit = async () => {
    try {
      const bookingtransfer = {
        senderWalletId: customerWallet.walletId,
        receiverWalletId: clubOwnerWallet.walletId,
        amount: result.totalPrice,
        bookingId: result.bookingId,
      };
      await handleCreateTransactionAndWallet(bookingtransfer);

      navigate("/history-booking");
      message.success("Đặt sân thành công!");
    } catch (error) {
      message.error(error.response.data);
    }
  };
  return (
    <div className="bill-container">
      <div className="bill-header">
        <h1>Hóa đơn</h1>
      </div>
      <div className="bill-body">
        <div className="bill-section">
          <label>Khánh hàng:</label>
          <div className="bill-value">{user.name}</div>
        </div>
        <div className="bill-section">
          <label>Ngày đặt:</label>
          <div className="bill-value">{selectedDate}</div>
        </div>
        <div className="bill-section">
          <label>Loại hình:</label>
          <div className="bill-value">{type}</div>
        </div>
        <label className="label">Chi tiết booking:</label>
        <div className="bill-section">
          {type === "FLEXIBLE" && (
            <div className="bill-section">
              <table className="booking-details" style={{ width: "920px" }}>
                <thead>
                  <tr>
                    <th>Câu lạc bộ</th>
                    <th>Số giờ chơi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{result.clubName}</td>
                    <td>{result.amountTime} giờ</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="bill-section">
          {type === "FIXED" && (
            <div className="bill-section">
              <table className="booking-details" style={{ width: "920px" }}>
                <thead>
                  <tr>
                    <th>Câu lạc bộ</th>
                    <th>Tên sân</th>
                    <th>Ngày chơi</th>
                    <th>Giá</th>
                  </tr>
                </thead>
                <tbody>
                  {result.bookingDetailResponseList &&
                    result.bookingDetailResponseList.map((detail) => (
                      <tr key={detail.bookingDetailId}>
                        <td>{result.clubName}</td>
                        <td>{detail.courtName}</td>
                        <td>{detail.playingDate}</td>
                        <td>{detail.price}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="bill-section">
          {type === "DAILY" && (
            <div className="bill-section">
              <table className="booking-details" style={{ width: "920px" }}>
                <thead>
                  <tr>
                    <th>Câu lạc bộ</th>
                    <th>Tên sân</th>
                    <th>Ngày chơi</th>
                    <th>Giá</th>
                  </tr>
                </thead>
                <tbody>
                  {result.bookingDetailResponseList &&
                    result.bookingDetailResponseList.map((detail) => (
                      <tr key={detail.bookingDetailId}>
                        <td>{result.clubName}</td>
                        <td>{detail.courtName}</td>
                        <td>{detail.playingDate}</td>
                        <td>{detail.price}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="bill-section">
          <label>Giá tạm tính:</label>
          <div className="bill-value">{result.temporaryPrice}</div>
        </div>
        <div className="bill-section">
          <label>Giá giảm:</label>
          <div className="bill-value">{result.discountPrice}</div>
        </div>
        <div className="bill-section total-amount">
          <label>Tổng tiền:</label>
          <div className="bill-value">{result.totalPrice}</div>
        </div>
      </div>
      <div className="bill-footer">
        <button onClick={handleSubmit}>Đặt sân</button>
      </div>
    </div>
  );
}

export default Bill;
