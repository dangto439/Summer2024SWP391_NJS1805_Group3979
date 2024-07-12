import { useEffect, useState } from "react";
import "./index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../../config/axios";
import { toast } from "react-toastify";
// import ViewTransaction from "../../components/viewtransaction/viewtransaction";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice";
import { Button, Form, Input, message, Modal, Space, Table } from "antd";
import moment from "moment";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { MdAttachMoney } from "react-icons/md";
import { TbMoneybag } from "react-icons/tb";
import { useForm } from "antd/es/form/Form";

function Wallet() {
  const user = useSelector(selectUser);

  const [amount, setAmount] = useState("");
  const [transaction, setTransaction] = useState([]);

  const [modalTransfer, setModalTransfer] = useState(false);
  const [modalRecharge, setModalRecharge] = useState(false);

  const [formRecharge] = useForm();
  const [formTransfer] = useForm();

  // const formatCurrency = (value) => {
  //   if (!value) return value;
  //   // Remove all non-digit characters
  //   const cleanedValue = value.replace(/\D/g, "");
  //   // Format the number with commas
  //   const formattedValue = new Intl.NumberFormat("vi-VN").format(cleanedValue);
  //   return `${formattedValue}đ`;
  // };

  const handleSubmitRecharge = () => {
    formRecharge.submit();
  };

  const handleSubmitTransfer = () => {
    formTransfer.submit();
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  const handleInputChange = (e) => {
    // const formattedValue = formatCurrency(e.target.value);
    setAmount(e.target.value);
  };

  const handleRecharge = (e) => {
    // e.preventDefault();
    // Handle form submission
    // console.log("Amount:", amount);
    handleWalletVnpay(amount); //tạo transaction pending
    //cập nhật transaction sang deposit
  };

  const handleTransfer = async (e) => {
    // console.log(e);
    console.log(e.email);
    const receiverWalletId = await fetchWalletReceiver(e.email);
    console.log(receiverWalletId);
  };

  //mo trang thanh toan Vnpay
  const handleWalletVnpay = async (values) => {
    try {
      const response = await api.post(`/vnpay?amount=${values}`);
      const paymentLink = response.data;
      window.location.href = paymentLink;
    } catch (error) {
      toast.error("Không thể thanh toán!");
    }
  };

  //load data
  const fetchData = async () => {
    const response = await api.get(`get-transactions/${user.id}`);
    setTransaction(response.data);
    console.log(response.data);
  };

  const fetchWalletReceiver = async (email) => {
    try {
      const response = await api.post(`/wallet/${email}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      message.error(error.response.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: "Loại giao dịch",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Loại lịch",
      dataIndex: "bookingType",
      key: "bookingType",
    },
    {
      title: "Thời gian",
      dataIndex: "timestamp",
      key: "timestamp",
      defaultSortOrder: "descend",
      sorter: (a, b) => new Date(a.timestamp) - new Date(b.timestamp),
      sortDirections: ["descend", "ascend"],
      render: (text) => moment(text).format("HH:mm, DD/MM/YYYY"),
    },
    {
      title: "Người nhận",
      dataIndex: "receicerWallet.walletId",
      key: "receicerWallet.walletId",
    },
    {
      title: "Số tiền",
      dataIndex: "amount",
      key: "amount",
      sorter: (a, b) => a.amount - b.amount,
      sortDirections: ["descend", "ascend"],
      render: (text) => formatCurrency(text),
    },
  ];

  return (
    <div className="wallet">
      <div className="wallet-nav">
        <ul>
          <li>
            <p>Ví tiền</p>
          </li>
          <li>
            <button
              className="wallet-tranfer"
              onClick={() => {
                setModalTransfer(true);
              }}
            >
              Chuyển tiền
            </button>
            <button
              className="wallet-recharge"
              onClick={() => {
                setModalRecharge(true);
              }}
            >
              Nạp tiền
            </button>
          </li>
        </ul>
        <Modal
          centered
          open={modalRecharge}
          width={500}
          height={500}
          footer={null}
          onCancel={() => setModalRecharge(false)}
        >
          <Form
            className="form-group"
            autoComplete="off"
            form={formRecharge}
            onFinish={handleRecharge}
          >
            <h3 htmlFor="amount">Nạp tiền vào ví:</h3>
            <div className="text-wrap">
              <div className="text-line"></div>
            </div>
            <div className="form-group-recharge">
              <Form.Item
                name="amout"
                rules={[{ required: true, message: "Vui lòng nhập số tiền!" }]}
              >
                <Input
                  onChange={handleInputChange}
                  type="number"
                  min={10000}
                  name="amout"
                  id="amout"
                  placeholder="Số tiền nạp vào 10.000đ - 1.000.000đ"
                  className="form-input-login"
                  size="large"
                />
              </Form.Item>
              <Button
                onClick={handleSubmitRecharge}
                type="primary"
                className="submit-button"
              >
                Thanh Toán
              </Button>
              <Button
                onClick={() => {
                  formRecharge.resetFields();
                  setModalRecharge(false);
                }}
                size="middle"
                type="default"
                className="submit-button"
              >
                Huỷ
              </Button>
            </div>
          </Form>
        </Modal>

        <Modal
          centered
          open={modalTransfer}
          footer={null}
          onCancel={() => setModalTransfer(false)}
        >
          <Form
            className="form-group"
            autoComplete="off"
            onFinish={handleTransfer}
            form={formTransfer}
          >
            <h3 htmlFor="amount">Chuyển tiền:</h3>
            <div className="text-wrap">
              <div className="text-line"></div>
            </div>
            <div className="form-group-transfer">
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập Email người nhận!",
                  },
                  { type: "email", message: "Email không hợp lệ!" },
                ]}
              >
                <Input
                  name="amout"
                  id="amout"
                  placeholder="Email người nhận tiền"
                  className="form-input-login"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="amout"
                rules={[{ required: true, message: "Vui lòng nhập số tiền!" }]}
              >
                <Input
                  type="number"
                  min={10000}
                  name="amout"
                  id="amout"
                  placeholder="Số tiền chuyển 10.000đ - 1.000.000đ"
                  className="form-input-login"
                  size="large"
                />
              </Form.Item>
              <Button
                onClick={handleSubmitTransfer}
                size="middle"
                type="primary"
                className="submit-button"
              >
                Hoàn Tất
              </Button>
              <Button
                onClick={() => {
                  formTransfer.resetFields();
                  setModalTransfer(false);
                }}
                size="middle"
                type="default"
                className="submit-button"
              >
                Huỷ
              </Button>
            </div>
          </Form>
        </Modal>
      </div>
      <div className="text-wrap">
        <div className="text-line"></div>
      </div>
      <div className="wallet-infomation">
        <div className="balance">
          <div className="icon-balance">
            <MdAttachMoney fontSize={50} color="white" />
          </div>
          <div>
            <li>0Đ</li>
            <li>Số dư hiện tại</li>
          </div>
        </div>
        <div className="sum-receive">
          <div className="icon-receive">
            <TbMoneybag fontSize={50} color="white" />
          </div>
          <div>
            <li>0Đ</li>
            <li>Tổng tiền nhận vào</li>
          </div>
        </div>
        <div className="sum-transfer">
          <div className="icon-tranfer">
            <FaMoneyBillTransfer fontSize={50} color="white" />
          </div>
          <div>
            <li>0Đ</li>
            <li>Tổng tiền chi</li>
          </div>
        </div>
      </div>

      <div className="wallet-history">
        <h2>Lịch sử giao dịch</h2>
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
          dataSource={transaction}
          pagination={{ pageSize: 20 }}
        />
      </div>
    </div>
  );
}

export default Wallet;
