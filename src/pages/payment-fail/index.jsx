import { CloseCircleOutlined } from "@ant-design/icons";
import { Button, Result, Typography } from "antd";

function PaymentFail() {
  const { Paragraph, Text } = Typography;
  return (
    <Result
      status="error"
      title="Thanh toán thất bại"
      subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
      extra={[
        <Button type="primary" key="console">
          Quay lại trang chủ
        </Button>,
        <Button key="buy">Đặt lịch lại</Button>,
      ]}
    ></Result>
  );
}

export default PaymentFail;
