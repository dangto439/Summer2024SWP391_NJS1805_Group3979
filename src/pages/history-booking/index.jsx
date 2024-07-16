import "./index.scss";
import { Badge, Space, Table } from "antd";
import { useEffect, useState } from "react";
import api from "../../config/axios";
import moment from "moment";

const HistoryBooking = () => {
  const [booking, setBooking] = useState([]);
  const [bookingDetail, setBookingDetail] = useState([]);

  const fetchHistoryBooking = async () => {
    const response = await api.get("/bookings/current-account");
    setBooking(response.data);
    // console.log(response.data);
  };

  const fetchHistoryBookingDetail = async (bookingId) => {
    try {
      const response = await api.get(`booking/booking-detail/${bookingId}`);
      if (response.data) {
        setBookingDetail(response.data);
      } else {
        setBookingDetail([]); // or setBookingDetail([]) if you prefer an empty array
      }
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching booking details:", error);
      setBookingDetail([]); // or setBookingDetail([]) in case of error
    }
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
    if (value === "FIXEDBOOKING") {
      return "Cố định";
    } else if (value === "FLEXIBLEBOOKING") {
      return "Linh hoạt";
    } else return "Ngày";
  };

  const formatBookingStatus = (value) => {
    if (value === "PENDING" || value === null || value === "") {
      return "Đang xử lý";
    } else return "Đã xác nhận";
  };

  const expandedRowRender = () => {
    const columns = [
      {
        title: "Id",
        dataIndex: "bookingDetailId",
        key: "bookingDetailId",
      },

      {
        title: "Ngày chơi",
        dataIndex: "playingDate",
        key: "playingDate",
        defaultSortOrder: "descend",
        sorter: (a, b) => new Date(a.playingDate) - new Date(b.playingDate),
        sortDirections: ["descend", "ascend"],
        render: (text) => moment(text).format("HH:mm, DD/MM/YYYY"),
      },
      {
        title: "Sân",
        dataIndex: "courtName",
        key: "courtName",
      },
      {
        title: "Mã checking",
        dataIndex: "checkInCode",
        key: "checkInCode",
      },
      {
        title: "Giá tiền",
        dataIndex: "price",
        key: "price",
        sorter: (a, b) => a.price - b.price,
        sortDirections: ["descend", "ascend"],
        render: (text) => formatCurrency(text),
      },
      {
        title: "Giờ bắt đầu",
        dataIndex: "timeSlot",
        key: "timeSlot",
      },
      {
        title: "Trạng thái",
        dataIndex: "status",
        key: "status",
      },
      {
        title: "Action",
        key: "operation",
        render: () => (
          <Space size="middle">
            <a>Pause</a>
            <a>Stop</a>
          </Space>
        ),
      },
    ];

    return (
      <Table
        columns={columns}
        dataSource={bookingDetail.map((detail) => ({
          ...detail,
          key: detail.bookingDetailId, // Hoặc sử dụng một thuộc tính duy nhất khác nếu thích
        }))}
        pagination={{ pageSize: 5, position: ["bottomCenter"] }}
      />
    );
  };

  const columns = [
    {
      title: "Booking Id",
      dataIndex: "bookingId",
      key: "bookingId",
      // hidden: "true",
    },
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
      render: (status) => formatBookingStatus(status),
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
    <div className="history-booking-page">
      <h1>Lịch sử đặt lịch</h1>
      <Space
        style={{
          marginBottom: 16,
        }}
      ></Space>
      <Table
        key={booking}
        columns={columns}
        dataSource={booking}
        pagination={{ pageSize: 20, position: ["bottomCenter"] }}
        expandable={{
          expandedRowRender,
          onExpand: (expanded, record) => {
            if (expanded) {
              expandedRowRender(record.bookingId);
              fetchHistoryBookingDetail(record.bookingId);
            }
          },
          // defaultExpandedRowKeys: ["19"],
        }}
      />
    </div>
  );
};

export default HistoryBooking;
