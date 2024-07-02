import { Table, Tag } from "antd";
import { useState } from "react";
import "./index.scss";

function ViewTransaction() {
  const [dataSource, setDataSource] = useState([
    {
      key: "1",
      transaction_id: "12345",
      amount: 100,
      description: "Payment for services",
      timestamp: "2024-06-28 10:00",
      type: ["REFUND"],
      booking_id: "BK123",
      sender_wallet_id: "SW123",
      receiver_wallet_id: "RW123",
    },
    {
      key: "2",
      transaction_id: "67890",
      amount: 200,
      description: "Product purchase",
      timestamp: "2024-06-28 12:00",
      type: ["CANCEL"],
      booking_id: "BK124",
      sender_wallet_id: "SW124",
      receiver_wallet_id: "RW124",
    },
    {
      key: "3",
      transaction_id: "54321",
      amount: 150,
      description: "Refund for order",
      timestamp: "2024-06-28 14:00",
      type: ["DEPOSIT"],
      booking_id: "BK125",
      sender_wallet_id: "SW125",
      receiver_wallet_id: "RW125",
    },
    {
      key: "4",
      transaction_id: "09876",
      amount: 250,
      description: "Money transfer",
      timestamp: "2024-06-28 16:00",
      type: ["TRANSFER"],
      booking_id: "BK126",
      sender_wallet_id: "SW126",
      receiver_wallet_id: "RW126",
    },
    {
      key: "5",
      transaction_id: "11223",
      amount: 300,
      description: "Online purchase",
      timestamp: "2024-06-29 10:30",
      type: ["TRANSFER"],
      booking_id: "BK127",
      sender_wallet_id: "SW127",
      receiver_wallet_id: "RW127",
    },
    {
      key: "6",
      transaction_id: "44556",
      amount: 400,
      description: "Refund for return",
      timestamp: "2024-06-29 11:00",
      type: ["REFUND"],
      booking_id: "BK128",
      sender_wallet_id: "SW128",
      receiver_wallet_id: "RW128",
    },
    {
      key: "7",
      transaction_id: "77889",
      amount: 500,
      description: "Service cancellation",
      timestamp: "2024-06-29 12:00",
      type: ["CANCEL"],
      booking_id: "BK129",
      sender_wallet_id: "SW129",
      receiver_wallet_id: "RW129",
    },
    {
      key: "8",
      transaction_id: "99001",
      amount: 600,
      description: "Deposit to account",
      timestamp: "2024-06-29 13:00",
      type: ["DEPOSIT"],
      booking_id: "BK130",
      sender_wallet_id: "SW130",
      receiver_wallet_id: "RW130",
    },
    {
      key: "9",
      transaction_id: "22334",
      amount: 700,
      description: "Transfer to friend",
      timestamp: "2024-06-29 14:00",
      type: ["TRANSFER"],
      booking_id: "BK131",
      sender_wallet_id: "SW131",
      receiver_wallet_id: "RW131",
    },
    {
      key: "10",
      transaction_id: "55667",
      amount: 800,
      description: "Product refund",
      timestamp: "2024-06-29 15:00",
      type: ["REFUND"],
      booking_id: "BK132",
      sender_wallet_id: "SW132",
      receiver_wallet_id: "RW132",
    },
    {
      key: "11",
      transaction_id: "88990",
      amount: 900,
      description: "Service deposit",
      timestamp: "2024-06-29 16:00",
      type: ["DEPOSIT"],
      booking_id: "BK133",
      sender_wallet_id: "SW133",
      receiver_wallet_id: "RW133",
    },
    {
      key: "12",
      transaction_id: "99112",
      amount: 1000,
      description: "Cancellation fee",
      timestamp: "2024-06-29 17:00",
      type: ["CANCEL"],
      booking_id: "BK134",
      sender_wallet_id: "SW134",
      receiver_wallet_id: "RW134",
    },
    {
      key: "13",
      transaction_id: "33445",
      amount: 1100,
      description: "Money transfer",
      timestamp: "2024-06-29 18:00",
      type: ["TRANSFER"],
      booking_id: "BK135",
      sender_wallet_id: "SW135",
      receiver_wallet_id: "RW135",
    },
    {
      key: "14",
      transaction_id: "66778",
      amount: 1200,
      description: "Product purchase",
      timestamp: "2024-06-29 19:00",
      type: ["TRANSFER"],
      booking_id: "BK136",
      sender_wallet_id: "SW136",
      receiver_wallet_id: "RW136",
    },
  ]);

  const columns = [
    {
      title: "Transaction Id",
      dataIndex: "transaction_id",
      key: "transaction_id",
    },
    {
      title: "Số tiền",
      dataIndex: "amount",
      key: "amount",
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
      render: (types) => (
        <span>
          {types.map((type) => {
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
                {type.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      ),
    },
    {
      title: "Mã booking",
      dataIndex: "booking_id",
      key: "booking_id",
    },
    {
      title: "Người gửi",
      dataIndex: "sender_wallet_id",
      key: "sender_wallet_id",
    },
    {
      title: "Người nhận",
      dataIndex: "receiver_wallet_id",
      key: "receiver_wallet_id",
    },
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
