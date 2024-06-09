/* eslint-disable no-unused-vars */
import { Button, Col, Form, Input, Row } from "antd";
import "./index.scss";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../config/firebase";
import { Link } from "react-router-dom";
import api from "../../config/axios";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../../redux/features/counterSlice";
import { useNavigate } from "react-router-dom/dist";
import { toast } from "react-toastify";

function Login() {
  // để sử dụng, tương tác với redux
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const handleLoginGoogle = async () => {
    await signInWithPopup(auth, new GoogleAuthProvider())
      .then((result) => {
        //const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = result.user.accessToken;
        //console.log(credential);
        console.log(token);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        toast.error("Login Failed!");
      });
  };

  const handleLogin = async (values) => {
    try {
      const response = await api.post("/login", values);
      // response.data = data back end tra ve
      const token = response.data.token;
      //luu vo redux
      dispatch(login(response.data));
      //lay token ra
      // save vo local storage
      localStorage.setItem("token", token);

      const role = response.data.role;

      toast.success("Login Successfully!");

      if (role === "CUSTOMER") navigate("/");
      else if (role === "CLUB_OWNER") navigate("/dashboard");
    } catch (error) {
      toast.error("Incorrect Email or Password!");
      console.log(error);
    }
  };

  return (
    <>
      <div className="login">
        <h1 className="login__form-heading">Welcome Datsan79</h1>
        <p className="login__form-desc">
          Continue with Google or enter your details
        </p>
        <button onClick={handleLoginGoogle} className="btn-login-google">
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.3055 10.0415L21.5 10.0415L21.5 10L12.5 10L12.5 14L18.1515 14C17.327 16.3285 15.1115 18 12.5 18C9.1865 18 6.5 15.3135 6.5 12C6.5 8.6865 9.1865 6 12.5 6C14.0295 6 15.421 6.577 16.4805 7.5195L19.309 4.691C17.523 3.0265 15.134 2 12.5 2C6.9775 2 2.5 6.4775 2.5 12C2.5 17.5225 6.9775 22 12.5 22C18.0225 22 22.5 17.5225 22.5 12C22.5 11.3295 22.431 10.675 22.3055 10.0415Z"
              fill="#FBC02D"
            ></path>
            <path
              d="M3.65332 7.3455L6.93882 9.755C7.82782 7.554 9.98082 6 12.5003 6C14.0298 6 15.4213 6.577 16.4808 7.5195L19.3093 4.691C17.5233 3.0265 15.1343 2 12.5003 2C8.65932 2 5.32832 4.1685 3.65332 7.3455Z"
              fill="#E53935"
            ></path>
            <path
              d="M12.5002 22C15.0832 22 17.4302 21.0115 19.2047 19.404L16.1097 16.785C15.1057 17.5455 13.8577 18 12.5002 18C9.89916 18 7.69066 16.3415 6.85866 14.027L3.59766 16.5395C5.25266 19.778 8.61366 22 12.5002 22Z"
              fill="#4CAF50"
            ></path>
            <path
              d="M22.3055 10.0415L22.2975 10L21.5 10L12.5 10L12.5 14L18.1515 14C17.7555 15.1185 17.036 16.083 16.108 16.7855C16.1085 16.785 16.109 16.785 16.1095 16.7845L19.2045 19.4035C18.9855 19.6025 22.5 17 22.5 12C22.5 11.3295 22.431 10.675 22.3055 10.0415Z"
              fill="#1565C0"
            ></path>
          </svg>
          Login in with Google
        </button>
        <div className="text-wrap">
          <div className="text-line"></div>
          <p className="text">or</p>
          <div className="text-line"></div>
        </div>

        <Form
          className="form"
          autoComplete="off"
          labelCol={{ span: 24 }}
          onFinish={handleLogin}
        >
          <div className="form-group">
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "The input is not valid E-mail!" },
              ]}
            >
              <Input
                name="email"
                id="email"
                placeholder="Email"
                className="form-input"
              />
            </Form.Item>
          </div>

          <div className="form-group">
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                id="password"
                placeholder="Password"
                className="form-input"
              />
            </Form.Item>
          </div>

          <Link to="/forgot-password" className="form-link">
            Forgot Password?
          </Link>

          <Button type="primary" htmlType="submit" className="form-btn">
            Login
          </Button>
        </Form>
        <div className="form-option">
          Do not have an account?
          <Link to="/register">Sign up for free</Link>
        </div>
      </div>
    </>
  );
}

export default Login;
