import { Form, Input } from "antd";
import "./index.scss";
import { Link } from "react-router-dom";

function ForgetPassword() {
  return (
    <div className="forget-password">
      <h1 className="forget-password__heading">Forget Password</h1>
      <p className="forget-password__form-desc">Enter your email address</p>
      <div className="text-wrap">
        <div className="text-line"></div>
        <div className="text-line"></div>
      </div>
      <Form
        className="forget-password__form"
        labelCol={{
          span: 24,
        }}
      >
        <div className="form-group">
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input
              id="email"
              placeholder="name@example.com"
              className="form-input"
            />
          </Form.Item>
        </div>

        <button type="submit" className="form-btn">
          Reset Password
        </button>
        <Link to="/login" className="form-link-login">
          Login
        </Link>

        <Link to="/register" className="form-link-register">
          Register
        </Link>
      </Form>
    </div>
  );
}

export default ForgetPassword;
