import { Button, Image, Popconfirm, Select, Table } from "antd";
import { useEffect, useState } from "react";
import api from "../../config/axios";
import { FcKey, FcLock } from "react-icons/fc";
import "./index.scss";
import UpdateAccount from "../updateaccount";

function ManageAccount() {
  const [dataSource, setDataSource] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [isUpdateVisible, setIsUpdateVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const onChange = (value) => {
    setPageSize(value);
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
    },
    {
      title: "Trạng thái",
      dataIndex: "accountStatus",
      key: "accountStatus",
    },
    {
      title: "Cập nhật",
      dataIndex: "accountId",
      key: "accountId",
      render: (accountId) => (
        <Button type="primary" onClick={() => handleUpdateClick(accountId)}>
          Update
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

  async function fetchAccounts() {
    const response = await api.get("/get-all-account");
    setDataSource(response.data);
  }

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleDeleteAccount = async (email) => {
    await api.put(`/block/${email}`);
    fetchAccounts();
  };

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  const handleUpdateClick = (id) => {
    console.log(id);
    setSelectedId(id);
    setIsUpdateVisible(true);
  };

  const hanldeCancleForm = () => {
    setIsUpdateVisible(false);
  };

  return (
    <div className="manager_account">
      <div className="manager_account_top">
        <Select
          showSearch
          placeholder="2/trang"
          optionFilterProp="label"
          onChange={onChange}
          options={[
            { value: "2", label: "2/trang" },
            { value: "4", label: "4/trang" },
            { value: "10", label: "10/trang" },
            { value: "30", label: "30/trang" },
          ]}
        />
      </div>
      <div className="manager_account_table">
        <Table
          dataSource={dataSource.slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize
          )}
          columns={columns}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: dataSource.length,
            position: ["bottomCenter"],
          }}
          onChange={handleTableChange}
        />
      </div>
      {isUpdateVisible && (
        <Button type="primary" danger onClick={hanldeCancleForm}>
          đóng
        </Button>
      )}
      {isUpdateVisible && <UpdateAccount id={selectedId} />}
    </div>
  );
}

export default ManageAccount;
