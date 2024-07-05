import { useState } from "react";
import "./index.scss";
import { Button, Col, Form, Input, InputNumber, Row } from "antd";
import moment from "moment";

const BookingFlexible = ({ club }) => {
  const [selectedDate, setSelectedDate] = useState(moment().month());
  const onChange = (value) => {
    console.log("changed", value);
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row className="booking-flexible">
      <Col span={7}>
        <Row className="booking-flexible__header">
          <Col>
            <h1>Đặt lịch linh hoạt</h1>
            <h1>Tháng: {selectedDate}</h1>
          </Col>
        </Row>
      </Col>
      <Col span={17} className="booking-flexible__form-wrapper">
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
            label="Nhập thời gian bạn muốn chọn"
            name="amountTime"
            rules={[
              {
                required: true,
                message: "Hãy chọn lượng thời gian ít nhất 10 tiếng",
              },
            ]}
          >
            <InputNumber min={10} defaultValue={10} onChange={onChange} />
          </Form.Item>

          <Form.Item label="Nhập mã khuyến mãi" name="promotionCode">
            <Input />
          </Form.Item>

          <Form.Item className="booking-flexible__submit-button">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default BookingFlexible;
