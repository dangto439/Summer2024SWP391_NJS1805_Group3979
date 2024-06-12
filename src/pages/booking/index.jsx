import { useState } from "react";
import { Button, DatePicker, Form, InputNumber, Select } from "antd";
import dayjs from "dayjs";
import "./index.scss";

const { Option } = Select;

function Booking() {
  const [courts, setCourts] = useState([]);
  const [type, setType] = useState("");
  const [fixedDays, setFixedDays] = useState(1);

  const [clubs, setClubs] = useState([
    { id: 1, name: "Club A", courts: ["Court 1", "Court 2", "Court 3"] },
    { id: 2, name: "Club B", courts: ["Court 4", "Court 5"] },
  ]);

  const [availableSlots, setAvailableSlots] = useState([
    "08:00 - 09:00",
    "09:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "12:00 - 13:00",
    "13:00 - 14:00",
  ]);

  const handleClubChange = (value) => {
    const selectedClub = clubs.find((club) => club.id === value);
    setCourts(selectedClub ? selectedClub.courts : []);
  };

  const handleTypeChange = (value) => {
    setType(value);
  };

  const handleDateChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const handleFixedDaysChange = (value) => {
    setFixedDays(value);
  };

  const handleSubmit = (values) => {
    console.log("Success:", values);
  };

  return (
    <div className="form-container">
      <Form
        className="form"
        autoComplete="off"
        labelCol={{ span: 24 }}
        onFinish={handleSubmit}
      >
        <div className="form-group">
          <Form.Item
            label="Chọn Club"
            name="club"
            rules={[{ required: true, message: "Vui lòng chọn Club!" }]}
          >
            <Select onChange={handleClubChange} placeholder="Chọn Club">
              {clubs.map((club) => (
                <Option key={club.id} value={club.id}>
                  {club.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Chọn Court"
            name="court"
            rules={[{ required: true, message: "Vui lòng chọn Court!" }]}
          >
            <Select placeholder="Chọn Court" disabled={courts.length === 0}>
              {courts.map((court, index) => (
                <Option key={index} value={court}>
                  {court}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Chọn Type"
            name="type"
            rules={[{ required: true, message: "Vui lòng chọn Type!" }]}
          >
            <Select placeholder="Chọn Type" onChange={handleTypeChange}>
              <Option value="Linh hoạt">Linh hoạt</Option>
              <Option value="Cố định">Cố định</Option>
              <Option value="Vãng lai">Vãng lai</Option>
            </Select>
          </Form.Item>

          {type === "Linh hoạt" && (
            <Form.Item
              label="Số lượng giờ chơi"
              name="hours"
              rules={[
                { required: true, message: "Vui lòng nhập số lượng giờ chơi!" },
              ]}
            >
              <InputNumber min={1} max={24} placeholder="Nhập số lượng giờ" />
            </Form.Item>
          )}

          {(type === "Cố định" || type === "Vãng lai") && (
            <Form.Item
              label="Chọn Slot"
              name="slots"
              rules={[
                { required: true, message: "Vui lòng chọn ít nhất một Slot!" },
              ]}
            >
              <Select
                mode={type === "Cố định" ? "multiple" : undefined}
                placeholder="Chọn Slot"
              >
                {availableSlots.map((slot, index) => (
                  <Option key={index} value={slot}>
                    {slot}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}

          {type === "Cố định" && (
            <>
              <Form.Item
                label="Số lượng ngày muốn chơi"
                name="fixedDays"
                rules={[
                  { required: true, message: "Vui lòng nhập số lượng ngày!" },
                ]}
              >
                <InputNumber
                  min={1}
                  max={30}
                  value={fixedDays}
                  onChange={handleFixedDaysChange}
                />
              </Form.Item>

              {[...Array(fixedDays)].map((_, index) => (
                <Form.Item
                  key={index}
                  label={`Chọn ngày ${index + 1}`}
                  name={`date${index}`}
                  rules={[
                    { required: true, message: "Vui lòng chọn ngày!" },
                    {
                      validator: (_, value) =>
                        value && value.isBefore(dayjs().startOf("day"))
                          ? Promise.reject(
                              "Không được chọn ngày trong quá khứ!"
                            )
                          : Promise.resolve(),
                    },
                  ]}
                >
                  <DatePicker
                    onChange={handleDateChange}
                    disabledDate={(current) =>
                      current && current < dayjs().startOf("day")
                    }
                  />
                </Form.Item>
              ))}
            </>
          )}
        </div>

        <Button type="primary" htmlType="submit" className="form-btn">
          Đặt sân
        </Button>
      </Form>
    </div>
  );
}

export default Booking;
