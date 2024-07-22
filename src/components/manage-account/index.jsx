import { Button, Image, Popconfirm, Select, Table, Input } from "antd";
import { useEffect, useState } from "react";
import api from "../../config/axios";
import { FcKey, FcLock } from "react-icons/fc";
import "./index.scss";
import UpdateAccount from "../updateaccount";
import { render } from "@fullcalendar/core/preact.js";

function ManageAccount() {
  const [dataSource, setDataSource] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [isUpdateVisible, setIsUpdateVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);

  useEffect(() => {
    fetchAccounts();
  }, []);

  async function fetchAccounts() {
    const response = await api.get("/get-all-account");
    const filteredData = response.data.filter(
      (account) => account.role !== "ADMIN"
    );
    setDataSource(filteredData);
    setFilteredData(filteredData);
  }

  const handleTableChange = (pagination, filters) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
    const { role, accountStatus } = filters;
    setSelectedRole(role ? role[0] : null);
    setSelectedStatus(accountStatus ? accountStatus[0] : null);
    filterData(
      searchName,
      role ? role[0] : null,
      accountStatus ? accountStatus[0] : null
    );
  };

  const handleUpdateClick = (id) => {
    setSelectedId(id);
    setIsUpdateVisible(true);
  };

  const handleCancelForm = () => {
    setIsUpdateVisible(false);
    fetchAccounts();
  };

  const handleDeleteAccount = async (email) => {
    await api.put(`/block/${email}`);
    fetchAccounts();
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchName(value);
    filterData(value, selectedRole, selectedStatus);
  };

  const filterData = (name, role, status) => {
    let filtered = dataSource;

    if (name) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(name)
      );
    }

    if (role) {
      filtered = filtered.filter((item) => item.role === role);
    }

    if (status) {
      filtered = filtered.filter((item) => item.accountStatus === status);
    }

    setFilteredData(filtered);
  };

  const formartStatusAccount = (value) => {
    if (value === "INACTIVE") {
      return "Chưa kích hoạt";
    } else return "Đã kích hoạt";
  };

  const formatRoleAccount = (value) => {
    if (value === "CLUB_OWNER") {
      return "Chủ CLB";
    } else if (value === "STAFF") {
      return "Nhân viên CLB";
    } else {
      return "Khách hàng";
    }
  };

  const columns = [
    {
      title: "Ảnh đại diện",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar) => <Image src={avatar} alt="anh bi loi" width={50} />,
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Chức vụ",
      dataIndex: "role",
      key: "role",
      filters: [
        { text: "CUSTOMER", value: "CUSTOMER" },
        { text: "CLUB_OWNER", value: "CLUB_OWNER" },
        { text: "CLUB_STAFF", value: "CLUB_STAFF" },
      ],
      onFilter: (value, record) => record.role === value,
      render: (record) => formatRoleAccount(record),
    },
    {
      title: "Trạng thái",
      dataIndex: "accountStatus",
      key: "accountStatus",
      filters: [
        { text: "ACTIVE", value: "ACTIVE" },
        { text: "INACTIVE", value: "INACTIVE" },
      ],
      onFilter: (value, record) => record.accountStatus === value,
      render: (record) => formartStatusAccount(record),
    },

    {
      title: "Cập nhật",
      dataIndex: "accountId",
      key: "accountId",
      render: (accountId) => (
        <Button type="primary" onClick={() => handleUpdateClick(accountId)}>
          Cập nhật
        </Button>
      ),
    },
    {
      title: "Cập nhật trạng thái",
      dataIndex: "accountStatus",
      key: "accountStatus",
      render: (accountStatus, record) => (
        <Popconfirm
          title="Xác thực"
          description="Bạn có chắc muốn thay đổi trạng thái của tài khoản không?"
          onConfirm={() => handleDeleteAccount(record.email)}
          okText="Có"
          cancelText="Không"
        >
          {accountStatus === "ACTIVE" ? (
            <FcLock className="icon" />
          ) : (
            <FcKey className="icon" />
          )}
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="manager_account">
      <div className="manager_account_top">
        <Select
          showSearch
          placeholder="2/trang"
          optionFilterProp="label"
          onChange={(value) => setPageSize(parseInt(value))}
          options={[
            { value: "2", label: "2/trang" },
            { value: "4", label: "4/trang" },
            { value: "10", label: "10/trang" },
            { value: "30", label: "30/trang" },
          ]}
        />
        <Input
          placeholder="Tìm kiếm theo tên"
          style={{ width: 200, marginLeft: 10 }}
          onChange={handleSearch}
        />
      </div>
      <div className="manager_account_table">
        <Table
          dataSource={filteredData.slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize
          )}
          columns={columns}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: filteredData.length,
            position: ["bottomCenter"],
          }}
          onChange={handleTableChange}
        />
      </div>
      {isUpdateVisible && <UpdateAccount id={selectedId} />}
      <div className="button_cancel_form">
        {isUpdateVisible && (
          <Button type="primary" danger onClick={handleCancelForm}>
            Đóng
          </Button>
        )}
      </div>
      <br />
    </div>
  );
}

export default ManageAccount;
