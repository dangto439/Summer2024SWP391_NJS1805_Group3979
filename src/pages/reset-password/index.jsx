import { Button, Form, Input } from "antd";
import "./index.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleResetPassword = async (values) => {
    // Lấy token từ URL
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await axios.put(
        "http://134.209.34.114:8080/api/reset-password",
        { newPassword: values.password },
        config
      );
      toast.success("Đặt lại mật khẩu mới thành công!");
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  return (
    <div className="reset-password">
      <h1 className="reset-password__heading">Thay đổi mật khẩu</h1>
      {/* <p className="reset-password__form-desc">Please </p> */}
      <div className="text-wrap">
        <div className="text-line"></div>
        <div className="text-line"></div>
      </div>
      <Form
        className="reset-password__form"
        labelCol={{
          span: 24,
        }}
        onFinish={handleResetPassword}
      >
        <div className="form-group-reset">
          <Form.Item
            label="Mật khẩu mới"
            name="password"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu mới!",
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
              className="form-input-reset"
            />
          </Form.Item>
        </div>

        <div className="form-group-reset">
          <Form.Item
            label="Xác nhận mật khẩu mới"
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
              className="form-input-reset"
            />
          </Form.Item>
        </div>
        <Button type="primary" htmlType="submit" className="form-btn">
          Đổi mật khẩu
        </Button>
      </Form>
    </div>
  );
}

export default ResetPassword;
