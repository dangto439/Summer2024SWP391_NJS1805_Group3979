import { useLocation, useNavigate } from "react-router-dom";
import { Button, Result } from "antd";
import api from "../../config/axios";

// Utility function to parse query parameters
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Payment({ transactionType }) {
  const query = useQuery();
  const navigate = useNavigate();

  // const vnp_OrderInfo = query.get("vnp_OrderInfo");
  const vnp_Amount = query.get("vnp_Amount");
  const vnp_BankCode = query.get("vnp_BankCode"); // ngân hàng giao dịch
  const vnp_PayDate = query.get("vnp_PayDate");
  const vnp_ResponseCode = query.get("vnp_ResponseCode");
  const walletId = query.get("walletId"); //thanh cong thi goi api DEPOSIT (post)
  const transactionId = query.get("transactionId"); //-> update transaction transactionId vơi data transactionType ()
  // const VND = new Intl.NumberFormat("vi-VN", {
  //   style: "currency",
  //   currency: "VND",
  // });

  const handleClickHome = () => {
    navigate("/");
  };

  const isSuccess = Number(vnp_ResponseCode) === 0;

  return (
    <div className="ReturnPay container">
      {isSuccess ? (
        <Result
          status="success"
          title="Bạn đã thanh toán thành công"
          subTitle={
            <>
              Ngân hàng giao dịch: {vnp_BankCode} <br />
              Ngày thanh toán: {vnp_PayDate} <br />
              Số tiền thanh toán: {vnp_Amount / 100} VND
            </>
          }
          extra={[
            <Button type="primary" key="console" onClick={handleClickHome}>
              Quay lại trang chủ
            </Button>,
            <Button key="buy">Xem lại lịch sử đặt sân</Button>,
          ]}
        />
      ) : (
        <Result
          status="error"
          title="Thanh toán thất bại"
          subTitle={`Mã giao dịch: ${vnp_BankCode}.`}
          extra={[
            <Button type="primary" key="console" onClick={handleClickHome}>
              Quay lại trang chủ
            </Button>,
            <Button key="buy">Đặt lịch lại</Button>,
          ]}
        />
      )}
    </div>
  );
}

export default Payment;
