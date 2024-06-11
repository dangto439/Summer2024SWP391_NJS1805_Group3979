import { Button, Form, Input } from "antd";
import "./index.scss";

function ResetPassword() {
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
      >
        <div className="form-group">
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
              className="form-input"
            />
          </Form.Item>
        </div>

        <div className="form-group">
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
              className="form-input"
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
