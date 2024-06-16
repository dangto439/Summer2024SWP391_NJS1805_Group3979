import "./index.scss";

// import { useState } from "react";
import { Space, Table } from "antd";

const HistoryBooking = () => {
  const data = [
    {
      key: "1",
      nameClub: "John Brown",
      numberCourt: "1",
      typeBooking: "fixed",
      slot: "1",
      bookingDate: "20-4-2024",
      playingDate: "22-4-2024",
      status: "Done",
      totalPrice: "100.000d",
    },
    {
      key: "2",
      nameClub: "John Brown",
      numberCourt: "1",
      typeBooking: "fixed",
      slot: "1",
      bookingDate: "20-4-2024",
      playingDate: "22-4-2024",
      status: "Done",
      totalPrice: "100.000d",
    },
  ];
  //   const [filteredInfo, setFilteredInfo] = useState({});
  //   const [sortedInfo, setSortedInfo] = useState({});
  //   const handleChange = (pagination, filters, sorter) => {
  //     console.log("Various parameters", pagination, filters, sorter);
  //     setFilteredInfo(filters);
  //     setSortedInfo(sorter);
  //   };
  //   const clearFilters = () => {
  //     setFilteredInfo({});
  //   };
  //   const clearAll = () => {
  //     setFilteredInfo({});
  //     setSortedInfo({});
  //   };
  //   const setAgeSort = () => {
  //     setSortedInfo({
  //       order: "descend",
  //       columnKey: "age",
  //     });
  //   };
  const columns = [
    {
      title: "Tên CLB",
      dataIndex: "nameClub",
      key: "nameClub",
      //   filters: [
      //     {
      //       text: "Joe",
      //       value: "Joe",
      //     },
      //     {
      //       text: "Jim",
      //       value: "Jim",
      //     },
      //   ],
      //   filteredValue: filteredInfo.name || null,
      //   onFilter: (value, record) => record.name.includes(value),
      //   sorter: (a, b) => a.name.length - b.name.length,
      //   sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
      //   ellipsis: true,
    },
    {
      title: "Sân số",
      dataIndex: "numberCourt",
      key: "numberCourt",
      //   filters: [
      //     {
      //       text: "Joe",
      //       value: "Joe",
      //     },
      //     {
      //       text: "Jim",
      //       value: "Jim",
      //     },
      //   ],
      //   filteredValue: filteredInfo.name || null,
      //   onFilter: (value, record) => record.name.includes(value),
      //   sorter: (a, b) => a.name.length - b.name.length,
      //   sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
      //   ellipsis: true,
    },
    {
      title: "Loại lịch",
      dataIndex: "typeBooking",
      key: "typeBooking",
      //   filters: [
      //     {
      //       text: "London",
      //       value: "London",
      //     },
      //     {
      //       text: "New York",
      //       value: "New York",
      //     },
      //   ],
      //   filteredValue: filteredInfo.address || null,
      //   onFilter: (value, record) => record.address.includes(value),
      //   sorter: (a, b) => a.address.length - b.address.length,
      //   sortOrder: sortedInfo.columnKey === "address" ? sortedInfo.order : null,
      //   ellipsis: true,
    },
    {
      title: "Khung giờ",
      dataIndex: "slot",
      key: "slot",
      //   filters: [
      //     {
      //       text: "London",
      //       value: "London",
      //     },
      //     {
      //       text: "New York",
      //       value: "New York",
      //     },
      //   ],
      //   filteredValue: filteredInfo.address || null,
      //   onFilter: (value, record) => record.address.includes(value),
      //   sorter: (a, b) => a.address.length - b.address.length,
      //   sortOrder: sortedInfo.columnKey === "address" ? sortedInfo.order : null,
      //   ellipsis: true,
    },

    {
      title: "Ngày đặt lịch",
      dataIndex: "bookingDate",
      key: "bookingDate",
      //   filters: [
      //     {
      //       text: "London",
      //       value: "London",
      //     },
      //     {
      //       text: "New York",
      //       value: "New York",
      //     },
      //   ],
      //   filteredValue: filteredInfo.address || null,
      //   onFilter: (value, record) => record.address.includes(value),
      //   sorter: (a, b) => a.address.length - b.address.length,
      //   sortOrder: sortedInfo.columnKey === "address" ? sortedInfo.order : null,
      //   ellipsis: true,
    },
    {
      title: "Ngày chơi",
      dataIndex: "playingDate",
      key: "playingDate",
      //   filters: [
      //     {
      //       text: "London",
      //       value: "London",
      //     },
      //     {
      //       text: "New York",
      //       value: "New York",
      //     },
      //   ],
      //   filteredValue: filteredInfo.address || null,
      //   onFilter: (value, record) => record.address.includes(value),
      //   sorter: (a, b) => a.address.length - b.address.length,
      //   sortOrder: sortedInfo.columnKey === "address" ? sortedInfo.order : null,
      //   ellipsis: true,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      //   filters: [
      //     {
      //       text: "London",
      //       value: "London",
      //     },
      //     {
      //       text: "New York",
      //       value: "New York",
      //     },
      //   ],
      //   filteredValue: filteredInfo.address || null,
      //   onFilter: (value, record) => record.address.includes(value),
      //   sorter: (a, b) => a.address.length - b.address.length,
      //   sortOrder: sortedInfo.columnKey === "address" ? sortedInfo.order : null,
      //   ellipsis: true,
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      //   filters: [
      //     {
      //       text: "London",
      //       value: "London",
      //     },
      //     {
      //       text: "New York",
      //       value: "New York",
      //     },
      //   ],
      //   filteredValue: filteredInfo.address || null,
      //   onFilter: (value, record) => record.address.includes(value),
      //   sorter: (a, b) => a.address.length - b.address.length,
      //   sortOrder: sortedInfo.columnKey === "address" ? sortedInfo.order : null,
      //   ellipsis: true,
    },
  ];
  return (
    <>
      <Space
        style={{
          marginBottom: 16,
        }}
      >
        {/* <Button onClick={setAgeSort}>Sort age</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button> */}
      </Space>
      <Table columns={columns} dataSource={data} />
    </>
  );
};
export default HistoryBooking;
