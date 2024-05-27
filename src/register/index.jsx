/* eslint-disable no-unused-vars */
import { Form, Input } from "antd";
import "./index.scss";
import { Link, useNavigate } from "react-router-dom";
import api from "../config/axios";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();

  const handleRegisterAccount = async (values) => {
    try {
      console.log(values);
      const response = await api.post("/register", values);
      toast.success("Register Succesfull!");
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  return (
    <div className="register">
      <h1 className="register__heading">Sign Up</h1>
      <p className="register__form-desc">
        Please fill out the form below to use the service
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

        <div className="form-group">
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your Name!",
              },
            ]}
          >
            <Input id="name" placeholder="Name" className="form-input" />
          </Form.Item>
        </div>

        <div className="form-group">
          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input your Phone number!",
              },
              {
                pattern: /^\d{10}$/,
                message: "Please input a valid 10-digit phone number!",
              },
            ]}
          >
            <Input id="phone" placeholder="0987654321" className="form-input" />
          </Form.Item>
        </div>

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

        <button type="submit" className="form-btn">
          Register
        </button>

        <div className="register__option">
          Already have an account?
          <Link to="/login">Sign in</Link>
        </div>
      </Form>
    </div>
  );
}

export default Register;
