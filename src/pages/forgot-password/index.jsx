import { Button, Form, Input } from "antd";
import "./index.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import api from "../../config/axios";

function ForgetPassword() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgetPassword = async (values) => {
    try {
      setLoading(true);
      const response = await api.post("/forgot-password", {
        email: values.email,
      });
      console.log(response.data);
      toast.success("Đặt lại mật khẩu đã gửi Email thành công!");
    } catch (error) {
      console.error(error.message);
      toast.error("Lỗi gửi Email đặt lại mật khẩu!");
    } finally {
      navigate("/login");
      setLoading(false);
    }
  };
  return (
    <div className="forget-password">
      <h1 className="forget-password__heading">Quên mật khẩu</h1>
      <p className="forget-password__form-desc">Nhập địa chỉ Email của bạn</p>
      <div className="text-wrap">
        <div className="text-line"></div>
        <div className="text-line"></div>
      </div>
      <Form
        form={form}
        className="forget-password__form"
        labelCol={{
          span: 24,
        }}
        onFinish={handleForgetPassword}
      >
        <div className="form-group">
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                message: "Email không hơp lệ!",
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
              className="form-input"
            />
          </Form.Item>
        </div>

        <Button
          type="primary"
          htmlType="submit"
          className="form-btn"
          disabled={loading}
        >
          Đặt lại mật khẩu
        </Button>
        <Link to="/login" className="form-link-login">
          Đăng nhập
        </Link>

        <Link to="/register" className="form-link-register">
          Đăng kí
        </Link>
      </Form>
    </div>
  );
}

export default ForgetPassword;
