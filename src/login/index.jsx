import { Button, Col, Form, Input, Row } from "antd";
import "./index.scss";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../config/firebase";
function Login() {
  const handleLoginGoogle = () => {
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        console.log(credential);
        console.log(result);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };
  return (
    <Row className="login">
      <Col span={16} className="login__background">
        <img
          src="https://plus.unsplash.com/premium_photo-1677543938193-6050960bef16?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </Col>
      <Col span={8} className="login__wrapper">
        <Form
          className="login__form"
          labelCol={{
            span: 24,
          }}
        >
          <Form.Item label="Username" name="username">
            <Input />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input.Password />
          </Form.Item>
          <Button type="primary">Login</Button>
          <button className="login__google" onClick={handleLoginGoogle}>
            <img
              src="https://cdn-icons-png.flaticon.com/256/2875/2875404.png"
              alt=""
              width={20}
            />
            Login With Google
          </button>
        </Form>
      </Col>
    </Row>
  );
}

export default Login;
