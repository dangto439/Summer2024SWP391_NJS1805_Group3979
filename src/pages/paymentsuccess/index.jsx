import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

function PaymentSuccess() {
  const navigate = useNavigate();

  const handleClickHome = () => {
    navigate("/");
  };
  return (
    <div>
      <Result
        status="success"
        title="Bạn đã thanh toán thành công"
        subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
        extra={[
          <Button type="primary" key="console" onClick={handleClickHome}>
            Quay lại trang chủ
          </Button>,
          <Button key="buy">Xem lại lịch sử đặt sân</Button>,
        ]}
      />
    </div>
  );
}

export default PaymentSuccess;
