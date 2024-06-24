/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Button, Col, Row, DatePicker, Table, message, Input } from "antd";
import moment from "moment";
import api from "../../config/axios";
import { toast } from "react-toastify";
import "./index.scss";

function BookingDaily({ club }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [totalHours, setTotalHours] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [columns, setColumns] = useState([]);
  const [promotionCode, setPromotionCode] = useState("");

  useEffect(() => {
    const fetchCourtsData = async () => {
      if (!selectedDate) return;

      try {
        const courtsResponse = await api.get(`/courts/${club.clubId}`);
        const courts = courtsResponse.data;

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
          ...courts.map((court) => ({
            title: court.courtName,
            dataIndex: `court_${court.courtId}`,
            key: court.courtId,
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
                  onClick={() => handleSlotSelect(slot)}
                >
                  {formatTime(slot.slotId)}
                </Button>
              ) : null,
          })),
        ];

        setColumns(generatedColumns);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCourtsData();
  }, [club.clubId, selectedDate, selectedSlots]);

  const handleDateChange = (date, dateString) => {
    setSelectedDate(dateString);
    setSelectedSlots([]);
    setTotalHours(0);
    setTotalPrice(0);
  };

  const handleSlotSelect = (slot) => {
    const isSelected = selectedSlots.some(
      (selectedSlot) => selectedSlot.courtSlotId === slot.courtSlotId
    );
    const updatedSlots = isSelected
      ? selectedSlots.filter(
          (selectedSlot) => selectedSlot.courtSlotId !== slot.courtSlotId
        )
      : [...selectedSlots, slot];

    setSelectedSlots(updatedSlots);
    calculateTotal(updatedSlots);
  };

  const calculateTotal = (slots) => {
    const hours = slots.length;
    const price = slots.reduce((sum, slot) => sum + slot.price, 0);

    setTotalHours(hours);
    setTotalPrice(price);
  };

  const handleWallet = async (values) => {
    try {
      const response = await api.post(`/vnpay?amount=${values}`);
      const paymentLink = response.data;
      window.location.href = paymentLink;
    } catch (error) {
      toast.error("Không thể thanh toán!");
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
    };

    try {
      console.log(bookingData);
      const booking = await api.post("/booking/daily", bookingData);

      handleWallet(booking.data.totalPrice);
    } catch (error) {
      console.error("Error submitting booking:", error);
      message.error("Đặt sân thất bại. Vui lòng thử lại.");
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

  return (
    <Row className="booking-daily">
      <Col span={7} className="booking-daily-sidebar">
        <Row>
          <Col span={24} className="booking-daily-datepicker-container">
            <DatePicker
              className="booking-daily-datepicker-format"
              onChange={handleDateChange}
              disabledDate={disabledDate}
            />
          </Col>
          <Col span={24} className="booking-daily-summary">
            <h1>{club.clubName}</h1>
            <h1>Ngày: {selectedDate}</h1>
            <h1>Tổng giờ: {totalHours} giờ</h1>
            <h1>Tổng Tiền: {totalPrice} VND</h1>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/badminton-booking-platform.appspot.com/o/z5545153816126_834da2b1757f9fca8d39197a7ac64f93.jpg?alt=media&token=50c69782-7782-42c9-877d-c07a1e906abb"
              alt=""
            />
            <Input
              placeholder="Nhập mã khuyến mãi"
              variant="borderless"
              value={promotionCode}
              onChange={handleInputChange}
            />
            <Button
              className="booking-daily-submit-button"
              onClick={handleSubmit}
            >
              THANH TOÁN
            </Button>
          </Col>
        </Row>
      </Col>
      <Col span={17} className="booking-daily-main">
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          rowKey="time"
        />
      </Col>
    </Row>
  );
}

export default BookingDaily;
