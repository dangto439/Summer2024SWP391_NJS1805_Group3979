import { useEffect, useState } from "react";

import "./index.scss";
import { Button, Form, Image, Input, Modal, Radio, Upload } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import api from "../../config/axios";
import { toast } from "react-toastify";
import { UploadOutlined } from "@mui/icons-material";
import uploadFile from "../../utils/upload";

function Profile() {
  const [formProfile] = useForm();
  const [formPassword] = useForm();
  const { confirm } = Modal;
  const [avatarUrl, setAvatarUrl] = useState("");
  const showConfirm = () => {
    confirm({
      title: "Bạn chắc chứ?",
      icon: <ExclamationCircleFilled />,
      content: "Thay đổi thông tin của bạn",
      okText: "Thay đổi",
      cancelText: "Huỷ",

      onOk() {
        handleOk();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const [isResetPassword, setIsResetPassword] = useState(false);
  const showResetPassword = () => {
    setIsResetPassword(true);
  };
  const handleResetPassword = () => {
    setIsResetPassword(false);
  };
  const handleCancelResetPassword = () => {
    setIsResetPassword(false);
    formPassword.resetFields();
  };

  function handleOk() {
    formProfile.submit();
  }

  const resetChange = () => {
    fetchProfileData();
  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setAvatarUrl(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const fetchProfileData = async () => {
    try {
      const response = await api.get("/profile");
      const profileData = response.data;
      setAvatarUrl(profileData.avatar);
      formProfile.setFieldsValue({
        avatar: profileData.avatar,
        email: profileData.email,
        name: profileData.name,
        gender: profileData.gender,
        phone: profileData.phone,
      });
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleUpdateProfile = async (values) => {
    try {
      if (values.avatar && values.avatar.file) {
        const response = await uploadFile(values.avatar.file.originFileObj);
        values.avatar = response;
      } else {
        values.avatar = avatarUrl;
      }
      const account = await api.put("/profile", values);
      fetchProfileData();
      formProfile.resetFields(["avatar"]);
      toast.success("Cập nhật thông tin thành công!");
    } catch (error) {
      toast.error("Cập nhật thông tin thất bại!");
    }
  };

  const props = {
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    onChange({ file, fileList }) {
      if (file.status !== "uploading") {
        handlePreviewImg(file);
      }
    },
    defaultFileList: [],
  };

  const handlePreviewImg = async (e) => {
    setAvatarUrl(
      "https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
    );
    const img = await uploadFile(e.originFileObj);
    setAvatarUrl(img);
  };

  return (
    <div className="profile">
      <Form
        form={formProfile}
        className="form-profile"
        autoComplete="off"
        labelCol={{ span: 24 }}
        onFinish={handleUpdateProfile}
      >
        <h1>Chỉnh sửa hồ sơ</h1>
        <div className="form-group-profile">
          <div className="profile-pic-form">
            <Image
              width={130}
              src={avatarUrl}
              alt="Profile Picture"
              className="profile-pic"
            />
          </div>
          <Form.Item name="avatar" className="profile-pic-form">
            <Upload onChange={(e) => handlePreviewImg(e)} {...props}>
              <Button icon={<UploadOutlined />}>Nhấn để tải ảnh lên</Button>
            </Upload>
          </Form.Item>
        </div>
        <div className="form-group-profile">
          <Form.Item label="Email" name="email">
            <Input
              disabled
              id="email"
              placeholder="name@example.com"
              className="form-input-profile"
            />
          </Form.Item>
        </div>

        <div className="form-group-profile">
          <Form.Item
            label="Tên"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your Name!",
              },
            ]}
          >
            <Input
              id="name"
              placeholder="Name"
              className="form-input-profile"
            />
          </Form.Item>
        </div>

        <div className="form-group-profile">
          <Form.Item
            label="Điện Thoại"
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
            <Input
              id="phone"
              placeholder="(+84) 123-456-789"
              className="form-input-profile"
            />
          </Form.Item>
        </div>
        <div className="form-group-profile">
          <Form.Item
            label="Giới Tính"
            name="gender"
            rules={[
              {
                required: true,
                message: "Please select your Gender!",
              },
            ]}
          >
            <Radio.Group id="gender" className="form-input-profile">
              <Radio value="MALE">Nam</Radio>
              <Radio value="FEMALE">Nữ</Radio>
              <Radio value="OTHERS">Khác</Radio>
            </Radio.Group>
          </Form.Item>
        </div>

        <div className="form-group-password">
          <Button
            type="primary"
            className="change-button"
            onClick={showResetPassword}
          >
            Đổi mật khẩu
          </Button>
          <Modal
            title="Thay đổi mật khẩu"
            open={isResetPassword}
            onOk={handleResetPassword}
            onCancel={handleCancelResetPassword}
            cancelText="Huỷ"
            okText="Lưu"
            centered
          >
            <Form
              form={formPassword}
              // className="form-profile"
              autoComplete="off"
              labelCol={{ span: 24 }}
              onFinish={handleUpdateProfile}
            >
              <div className="form-group-modal">
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
                    className="form-input-profile"
                  />
                </Form.Item>
              </div>

              <div className="form-group-modal">
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
                    className="form-input-profile"
                  />
                </Form.Item>
              </div>
            </Form>
          </Modal>
        </div>
      </Form>

      <Button onClick={showConfirm} className="save-button">
        Lưu thay đổi
      </Button>

      <Button onClick={resetChange} className="cancel-button">
        Hủy
      </Button>
    </div>
  );
}

export default Profile;
