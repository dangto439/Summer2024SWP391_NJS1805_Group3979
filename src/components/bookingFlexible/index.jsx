import "./index.scss";
import { Button, Form, Input, InputNumber } from "antd";

const BookingFlexible = ({ club }) => {
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
    <div className="booking-form-container">
      <div className="booking-form-wrapper">
        <h1>Đặt lịch linh hoạt</h1>
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

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default BookingFlexible;
