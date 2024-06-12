/* eslint-disable no-unused-vars */
import { Button, Form, Input, Radio } from "antd";
import "./index.scss";
import { Link, useNavigate } from "react-router-dom";
import api from "../../config/axios";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();

  const handleRegisterAccount = async (values) => {
    try {
      //console.log(values);
      const response = await api.post("/register", values);
      toast.success("Đăng ký thành công!");
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  return (
    <div className="register">
      <h1 className="register__heading">Đăng ký</h1>
      <p className="register__form-desc">
        Vui lòng điền vào mẫu dưới đây để được sử dụng dịch vụ của chúng tôi!
      </p>
      <div className="text-wrap">
        <div className="text-line"></div>
        {/* <p className="text"></p> */}
        <div className="text-line"></div>
      </div>
      <Form
        className="register__form"
        labelCol={{
          span: 24,
        }}
        onFinish={handleRegisterAccount}
      >
        <div className="form-group">
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
                message: "Vui lòng nhập email của bạn!",
              },
            ]}
          >
            <Input
              id="email"
              placeholder="name@gmail.com"
              className="form-input"
            />
          </Form.Item>
        </div>

        <div className="form-group">
          <Form.Item
            label="Tên"
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
              placeholder="Ví dụ: Nguyễn Văn A"
              className="form-input"
            />
          </Form.Item>
        </div>
        <div className="form-group">
          <Form.Item
            label="Giới tính"
            name="gender"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn giới tính của bạn!",
              },
            ]}
          >
            <Radio.Group id="gender" className="form-input">
              <Radio value="MALE">Nam</Radio>
              <Radio value="FEMALE">Nữ</Radio>
              <Radio value="OTHERS">Khác</Radio>
            </Radio.Group>
          </Form.Item>
        </div>

        <div className="form-group">
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
              className="form-input"
            />
          </Form.Item>
        </div>

        <div className="form-group">
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu của bạn!",
              },
              {
                min: 6,
                message: "Mật khẩu phải có độ dài ít nhất 6 ký tự!",
              },
            ]}
          >
            <Input.Password
              id="password"
              placeholder="******"
              className="form-input"
            />
          </Form.Item>
        </div>

        <div className="form-group">
          <Form.Item
            label="Xác nhận mật khẩu"
            name="confirm-password"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Vui lòng xác nhận mật khẩu của bạn!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Xác nhận mật khẩu không khớp!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              id="confirm-password"
              placeholder="******"
              className="form-input"
            />
          </Form.Item>
        </div>
        <div className="form-group">
          <Form.Item
            label="Vai trò"
            name="role"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn vai trò của bạn!",
              },
            ]}
          >
            <Radio.Group id="role" className="form-input">
              <Radio value="CUSTOMER">Khách hàng</Radio>
              <Radio value="CLUB_OWNER">Chủ CLB</Radio>
            </Radio.Group>
          </Form.Item>
        </div>
        <Button type="primary" htmlType="submit" className="form-btn">
          Tạo tài khoản
        </Button>

        <div className="register__option">
          Bạn đã có tài khoản?
          <Link to="/login">Đăng nhập</Link>
        </div>
      </Form>
    </div>
  );
}

export default Register;
