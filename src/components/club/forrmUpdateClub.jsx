import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, TimePicker, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import moment from "moment";

const UpdateClubForm = ({
  isModalOpen,
  handleOk,
  handleCancel,
  clubData,
  darkMode,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (clubData) {
      form.setFieldsValue({
        ...clubData,
        openTime: moment(clubData.openTime, "HH"),
        closeTime: moment(clubData.closeTime, "HH"),
      });
    }
  }, [clubData, form]);

  const handleFinish = (values) => {
    const updatedValues = {
      ...values,
      openTime: values.openTime.format("HH"),
      closeTime: values.closeTime.format("HH"),
      clubHotLine: values.hotline,
      clubDescription: values.description,
    };
    handleOk(updatedValues);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <Modal
      title="Cập Nhật Câu Lạc Bộ"
      open={isModalOpen}
      onOk={() => form.submit()}
      onCancel={handleCancel}
      style={{
        backgroundColor: darkMode ? "#333" : "#fff",
        color: darkMode ? "#fff" : "#000",
      }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        style={{
          backgroundColor: darkMode ? "#333" : "#fff",
          color: darkMode ? "#fff" : "#000",
        }}
      >
        <Form.Item name="clubId" label="ClubId" hidden>
          <Input />
        </Form.Item>
        <Form.Item
          name="clubName"
          label="Tên câu lạc bộ"
          rules={[{ required: true, message: "Vui lòng nhập tên câu lạc bộ" }]}
        >
          <Input
            style={{
              backgroundColor: darkMode ? "#555" : "#fff",
              color: darkMode ? "#fff" : "#000",
            }}
          />
        </Form.Item>
        <Form.Item
          name="clubAddress"
          label="Địa chỉ cụ thể"
          rules={[{ required: true, message: "Vui lòng nhập địa chỉ cụ thể" }]}
        >
          <Input
            style={{
              backgroundColor: darkMode ? "#555" : "#fff",
              color: darkMode ? "#fff" : "#000",
            }}
          />
        </Form.Item>
        <Form.Item
          name="district"
          label="Quận/Huyện"
          rules={[{ required: true, message: "Vui lòng nhập Quận/Huyện" }]}
        >
          <Input
            style={{
              backgroundColor: darkMode ? "#555" : "#fff",
              color: darkMode ? "#fff" : "#000",
            }}
          />
        </Form.Item>
        <Form.Item
          name="province"
          label="Tỉnh/Thành phố"
          rules={[{ required: true, message: "Vui lòng nhập Tỉnh/Thành phố" }]}
        >
          <Input
            style={{
              backgroundColor: darkMode ? "#555" : "#fff",
              color: darkMode ? "#fff" : "#000",
            }}
          />
        </Form.Item>
        <Form.Item
          name="openTime"
          label="Thời gian mở cửa"
          rules={[
            { required: true, message: "Vui lòng nhập thời gian mở cửa" },
          ]}
        >
          <TimePicker
            format="HH"
            style={{
              width: "100%",
              backgroundColor: darkMode ? "#555" : "#fff",
              color: darkMode ? "#fff" : "#000",
            }}
          />
        </Form.Item>
        <Form.Item
          name="closeTime"
          label="Thời gian đóng cửa"
          rules={[
            { required: true, message: "Vui lòng nhập thời gian đóng cửa" },
          ]}
        >
          <TimePicker
            format="HH"
            style={{
              width: "100%",
              backgroundColor: darkMode ? "#555" : "#fff",
              color: darkMode ? "#fff" : "#000",
            }}
          />
        </Form.Item>
        <Form.Item
          name="hotline"
          label="Số điện thoại"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
        >
          <Input
            style={{
              backgroundColor: darkMode ? "#555" : "#fff",
              color: darkMode ? "#fff" : "#000",
            }}
          />
        </Form.Item>
        <Form.Item
          name="description"
          label="Mô tả"
          rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
        >
          <Input.TextArea
            rows={4}
            style={{
              backgroundColor: darkMode ? "#555" : "#fff",
              color: darkMode ? "#fff" : "#000",
            }}
          />
        </Form.Item>
        <Form.Item
          name="urlImages"
          label="Hình ảnh"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            name="logo"
            listType="picture"
            action="/upload.do"
            beforeUpload={() => false}
            style={{
              backgroundColor: darkMode ? "#555" : "#fff",
              color: darkMode ? "#fff" : "#000",
            }}
          >
            <Button
              icon={<UploadOutlined />}
              style={{
                backgroundColor: darkMode ? "#555" : "#fff",
                color: darkMode ? "#fff" : "#000",
              }}
            >
              Upload
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          {clubData?.urlImages?.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Club image ${index}`}
              style={{ maxWidth: "100%", marginBottom: "10px" }}
            />
          ))}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateClubForm;
