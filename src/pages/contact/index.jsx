import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import { Link } from "react-router-dom";
import "./index.scss";

function Contact() {
  const [form] = useForm();

  return (
    <div className="contact">
      <h1>Liên Hệ DatSan3979</h1>
      <p>
        Chúng tôi luôn sẵn sàng lắng nghe ý kiến và phản hồi từ bạn. Hãy liên hệ
        với chúng tôi qua biểu mẫu dưới đây hoặc thông tin liên hệ bên dưới.
      </p>

      <Form
        form={form}
        className="contact-form"
        labelCol={{
          span: 24,
        }}
      >
        <div className="form-group-contact">
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                message: "Email không hợp lệ!",
              },
              {
                required: true,
                message: "Vui lòng nhập Email của bạn!",
              },
            ]}
          >
            <Input
              id="email"
              placeholder="name@gmail.com"
              className="form-input-contact"
            />
          </Form.Item>
        </div>

        <div className="form-group-contact">
          <Form.Item
            label="Tên của bạn"
            name="name"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên của bạn!",
              },
            ]}
          >
            <Input
              id="name"
              placeholder="Name"
              className="form-input-contact"
            />
          </Form.Item>
        </div>

        <div className="form-group-contact">
          <Form.Item
            label="Điện thoại"
            name="phone"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số điện thoại của bạn!",
              },
              {
                pattern: /^\d{10}$/,
                message: "Vui lòng nhập số điện thoại hợp lệ gồm 10 chữ số!",
              },
            ]}
          >
            <Input
              id="phone"
              placeholder="(+84) 123-456-789"
              className="form-input-contact"
            />
          </Form.Item>
        </div>
        <div className="form-group-contact">
          <Form.Item
            label="Tin nhắn"
            name="message"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập ý kiến của bạn!",
              },
            ]}
          >
            <Input.TextArea
              id="message"
              placeholder="Nội dung"
              className="form-input-contact"
            />
          </Form.Item>
        </div>
      </Form>
      <Button type="primary" htmlType="submit" className="form-btn-contact">
        Gửi tin
      </Button>
      <Button
        onClick={() => {
          form.resetFields();
        }}
        type=""
        htmlType="reset"
        className="form-btn-contact"
      >
        Nhập lại
      </Button>

      <div className="contact-info">
        <h2>Thông Tin Liên Hệ</h2>
        <p>
          Email: <Link to="mailto:datsan79@gmail.com">datsan79@gmail.com</Link>
        </p>
        <p>
          Hotline: <Link to="tel:0935245xxx">09 35 245 xxx</Link>
        </p>
        <p>Địa chỉ: 123 Đường ABC, Quận 1, TP. Hồ Chí Minh, Việt Nam</p>
      </div>
    </div>
  );
}

export default Contact;
