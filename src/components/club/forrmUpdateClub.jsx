import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, Upload, Select, InputNumber } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import moment from "moment";
import axios from "axios";

const UpdateClubForm = ({
  isModalOpen,
  handleOk,
  handleCancel,
  clubData,
  darkMode,
}) => {
  const [form] = Form.useForm();
  // const [selectProvince, setSelectProvince] = useState("");
  const [provinceGhn, setProvinceGhn] = useState([]);
  const [districtGhn, setDistrictsGhn] = useState([]);

  const onChangeProvince = (value) => {
    handleFetchDistrict(value);
  };

  const onChangeDistrict = (value) => {
    console.log(value);
  };

  useEffect(() => {
    // console.log(clubData);

    const fetchAndSetProvince = async () => {
      await handleFetchProvince();
    };

    fetchAndSetProvince();
  }, [clubData, form]);

  const handleFinish = (values) => {
    let resProN = [];
    let resDis = [];
    if (typeof values.province !== "number") {
      resProN = provinceGhn.find((item) => item.label === values.province);
      resDis = districtGhn.find((item) => item.label === values.district);
    } else {
      resProN = provinceGhn.find(
        (item) => item.value === Number(values.province)
      );
      resDis = districtGhn.find(
        (item) => item.value === Number(values.district)
      );
    }

    const updatedValues = {
      ...values,
      province: resProN.label,
      district: resDis.label,
      openingTime: values.openTime,
      closingTime: values.closeTime,
      clubHotLine: values.hotline,
      clubDescription: values.description,
    };
    console.log(updatedValues);
    form.resetFields();
    handleOk(updatedValues);
  };

  const handleFetchProvince = async () => {
    try {
      const response = await axios
        .get(
          "https://online-gateway.ghn.vn/shiip/public-api/master-data/province",
          {
            headers: {
              Token: "9f5dafd2-8d28-11ee-af43-6ead57e9219a",
            },
          }
        )
        .then(async (res) => {
          const formatData = res.data.data.map((province) => ({
            value: province.ProvinceID,
            label: province.ProvinceName,
          }));
          const resProN = formatData.find(
            (item) => item.label === clubData.province
          );
          await handleFetchDistrict(resProN.value); // fulll mảng districtGhn

          if (clubData) {
            form.setFieldsValue({
              ...clubData,
            });
          }
          setProvinceGhn(formatData);
        });
    } catch (error) {
      console.error("Không load được thành phố/ tỉnh", error);
    }
  };

  const handleFetchDistrict = async (data) => {
    try {
      const response = await axios
        .get(
          "https://online-gateway.ghn.vn/shiip/public-api/master-data/district",
          {
            params: { province_id: data },
            headers: {
              Token: "9f5dafd2-8d28-11ee-af43-6ead57e9219a",
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          const formatData = res.data.data.map((district) => ({
            value: district.DistrictID,
            label: district.DistrictName,
          }));
          const resDis = formatData.find(
            (item) => item.label === clubData.district
          );
          setDistrictsGhn(formatData);
        });
      // console.log(districtGhn);
    } catch (error) {
      console.error("Không load được quận/huyện", error);
    }
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
        {/* <Form.Item
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
        </Form.Item> */}
        <Form.Item
          name="province"
          label="Tỉnh/Thành phố"
          rules={[{ required: true, message: "Vui lòng chọn tỉnh/thành phố" }]}
        >
          <Select
            showSearch
            placeholder="Chọn tỉnh/ thành phố"
            optionFilterProp="label"
            onChange={onChangeProvince}
            options={provinceGhn}
          />
        </Form.Item>
        {/* <Form.Item
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
        </Form.Item> */}
        <Form.Item
          name="district"
          label="Quận/Huyện"
          rules={[{ required: true, message: "Vui lòng chọn quận/huyện" }]}
        >
          <Select
            showSearch
            placeholder="Chọn quận/ huyện"
            optionFilterProp="label"
            options={districtGhn}
            onChange={onChangeDistrict}
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
          name="openTime"
          label="Thời gian mở cửa"
          rules={[
            { required: true, message: "Vui lòng nhập thời gian mở cửa" },
          ]}
        >
          {/* <TimePicker
            format="HH"
            style={{
              width: "100%",
              backgroundColor: darkMode ? "#555" : "#fff",
              color: darkMode ? "#fff" : "#000",
            }}
          /> */}
          <InputNumber min={1} max={24} />
        </Form.Item>
        <Form.Item
          name="closeTime"
          label="Thời gian đóng cửa"
          rules={[
            { required: true, message: "Vui lòng nhập thời gian đóng cửa" },
          ]}
        >
          {/* <TimePicker
            format="HH"
            style={{
              width: "100%",
              backgroundColor: darkMode ? "#555" : "#fff",
              color: darkMode ? "#fff" : "#000",
            }}
          /> */}
          <InputNumber min={1} max={24} />
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
