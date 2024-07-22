/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  Button,
  Col,
  Row,
  DatePicker,
  Table,
  message,
  Input,
  Select,
} from "antd";
import moment from "moment";
import api from "../../config/axios";
// import { toast } from "react-toastify";
import "./index.scss";
import { Option } from "antd/es/mentions";
import { useNavigate } from "react-router-dom";

function BookingDaily({ club }) {
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [dataSource, setDataSource] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [totalHours, setTotalHours] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [columns, setColumns] = useState([]);
  const [promotionCode, setPromotionCode] = useState("");
  const [flexibleBooking, setFlexibleBooking] = useState([]);
  const [selectedFlexibleId, setSelectedFlexibleId] = useState(0);
  const navigate = useNavigate();
  const [check, setCheck] = useState(false);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  useEffect(() => {
    const fetchCourtsData = async () => {
      if (!selectedDate) return;

      try {
        const courtsResponse = await api.get(`/courts/${club.clubId}`);
        let courts = courtsResponse.data;
        courts = courts.filter((court) => court.courtStatus !== "INACTIVE");

        const slotsPromises = courts.map((court) =>
          api.get(
            `/court-slot/status?date=${selectedDate}&courtId=${court.courtId}`
          )
        );
        const slotsResponses = await Promise.all(slotsPromises);

        const slotsData = slotsResponses.map((response, index) => ({
          courtId: courts[index].courtId,
          courtName: courts[index].courtName,
          slots: response.data,
        }));

        const allSlotTimes = Array.from(
          new Set(
            slotsData.flatMap((court) => court.slots.map((slot) => slot.slotId))
          )
        ).sort((a, b) => a - b);

        const formattedData = allSlotTimes.map((time) => {
          const row = { time: formatTime(time) };
          slotsData.forEach((court) => {
            const slot = court.slots.find((slot) => slot.slotId === time);
            row[`court_${court.courtId}`] = slot;
          });
          return row;
        });
        setDataSource(formattedData);
        const generatedColumns = [
          {
            title: "Giờ chơi",
            dataIndex: "time",
            key: "time",
          },
          ...courts.map((court) => ({
            title: court.courtName,
            dataIndex: `court_${court.courtId}`,
            key: `court_${court.courtId}`,
            align: "center",
            render: (slot) =>
              slot ? (
                <Button
                  key={slot.courtSlotId}
                  className={
                    selectedSlots.some(
                      (selectedSlot) =>
                        selectedSlot.courtSlotId === slot.courtSlotId
                    )
                      ? "selected-slot"
                      : slot.courtSlotStatus === "INACTIVE"
                      ? "booked-slot"
                      : ""
                  }
                  disabled={slot.courtSlotStatus === "INACTIVE"}
                  onClick={(event) => handleSlotSelect(slot, event)} // Pass the event
                ></Button>
              ) : null,
          })),
        ];

        setColumns(generatedColumns);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCourtsData();
    fetchflexible();
  }, [club.clubId, selectedDate, selectedSlots]);

  const handleDateChange = (date, dateString) => {
    setSelectedDate(dateString);
    setSelectedSlots([]);
    setTotalHours(0);
    setTotalPrice(0);
  };

  const handleSlotSelect = (slot, event) => {
    const isSelected = selectedSlots.some(
      (selectedSlot) => selectedSlot.courtSlotId === slot.courtSlotId
    );

    const updatedSlots = isSelected
      ? selectedSlots.filter(
          (selectedSlot) => selectedSlot.courtSlotId !== slot.courtSlotId
        )
      : [...selectedSlots, slot];

    // Directly modify the class for immediate feedback
    const button = event.currentTarget;
    if (isSelected) {
      button.classList.remove("selected-slot");
    } else {
      button.classList.add("selected-slot");
    }

    setSelectedSlots(updatedSlots);
    calculateTotal(updatedSlots);
  };

  const calculateTotal = (slots) => {
    const hours = slots.length;
    const price = slots.reduce((sum, slot) => sum + slot.price, 0);

    setTotalHours(hours);
    setTotalPrice(price);
  };

  const fetchflexible = async () => {
    const response = await api.get(`booking/flexible`);
    if (response.data.length > 0) {
      const filteredData = response.data.filter(
        (value) => value.clubId === club.clubId
      );

      setFlexibleBooking(filteredData);
      setCheck(true);
    }
  };

  const handleSubmit = async () => {
    if (selectedSlots.length === 0) {
      message.warning("Vui lòng chọn ít nhất một slot.");
      return;
    }

    const bookingData = {
      bookingDetailRequests: selectedSlots.map((slot) => ({
        playingDate: selectedDate,
        courtSlotId: slot.courtSlotId,
      })),
      promotionCode: promotionCode,
      flexibleId: selectedFlexibleId,
    };

    try {
      if (
        bookingData.promotionCode &&
        bookingData.promotionCode.trim() !== ""
      ) {
        try {
          await handleCheckPromotion(bookingData.promotionCode, club.clubId);
        } catch (e) {
          return;
        }
      }
      navigate("/bill", {
        state: {
          type: "DAILY",
          booking: bookingData,
          club: club.clubId,
        },
      });
      // console.log(bookingData);
    } catch (error) {
      console.error("Error submitting booking:", error);
      message.error("Đặt sân thất bại. Vui lòng thử lại!");
    }
  };

  const disabledDate = (current) => {
    return current && current < moment().startOf("day");
  };

  const formatTime = (slotId) => {
    const hours = Math.floor(slotId);
    return `${hours}:00`;
  };

  const handleInputChange = (e) => {
    setPromotionCode(e.target.value);
  };

  const handleSelectChange = (value) => {
    setSelectedFlexibleId(value);
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
    <Row className="booking-daily">
      <Col span={6} className="booking-daily-sidebar">
        <Row>
          <Col span={24} className="booking-daily-datepicker-container">
            <DatePicker
              size="large"
              className="booking-daily-datepicker-format"
              onChange={handleDateChange}
              disabledDate={disabledDate}
              placeholder="Chọn ngày..."
            />
          </Col>
          <Col span={24} className="booking-daily-summary">
            <h1>{club.clubName}</h1>
            <p>Ngày: {selectedDate}</p>
            <p>Tổng giờ: {totalHours} giờ</p>
            <p>Tổng Tiền: {formatCurrency(totalPrice)}</p>
            <img src={club.urlImages} />
            <img
              src="https://firebasestorage.googleapis.com/v0/b/badminton-booking-platform.appspot.com/o/Screenshot%202024-07-23%20005012.png?alt=media&token=a923242e-9ea5-4280-8eca-96776d859369"
              alt=""
            />
            {check && (
              <Select
                className="booking-daily-select"
                onChange={handleSelectChange}
                defaultValue={0}
                size="large"
                placeholder="Chọn hình thức thanh toán"
              >
                <Option value={0}>Đặt bằng tiền trong ví</Option>
                {flexibleBooking.map((booking) => (
                  <Option key={booking.bookingId} value={booking.bookingId}>
                    Đặt lịch linh hoạt - {booking.clubName}
                  </Option>
                ))}
              </Select>
            )}

            <Input
              placeholder="Nhập mã khuyến mãi"
              variant="borderless"
              value={promotionCode}
              onChange={handleInputChange}
            />
            <Button
              className="booking-daily-submit-button"
              onClick={handleSubmit}
              size="large"
            >
              Thanh Toán
            </Button>
          </Col>
        </Row>
      </Col>
      <Col span={18} className="booking-daily-main">
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          rowKey="time"
          bordered="true"
        />
      </Col>
    </Row>
  );
}

export default BookingDaily;
