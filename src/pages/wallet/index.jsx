import { useEffect, useState } from "react";
import "./index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../../config/axios";
import { toast } from "react-toastify";
import ViewTransaction from "../../components/viewtransaction/viewtransaction";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice";
import { Form, Input } from "antd";

function Wallet() {
  const user = useSelector(selectUser);

  const [amount, setAmount] = useState("");
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(true);

  const handleInputChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
    // Handle form submission
    // console.log("Amount:", amount);
    handleWalletVnpay(amount); //tạo transaction pending

    //cập nhật transaction sang deposit
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
    setData(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="wallet">
      <div className="wallet-nav">
        <ul>
          <li
            onClick={() => {
              setVisible(true);
            }}
            className=""
          >
            Nạp tiền
          </li>

          <li
            onClick={() => {
              setVisible(false);
            }}
            className=""
          >
            Chuyển tiền
          </li>
        </ul>
      </div>
      {visible ? (
        <>
          <div className="wallet-payment">
            {/* <form className="payment-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="amount">Nạp tiền vào ví:</label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={amount}
                  onChange={handleInputChange}
                  min={10000}
                  placeholder="Số tiền nạp vào 10.000đ - 1.000.000đ"
                />
              </div>
              <button type="submit" className="submit-button">
                Thanh Toán
              </button>
            </form> */}
            <Form
              className="form-group"
              autoComplete="off"
              onFinish={handleSubmit}
            >
              <h3 htmlFor="amount">Nạp tiền vào ví:</h3>
              <div className="form-group-login">
                <Form.Item
                  name="amout"
                  rules={[
                    { required: true, message: "Vui lòng nhập số tiền!" },
                  ]}
                >
                  <Input
                    onChange={handleInputChange}
                    type="number"
                    min={10000}
                    name="amout"
                    id="amout"
                    placeholder="Số tiền nạp vào 10.000đ - 1.000.000đ"
                    className="form-input-login"
                  />
                </Form.Item>
                <button type="submit" className="submit-button">
                  Thanh Toán
                </button>
              </div>
            </Form>
          </div>

          <div className="wallet-payment-history">
            <h1>Lịch sử nạp tiền</h1>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Số tiền</th>
                  <th scope="col">Ngày</th>
                  <th scope="col">Handle</th>
                  <th scope="col">Handle</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry the Bird</td>
                  <td>@twitter</td>
                  <td>@mdo</td>
                  <td>@mdo</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <>
          <div className="wallet-transfer">
            <Form
              className="form-group"
              autoComplete="off"
              onFinish={handleSubmit}
            >
              <h3 htmlFor="amount">Chuyển tiền:</h3>
              <div className="form-group-login">
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
                  />
                </Form.Item>

                <Form.Item
                  name="amout"
                  rules={[
                    { required: true, message: "Vui lòng nhập số tiền!" },
                  ]}
                >
                  <Input
                    type="number"
                    min={10000}
                    name="amout"
                    id="amout"
                    placeholder="Số tiền chuyển 10.000đ - 1.000.000đ"
                    className="form-input-login"
                  />
                </Form.Item>
                <button type="submit" className="submit-button">
                  Hoàn Tất
                </button>
              </div>
            </Form>
            {/* <form className="payment-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="amount">Chuyển tiền:</label>
                <input
                  type="text"
                  id="amount"
                  name="amount"
                  // value={amount}
                  // onChange={handleInputChange}
                  placeholder="Email người nhận"
                />

                <input
                  type="number"
                  id="amount"
                  name="amount"
                  // value={amount}
                  // onChange={handleInputChange}
                  placeholder="Số tiền chuyển vào 10.000đ - 1.000.000đ"
                />
              </div>
              <button type="submit" className="submit-button">
                Hoàn Tất
              </button>
            </form> */}
          </div>

          <div className="wallet-transfer-history">
            <h1>Lịch sử chuyển tiền</h1>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Số tiền</th>
                  <th scope="col">Ngày</th>
                  <th scope="col">Người nhận</th>
                  <th scope="col">Handle</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry the Bird</td>
                  <td>@twitter</td>
                  <td>@mdo</td>
                  <td>@mdo</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default Wallet;
