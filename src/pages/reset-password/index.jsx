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

    // Thêm token vào values
    // const payload = { ...values, token };

    try {
      await axios.put(
        "http://157.245.153.47:8080/api/reset-password",
        { newPassword: values.password },
        config
      );
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  return (
    <div className="reset-password">
      <h1 className="reset-password__heading">Reset Password</h1>
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
        <div className="form-group">
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
              {
                min: 6,
                message: "Password must be at least 6 characters long!",
              },
            ]}
          >
            <Input.Password
              id="password"
              placeholder="Password"
              className="form-input"
            />
          </Form.Item>
        </div>

        <div className="form-group">
          <Form.Item
            label="Confirm Password"
            name="confirm-password"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please confirm your Password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              id="confirm-password"
              placeholder="Confirm Password"
              className="form-input"
            />
          </Form.Item>
        </div>
        <Button type="primary" htmlType="submit" className="form-btn">
          Change Password
        </Button>
      </Form>
    </div>
  );
}

export default ResetPassword;
