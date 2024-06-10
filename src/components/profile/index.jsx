import { useEffect, useState } from "react";

import "./index.scss";
import { Button, Form, Input, Modal, Radio, Upload } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import api from "../../config/axios";
import { toast } from "react-toastify";
import { UploadOutlined } from "@mui/icons-material";
import uploadFile from "../../utils/upload";

function Profile() {
  const [form] = useForm();
  const { confirm } = Modal;
  const [avatarUrl, setAvatarUrl] = useState("");
  const showConfirm = () => {
    confirm({
      title: "Are you sure?",
      icon: <ExclamationCircleFilled />,
      content: "Change your infomation",
      onOk() {
        handleOk();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  function handleOk() {
    form.submit();
  }

  const resetChange = () => {
    fetchProfileData();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const fetchProfileData = async () => {
    try {
      const response = await api.get("/profile");
      const profileData = response.data;
      setAvatarUrl(profileData.avatar);
      form.setFieldsValue({
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
      const response = await uploadFile(values.avatar.file.originFileObj);
      values.avatar = response;
      const account = await api.put("/profile", values);
      fetchProfileData();
    } catch (error) {
      toast.error("Update thông tin thất bại!");
    }
  };

  const props = {
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    onChange({ file, fileList }) {
      if (file.status !== "uploading") {
        console.log(file, fileList);
      }
    },
    defaultFileList: [],
  };

  return (
    <div className="container">
      <h1>Edit Profile</h1>

      <Form
        form={form}
        className="form"
        autoComplete="off"
        labelCol={{ span: 24 }}
        onFinish={handleUpdateProfile}
      >
        <div className="form-group">
          <div className="profile-pic-container">
            <img
              src={avatarUrl}
              alt="Profile Picture"
              className="profile-pic"
            />
          </div>
          <Form.Item name="avatar">
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input
              disabled
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
            label="Gender"
            name="gender"
            rules={[
              {
                required: true,
                message: "Please select your Gender!",
              },
            ]}
          >
            <Radio.Group id="gender" className="form-input">
              <Radio value="MALE">Male</Radio>
              <Radio value="FEMALE">Female</Radio>
              <Radio value="OTHERS">Other</Radio>
            </Radio.Group>
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
            <Input
              id="phone"
              placeholder="(+84) 123-456-789"
              className="form-input"
            />
          </Form.Item>
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
