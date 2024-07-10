import "./index.scss";
import { Space, Table } from "antd";
import { useEffect, useState } from "react";
import api from "../../config/axios";
import moment from "moment";

const HistoryBooking = () => {
  const [booking, setBooking] = useState([]);
  const [nameType, setNameType] = useState("");

  const fetchHistoryBooking = async () => {
    const response = await api.get("/bookings/current-account");
    console.log(response.data);
    setBooking(response.data);
  };

  useEffect(() => {
    fetchHistoryBooking();
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  const formatBookingType = (value) => {
    if (value == "FIXEDBOOKING") {
      setNameType("Cố định");
    } else if (value == "FLEXIBLEBOOKING") {
      setNameType("Linh hoạt");
    } else setNameType("Ngày");

    return nameType;
  };

  const columns = [
    {
      title: "Tên CLB",
      dataIndex: "clubName",
      key: "clubName",
    },
    {
      title: "Loại lịch",
      dataIndex: "bookingType",
      key: "bookingType",
      render: (text) => formatBookingType(text),
    },
    {
      title: "Tổng giờ",
      dataIndex: "amountTime",
      key: "amountTime",
      sorter: (a, b) => a.amountTime - b.amountTime,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Ngày đặt lịch",
      dataIndex: "bookingDate",
      key: "bookingDate",
      defaultSortOrder: "descend",
      sorter: (a, b) => new Date(a.bookingDate) - new Date(b.bookingDate),
      sortDirections: ["descend", "ascend"],
      render: (text) => moment(text).format("HH:mm, DD/MM/YYYY"),
    },
    {
      title: "Trạng thái",
      dataIndex: "bookingStatus",
      key: "bookingStatus",
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      sorter: (a, b) => a.totalPrice - b.totalPrice,
      sortDirections: ["descend", "ascend"],
      render: (text) => formatCurrency(text),
    },
  ];

  return (
    <div style={{ height: "100vh" }}>
      <h1>Lịch sử đặt lịch</h1>
      <Space
        style={{
          marginBottom: 16,
        }}
      >
        {/* <Button onClick={setAgeSort}>Sort age</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button> */}
      </Space>
      <Table
        columns={columns}
        dataSource={booking}
        pagination={{ pageSize: 20 }}
      />
    </div>
  );
};

export default HistoryBooking;
