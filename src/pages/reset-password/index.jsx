import { Button, Form, Input } from "antd";
import "./index.scss";

function ResetPassword() {
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
