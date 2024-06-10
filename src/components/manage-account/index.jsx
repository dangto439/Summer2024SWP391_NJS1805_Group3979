import { Button, Image, Popconfirm, Table } from "antd";
import { useEffect, useState } from "react";
import api from "../../config/axios";

function ManageAccount() {
  const [dataSource, setDataSource] = useState([]);

  const columns = [
    {
      title: "Avartar",
      dataIndex: "avartar",
      key: "avartar",
      render: (avartar) => <Image src={avartar} alt="anh bi loi" width={50} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Account Status",
      dataIndex: "accountStatus",
      key: "accountStatus",
    },
    {
      title: "Update",
      dataIndex: "id",
      key: "id",
      render: (id) => <Button type="primary">Update</Button>,
    },
    {
      title: "Delete",
      dataIndex: "email",
      key: "email",
      render: (email) => (
        <Popconfirm
          title="Confirm to delete"
          description="Are you sure you want to delete this account?"
          onConfirm={() => handleDeleteAccount(email)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" danger>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  async function fetchaccount() {
    //sua duong link call api
    const response = await api.get("/get-all-account");
    setDataSource(response.data);
  }

  useEffect(() => {
    fetchaccount();
  }, []);

  const handleDeleteAccount = async (email) => {
    //call api cho nay
    const response = await api.put(`/block/${email}`);

    const updatedData = dataSource.filter((item) => item.email !== email);
    setDataSource([response.data, ...updatedData]);
  };

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} scroll={{ y: 650 }} />;
    </div>
  );
}

export default ManageAccount;
