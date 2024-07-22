import { Table, Tag } from "antd";
import { useEffect, useState } from "react";
import "./index.scss";

function ViewTransaction({ data }) {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setDataSource(data);
  }, [data]);

  const formatTypeMoney = (value) => {
    if (value === "TRANSFER") {
      return "Chuyển tiền";
    } else if (value === "REFUND") {
      return "Hoàn tiền";
    } else if (value === "CANCEL") {
      return "Huỷ";
    } else if (value === "PENDING") {
      return "Đang xử lý";
    } else return "Nạp tiền";
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  const columns = [
    {
      title: "Mã giao dịch",
      dataIndex: "transactionId",
      key: "transactionId",
    },
    {
      title: "Số tiền",
      dataIndex: "amount",
      key: "amount",
      render: (record) => formatCurrency(record),
    },
    {
      title: "Ghi chú",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Thời gian",
      dataIndex: "timestamp",
      key: "timestamp",
    },
    {
      title: "Hình thức",
      key: "type",
      dataIndex: "type",
      render: (type) => {
        let color;
        switch (type) {
          case "REFUND":
            color = "volcano";
            break;
          case "CANCEL":
            color = "red";
            break;
          case "DEPOSIT":
            color = "green";
            break;
          case "TRANSFER":
            color = "blue";
            break;
          default:
            color = "geekblue";
        }
        return (
          <Tag color={color} key={type}>
            {formatTypeMoney(type)}
          </Tag>
        );
      },
    },
    {
      title: "Mã đặt lịch",
      dataIndex: "bookingId",
      key: "bookingId",
    },
    // {
    //   title: "Người gửi",
    //   dataIndex: "sender_wallet_id",
    //   key: "sender_wallet_id",
    // },
    // {
    //   title: "Người nhận",
    //   dataIndex: "receiver_wallet_id",
    //   key: "receiver_wallet_id",
    // },
  ];

  return (
    <div className="transaction-container">
      <Table
        columns={columns}
        pagination={{
          position: ["bottomRight"],
        }}
        dataSource={dataSource}
      />
    </div>
  );
}

export default ViewTransaction;
