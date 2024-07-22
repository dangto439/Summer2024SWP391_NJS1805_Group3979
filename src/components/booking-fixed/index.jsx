/* eslint-disable react/prop-types */
import moment from "moment/moment";
import "./index.scss";
import { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Input,
  Modal,
  Row,
  Radio,
  message,
  Space,
} from "antd";
import api from "../../config/axios";
import { useNavigate } from "react-router-dom";

function BookingFixed({ club }) {
  const [selectedDate, setSelectedDate] = useState(moment());
  const [selectedDays, setSelectedDays] = useState([]);
  const [slots, setSlots] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [promotionCode, setPromotionCode] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedCourtOption, setSelectedCourtOption] = useState("any");
  const navigate = useNavigate();
  const [courtId, setCourtId] = useState([]);
  const [autoChoose, setAutoChoose] = useState([]);

  const onChange = (date, dateString) => {
    setSelectedDate(date);
  };

  const onChangeSelectCourt = (checkedValues) => {
    setCourtId(checkedValues);
  };

  const disabledDate = (current) => {
    return current && current < moment().endOf("day");
  };

  const fetchCourt = async () => {
    const response = await api.get(`/courts/${club.clubId}`); // lấy court hiện tại của club
    let courts = response.data;

    courts = courts.filter((court) => court.courtStatus !== "INACTIVE");
    const options = courts.map((court) => ({
      label: court.courtName,
      value: court.courtId,
    }));

    // Set options
    setOptions(options);

    // Set option auto
    const values = options.map((item) => item.value);
    setAutoChoose(values);
  };

  const fetchSlots = async () => {
    const fetchedSlots = await api.get(`/club/slots?clubId=${club.clubId}`);
    setSlots(fetchedSlots.data);
  };

  useEffect(() => {
    fetchCourt();
    fetchSlots();
  }, []);

  const handleSlotSelect = (slotId) => {
    const updatedSelectedSlots = selectedSlots.includes(slotId)
      ? selectedSlots.filter((id) => id !== slotId)
      : [...selectedSlots, slotId];

    setSelectedSlots(updatedSelectedSlots);
  };

  const handleDayChange = (checkedValues) => {
    setSelectedDays(checkedValues);
  };

  const handleSubmit = async () => {
    if (!selectedDate) {
      message.warning("Vui lòng chọn thời gian.");
      return;
    }
    if (selectedCourtOption === "specific" && courtId.length === 0) {
      message.warning("Vui lòng chọn ít nhất một sân.");
      return;
    }
    if (selectedDays.length === 0) {
      message.warning("Vui lòng chọn ít nhất một thứ.");
      return;
    }
    if (selectedSlots.length === 0) {
      message.warning("Vui lòng chọn ít nhất một slot.");
      return;
    }

    const bookingData = {
      year: selectedDate ? selectedDate.year() : 0,
      month: selectedDate ? selectedDate.month() + 1 : 0,
      clubId: club.clubId,
      promotionCode: promotionCode,
      dayOfWeeks: selectedDays,
      slotIds: selectedSlots,
      courtIds: selectedCourtOption === "any" ? autoChoose : courtId,
    };

    // setAutoChoose();
    try {
      // Check slots
      const checkbooking = await api.post("/booking/fixed/check", bookingData);
      const formattedMessages = checkbooking.data.join("\n");

      // Confirm with the user to proceed
      Modal.confirm({
        title: "Xác nhận thông tin",
        content: (
          <div style={{ whiteSpace: "pre-line" }}>{formattedMessages}</div>
        ),
        onOk: async () => {
          try {
            if (
              bookingData.promotionCode &&
              bookingData.promotionCode.trim() !== ""
            ) {
              try {
                await handleCheckPromotion(
                  bookingData.promotionCode,
                  club.clubId
                );
              } catch (e) {
                return;
              }
            }
            //chuyển qua bill để thực hiện tiếp quá trình
            navigate("/bill", {
              state: {
                type: "FIXED",
                booking: bookingData,
                club: club.clubId,
              },
            });
            // console.log(bookingData);
          } catch (error) {
            message.error(error.response.data);
          }
        },
        onCancel() {
          message.info("Hủy đặt sân");
        },
      });
    } catch (error) {
      console.error("Error submitting booking:", error);
      message.error("Đặt sân thất bại. Vui lòng thử lại.");
    }
  };

  const dayOptions = [
    { label: "Chủ nhật", value: 1 },
    { label: "Thứ hai", value: 2 },
    { label: "Thứ ba", value: 3 },
    { label: "Thứ tư", value: 4 },
    { label: "Thứ năm", value: 5 },
    { label: "Thứ sáu", value: 6 },
    { label: "Thứ bảy", value: 7 },
  ];

  const handleInputChange = (e) => {
    setPromotionCode(e.target.value);
  };

  const handleCourtOptionChange = (e) => {
    setSelectedCourtOption(e.target.value);
  };

  const handleCheckPromotion = async (promotionCode, clubId) => {
    try {
      await api.get(
        `/promotion/check?clubId=${clubId}&promotionCode=${promotionCode}`
      );
    } catch (e) {
      message.error(e.response.data);
      throw e;
    }
  };

  return (
    <Row className="booking-fixed">
      <Col span={7} className="booking-sidebar-fixed">
        <Row>
          <Col span={24} className="booking-summary-fixed">
            <h1>{club.clubName}</h1>
            <p>
              Thời gian đặt:{" "}
              {selectedDate ? selectedDate.format("MM/YYYY") : ""}
            </p>
            <img src={club.urlImages} />
            <Input
              placeholder="Nhập mã khuyến mãi"
              variant="borderless"
              value={promotionCode}
              onChange={handleInputChange}
            />
            <Button
              className="submit-button-fixed"
              onClick={handleSubmit}
              size="large"
            >
              Thanh Toán
            </Button>
          </Col>
        </Row>
      </Col>
      <Col span={17} className="booking-main-fixed">
        <h1>Lịch cố định</h1>
        <div className="booking-month">
          <h3>Chọn tháng:</h3>
          <DatePicker
            // style={{ width: 500 }}
            className="datepicker-fixed"
            onChange={onChange}
            disabledDate={disabledDate}
            picker="month"
            placeholder="Chọn tháng..."
          />
        </div>

        <h3>Chọn thứ:</h3>
        <div className="booking-checkbox-date">
          <Checkbox.Group
            onChange={handleDayChange}
            options={dayOptions}
            style={{ marginTop: 20, fontSize: 20 }}
          />
        </div>

        <div className="booking-fixed-contents">
          <div className="booking-radio-court">
            <h3>Tùy chọn sân:</h3>
            <Radio.Group
              className="radio"
              onChange={handleCourtOptionChange}
              value={selectedCourtOption}
              size="large"
              buttonStyle="solid"
              optionType="button"
            >
              <Space direction="vertical">
                <Radio.Button style={{ width: 250 }} value="any">
                  Sắp xếp sân ngẫu nhiên
                </Radio.Button>
                <Radio.Button
                  style={{ width: 250, marginBottom: 10 }}
                  value="specific"
                >
                  Chọn sân muốn chơi
                </Radio.Button>
              </Space>
            </Radio.Group>
            {selectedCourtOption === "specific" && (
              <Checkbox.Group
                style={{ fontSize: 20 }}
                options={options}
                onChange={onChangeSelectCourt}
              />
            )}
          </div>

          <h3>Chọn giờ:</h3>
          <div className="slots-container">
            {slots.map((slot) => (
              <div
                key={slot.slotId}
                className={`slot-item ${
                  selectedSlots.includes(slot.slotId) ? "selected-slot" : ""
                }`}
                onClick={() => handleSlotSelect(slot.slotId)}
              >
                {`${slot.slotId}:00`}
              </div>
            ))}
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default BookingFixed;
