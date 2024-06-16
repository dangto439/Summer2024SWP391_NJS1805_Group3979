import { useState, useEffect } from "react";
import { Button, Col, Row, DatePicker, Table, message } from "antd";
import moment from "moment";
import api from "../../config/axios";
import "./index.scss";

function BookingDaily({ clubID }) {
  const [selectedDate, setSelectedDate] = useState(moment());
  const [dataSource, setDataSource] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [totalHours, setTotalHours] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const fetchCourtsData = async () => {
      try {
        // Thay đổi API chỗ này để lấy danh sách courts
        const courtsResponse = await api.get(`/courts/${clubID}`);
        const courts = courtsResponse.data;

        const slotsPromises = courts.map((court) =>
          api.get(`/court-slot/${court.courtId}`)
        );
        const slotsResponses = await Promise.all(slotsPromises);

        const slotsData = slotsResponses.flatMap((response) => response.data);

        // Chuyển đổi dữ liệu thành định dạng mong muốn
        const formattedData = slotsData.reduce((result, slot) => {
          const time = formatTime(slot.slotId);
          if (!result[time]) {
            result[time] = { time };
          }
          result[time][`court_${slot.courtResponse.courtId}`] = slot;
          return result;
        }, {});

        setDataSource(Object.values(formattedData));

        const generatedColumns = [
          ...courts.map((court) => ({
            title: court.courtName,
            dataIndex: `court_${court.courtId}`,
            key: court.courtId,
            render: (slot) =>
              slot ? (
                <Button
                  className={
                    selectedSlots.some(
                      (selectedSlot) =>
                        selectedSlot.courtSlotId === slot.courtSlotId
                    )
                      ? "selected-slot"
                      : ""
                  }
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
  }, [selectedSlots]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSlotSelect = (slot) => {
    const updatedSlots = [...selectedSlots];
    const slotIndex = updatedSlots.findIndex(
      (selectedSlot) => selectedSlot.courtSlotId === slot.courtSlotId
    );

    if (slotIndex === -1) {
      updatedSlots.push(slot);
    } else {
      updatedSlots.splice(slotIndex, 1);
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

  const handleSubmit = async () => {
    if (selectedSlots.length === 0) {
      message.warning("Vui lòng chọn ít nhất một slot.");
      return;
    }

    const bookingData = {
      bookingDetailRequests: selectedSlots.map((slot) => ({
        courtSlotId: slot.courtSlotId,
        playingDate: selectedDate.format("YYYY-MM-DD"),
      })),
      promotionCode: "string",
      flexibleBookingId: 0,
    };

    try {
      // Thanh Toán

      //Đặt sân
      const booking = await api.post("/booking/daily", bookingData);
      message.success("Đặt sân thành công!");
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

  return (
    <Row className="booking">
      <Col span={7} className="booking-sidebar">
        <Row>
          <Col span={24} className="date-picker-container">
            <DatePicker
              value={selectedDate}
              onChange={handleDateChange}
              disabledDate={disabledDate}
            />
          </Col>
          <Col span={24} className="booking-summary">
            <h1>Sân cầu lông Cao Lỗ</h1>
            <h1>Ngày: {selectedDate.format("DD/MM/YYYY")}</h1>
            <h1>Tổng giờ: {totalHours} giờ</h1>
            <h1>Tổng Tiền: {totalPrice} VND</h1>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/badminton-booking-platform.appspot.com/o/z5545153816126_834da2b1757f9fca8d39197a7ac64f93.jpg?alt=media&token=50c69782-7782-42c9-877d-c07a1e906abb"
              alt=""
            />
            <Button className="submit-button" onClick={handleSubmit}>
              TIẾP THEO
            </Button>
          </Col>
        </Row>
      </Col>
      <Col span={17} className="booking-main">
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          rowKey="time"
          scroll={{ y: "calc(100vh - 200px)" }}
        />
      </Col>
    </Row>
  );
}

export default BookingDaily;
