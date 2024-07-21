/* eslint-disable react/prop-types */
import { useState } from "react";
import "./index.scss";
import { Button, Col, Form, Input, InputNumber, Row } from "antd";
import moment from "moment";
import api from "../../config/axios";
import { useNavigate } from "react-router-dom";

const BookingFlexible = ({ club }) => {
  const [selectedDate, setSelectedDate] = useState(moment().month());
  const navigate = useNavigate();
  const onChange = (value) => {
    console.log("changed", value);
  };

  const onFinish = async (values) => {
    const bookingflexible = {
      promotionCode: values.promotionCode,
      clubId: club.clubId,
      amountTime: values.amountTime,
    };

    navigate("/bill", {
      state: {
        type: "FLEXIBLE",
        booking: bookingflexible,
        club: club.clubId,
      },
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row className="booking-flexible">
      <Col span={12}>
        <Row className="booking-flexible__header">
          <Col>
            <h1>{club.clubName}</h1>
            <h3>Đặt lịch linh hoạt</h3>
            <p>Tháng: {selectedDate}</p>
            <img src={club.urlImages} alt={club.clubName} />
          </Col>
        </Row>
      </Col>
      <Col span={12} className="booking-flexible__form-wrapper">
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          className="booking-flexible__form"
        >
          <Form.Item
            label="Nhập thời gian bạn muốn chọn:"
            name="amountTime"
            rules={[
              {
                required: true,
                message:
                  "Hãy chọn số tiếng bạn muôn ít nhất 5 tiếng tối đa 50 tiếng",
              },
            ]}
          >
            <InputNumber size="middle" min={5} max={50} onChange={onChange} />
          </Form.Item>

          <Form.Item label="Nhập mã khuyến mãi:" name="promotionCode">
            <Input size="large" />
          </Form.Item>

          <Form.Item className="booking-flexible__submit-button">
            <Button size="large" type="primary" htmlType="submit">
              Thanh Toán
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default BookingFlexible;
