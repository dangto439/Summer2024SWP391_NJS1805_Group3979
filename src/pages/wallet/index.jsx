import { useEffect, useState } from "react";
import "./index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../../config/axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice";
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Space,
  Table,
} from "antd";
import moment from "moment";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { MdAttachMoney } from "react-icons/md";
import { TbMoneybag } from "react-icons/tb";
import { useForm } from "antd/es/form/Form";
import { useOutletContext } from "react-router-dom";

function Wallet() {
  const user = useSelector(selectUser);

  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(0);
  const [totalIn, setTotalIn] = useState(0);
  const [totalOut, setTotalOut] = useState(0);
  const [transaction, setTransaction] = useState([]);
  const { setBalanceChange, balanceChange } = useOutletContext();
  const [modalTransfer, setModalTransfer] = useState(false);
  const [modalRecharge, setModalRecharge] = useState(false);

  const [formRecharge] = useForm();
  const [formTransfer] = useForm();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

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

  const formatType = (value) => {
    if (value === "TRANSFER") {
      return "Chuyển tiền";
    } else if (value === "DEPOSIT") {
      return "Nạp tiền";
    } else if (value === "REFUND") {
      return "Hoàn tiền";
    } else if (value === "RECEIVE") {
      return "Nhận tiền";
    } else if (value === "PENDING") {
      return "Đang xử lý";
    } else return "Huỷ bỏ";
  };

  const handleInputChange = (e) => {
    const formattedValue = formatCurrency(e.target.value);
    // setAmount(formattedValue);
    console.log(formattedValue);
    setAmount(e.target.value);
  };
  const onChange = (value) => {
    console.log("changed", value);
    setAmount(value);
  };
  const handleRecharge = (e) => {
    // e.preventDefault();
    // Handle form submission
    // console.log("Amount:", amount);
    handleWalletVnpay(amount); //tạo transaction pending
    //cập nhật transaction sang deposit
  };

  const handleTransfer = async (e) => {
    const response = await fetchWalletReceiver(e.email);
    const receiverWalletId = response.walletId;
    const amount = e.amount;
    const senderWalletId = user.id;
    const bookingId = 0;

    const transferDetails = {
      senderWalletId: senderWalletId,
      receiverWalletId: receiverWalletId,
      amount: amount,
      bookingId: bookingId,
    };
    // console.log(transferDetails);
    try {
      // eslint-disable-next-line no-unused-vars
      const transfer = await api.post("/wallet/transfer", transferDetails);
      toast.success("Chuyển tiền thành công!");
      setBalanceChange(balanceChange - amount);
    } catch (error) {
      console.log(error);
      toast.error("Chuyển tiền thất bại!");
    }
    fetchData();
    setModalTransfer(false);
    formRecharge.resetFields();
  };

  //mo trang thanh toan Vnpay
  const handleWalletVnpay = async (values) => {
    try {
      const response = await api.post(`/vnpay?amount=${values}`);
      const paymentLink = response.data;
      sessionStorage.setItem("reloadpage", "TRUE");
      window.location.href = paymentLink;
    } catch (error) {
      toast.error("Không thể thanh toán!");
    }
  };

  //load data
  const fetchData = async () => {
    try {
      const response = await api.get(`get-transactions/${user.id}`);
      const response2 = await api.get(`wallet/${user.id}`);
      const response3 = await api.get(
        `transactions/amount-in?accountId=${user.id}`
      );
      const response4 = await api.get(
        `transactions/amount-out?accountId=${user.id}`
      );
      setTotalIn(response3.data);
      setTotalOut(response4.data);
      setBalance(response2.data.balance);
      const transactions = response.data;

      const walletIds = new Set();
      transactions.forEach((item) => {
        if (item.receiverWallet && item.receiverWallet.walletId) {
          walletIds.add(item.receiverWallet.walletId);
        }
        if (item.senderWallet && item.senderWallet.walletId) {
          walletIds.add(item.senderWallet.walletId);
        }
      });

      const accountData = await Promise.all(
        Array.from(walletIds).map(async (walletId) => {
          try {
            const account = await api.get(`account/${walletId}`);
            return { walletId, name: account.data.name };
          } catch (error) {
            console.error(
              `Error fetching account data for wallet ID ${walletId}:`,
              error
            );
            return { walletId, name: null };
          }
        })
      );

      const accountMap = accountData.reduce((map, account) => {
        map[account.walletId] = account.name;
        return map;
      }, {});

      const transactionsWithAccounts = transactions.map((item) => ({
        ...item,
        receiverAccount: accountMap[item.receiverWallet?.walletId] || null,
        senderAccount: accountMap[item.senderWallet?.walletId] || null,
      }));

      setTransaction(transactionsWithAccounts);
      console.log(transactionsWithAccounts);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchWalletReceiver = async (email) => {
    try {
      const response = await api.get(`/wallet-email/${email}`);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      message.error(error.response.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const columns = [
    {
      title: "STT",
      key: "index",
      render: (text, record, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: "Loại giao dịch",
      dataIndex: "type",
      key: "type",
      render: (text) => formatType(text),
      filters: [
        {
          text: "Chuyển tiền",
          value: "TRANSFER",
        },
        {
          text: "Hoàn tiền",
          value: "REFUND",
        },
        {
          text: "Hủy bỏ",
          value: "CANCEL",
        },
        {
          text: "Nạp tiền",
          value: "DEPOSIT",
        },
      ],
      onFilter: (value, record) => record.type.includes(value),
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
      title: "Người gửi",
      dataIndex: "senderAccount",
      key: "senderAccount",
    },
    {
      title: "Người nhận",
      dataIndex: "receiverAccount",
      key: "receiverAccount",
    },

    {
      title: "Số tiền",
      dataIndex: "amount",
      key: "amount",
      sorter: (a, b) => a.amount - b.amount,
      sortDirections: ["descend", "ascend"],
      render: (text) => formatCurrency(text),
    },
    {
      title: "Ghi chú",
      dataIndex: "description",
      key: "description",
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
          onCancel={() => {
            setModalRecharge(false);
            formRecharge.resetFields();
          }}
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
                name="amount"
                rules={[
                  { required: true, message: "Vui lòng nhập số tiền!" },
                  {
                    validator: (_, value) =>
                      value >= 10000
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error("Số tiền phải lớn hơn 10.000đ!")
                          ),
                  },
                ]}
              >
                <InputNumber
                  style={{ width: 450 }}
                  max={50000000}
                  onChange={onChange}
                  placeholder="Nhập số tiền cần nạp"
                  size="large"
                />
              </Form.Item>
              <Button
                onClick={handleSubmitRecharge}
                type="primary"
                className="submit-button"
              >
                Nạp
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
          onCancel={() => {
            setModalTransfer(false);
            formTransfer.resetFields();
          }}
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
                  name="amount"
                  id="amount"
                  placeholder="Email người nhận tiền"
                  className="form-input-login"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="amount"
                rules={[
                  { required: true, message: "Vui lòng nhập số tiền!" },
                  {
                    validator: (_, value) =>
                      value >= 10000
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error("Số tiền phải lớn hơn 10.000đ!")
                          ),
                  },
                ]}
              >
                <InputNumber
                  style={{ width: 475 }}
                  max={50000000}
                  placeholder="Nhập số tiền cần chuyển"
                  onChange={onChange}
                  size="large"
                />
              </Form.Item>
              <Button
                onClick={handleSubmitTransfer}
                size="middle"
                type="primary"
                className="submit-button"
              >
                Chuyển
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
            <li>{formatCurrency(balance)}</li>
            <li>Số dư hiện tại</li>
          </div>
        </div>
        <div className="sum-receive">
          <div className="icon-receive">
            <TbMoneybag fontSize={50} color="white" />
          </div>
          <div>
            <li>{formatCurrency(totalIn)}</li>
            <li>Tổng tiền nhận vào</li>
          </div>
        </div>
        <div className="sum-transfer">
          <div className="icon-tranfer">
            <FaMoneyBillTransfer fontSize={50} color="white" />
          </div>
          <div>
            <li>{formatCurrency(totalOut)}</li>
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
          pagination={{
            pageSize: pageSize,
            current: currentPage,
            total: transaction.length,
            onChange: handlePageChange,
            position: ["bottomCenter"],
          }}
        />
      </div>
    </div>
  );
}

export default Wallet;
