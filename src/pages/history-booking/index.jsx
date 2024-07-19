import "./index.scss";
import { Button, Popconfirm, Space, Table } from "antd";
import { useEffect, useState } from "react";
import api from "../../config/axios";
import moment from "moment";
import { toast } from "react-toastify";

const HistoryBooking = () => {
  const [booking, setBooking] = useState([]);
  const [bookingDetails, setBookingDetails] = useState({});

  const fetchHistoryBooking = async () => {
    const response = await api.get("/bookings/current-account");
    const booking = response.data.map((item) => {
      return {
        ...item,
        key: item.bookingId,
      };
    });
    setBooking(booking);
    // console.log(booking);
  };

  const fetchHistoryBookingDetail = async (bookingId) => {
    try {
      const response = await api.get(`booking/booking-detail/${bookingId}`);
      setBookingDetails((prevDetails) => ({
        ...prevDetails,
        [bookingId]: response.data,
      }));
    } catch (error) {
      console.error("Error fetching booking details:", error);
      setBookingDetails((prevDetails) => ({
        ...prevDetails,
        [bookingId]: [],
      }));
    }
  };

  useEffect(() => {
    fetchHistoryBooking();
  }, []);

  const handleCancelBookingDetail = async (bookingDetailId) => {
    try {
      const response = await api.delete(
        `booking/booking-detail/${bookingDetailId}`
      );
      toast.success("Hủy thành công!");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
    }
  };

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
    } else if (value === "CANCEL") {
      return "Đã huỷ";
    } else return "Đã xác nhận";
  };

  const formatBookingDetailStatus = (value) => {
    if (value === "UNFINISHED") {
      return "Chưa hoành thành";
    } else if (value === "FINISHED") {
      return "Hoàn thành";
    } else return "Đã hủy";
  };

  const expandedRowRender = (bookingId) => {
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
        render: (status) => formatBookingDetailStatus(status),
      },
      {
        title: "",
        key: "operation",
        render: (record) => (
          <Space size="middle">
            <Popconfirm
              title="Hủy lịch đã đặt!"
              description="Bạn có chắc chắn muốn hủy lịch này?"
              okText="Có"
              cancelText="Hủy"
              onConfirm={() =>
                handleCancelBookingDetail(record.bookingDetailId)
              }
              disabled={record.status === "CANCEL"}
            >
              <Button danger disabled={record.status === "CANCEL"}>
                Hủy
              </Button>
            </Popconfirm>
          </Space>
        ),
      },
    ];
    return (
      <Table
        columns={columns}
        dataSource={bookingDetails[bookingId] || []}
        pagination={{ pageSize: 5, position: ["bottomCenter"] }}
      />
    );
  };

  const columns = [
    {
      title: "STT",
      key: "index",
      render: (text, record, index) => index + 1,
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
          expandedRowRender: (record) => expandedRowRender(record.bookingId),
          onExpand: (expanded, record) => {
            if (expanded) {
              fetchHistoryBookingDetail(record.bookingId);
            }
          },
        }}
      />
    </div>
  );
};

export default HistoryBooking;
