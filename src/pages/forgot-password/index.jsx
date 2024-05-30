import { Form, Input } from "antd";
import "./index.scss";
<<<<<<< HEAD:src/pages/forgot-password/index.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../config/axios";
import { toast } from "react-toastify";
=======
import { Link } from "react-router-dom";
import api from "../config/axios";
import { useState } from "react";
>>>>>>> main:src/forgot-password/index.jsx

function ForgetPassword() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
<<<<<<< HEAD:src/pages/forgot-password/index.jsx
  const navigate = useNavigate();
=======
>>>>>>> main:src/forgot-password/index.jsx

  const handleForgetPassword = async (values) => {
    try {
      setLoading(true);
      const response = await api.post("/forgot-password", {
        email: values.email,
      });
      console.log(response.data);
<<<<<<< HEAD:src/pages/forgot-password/index.jsx
      toast.success("Password reset email sent successfully");
    } catch (error) {
      console.error(error.message);
      toast.error("Error sending password reset email");
    } finally {
      navigate("/login");
      setLoading(false);
    }
  };
=======
      alert("Password reset email sent successfully");
    } catch (error) {
      console.error(error.message);
      alert("Error sending password reset email");
    } finally {
      setLoading(false);
    }
  };

>>>>>>> main:src/forgot-password/index.jsx
  return (
    <div className="forget-password">
      <h1 className="forget-password__heading">Forget Password</h1>
      <p className="forget-password__form-desc">Enter your email address</p>
      <div className="text-wrap">
        <div className="text-line"></div>
        <div className="text-line"></div>
      </div>
      <Form
        form={form}
        className="forget-password__form"
<<<<<<< HEAD:src/pages/forgot-password/index.jsx
        labelCol={{
          span: 24,
        }}
=======
        labelCol={{ span: 24 }}
>>>>>>> main:src/forgot-password/index.jsx
        onFinish={handleForgetPassword}
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

<<<<<<< HEAD:src/pages/forgot-password/index.jsx
        <button type="submit" className="form-btn" disabled={loading}>
          Reset Password
        </button>
        <Link to="/login" className="form-link-login">
          Login
        </Link>

        <Link to="/register" className="form-link-register">
          Register
        </Link>
=======
        <div className="form-group">
          <button type="submit" className="form-btn" disabled={loading}>
            Reset Password
          </button>
        </div>
>>>>>>> main:src/forgot-password/index.jsx
      </Form>

      <Link to="/login" className="form-link-login">
        Login
      </Link>
      <Link to="/register" className="form-link-register">
        Register
      </Link>
    </div>
  );
}

export default ForgetPassword;
