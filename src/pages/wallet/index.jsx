import { useEffect, useState } from "react";
import "./index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../../config/axios";
import { toast } from "react-toastify";
import ViewTransaction from "../../components/viewtransaction/viewtransaction";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice";

function Wallet() {
  const user = useSelector(selectUser);

  const [amount, setAmount] = useState("");
  const [data, setData] = useState([]);

  const handleInputChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    // console.log("Amount:", amount);
    handleWalletVnpay(amount); //tạo transaction pending

    //cập nhật transaction sang
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
      <div className="wallet-payment">
        <form className="payment-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="amount">Nạp ví dịch vụ:</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={amount}
              onChange={handleInputChange}
              placeholder="Số tiền nạp vào 0đ - 1.000.000đ"
            />
          </div>
          <button type="submit" className="submit-button">
            Thanh Toán
          </button>
        </form>
      </div>

      <div className="wallet-history">
        <h1>Lịch sử nạp tiền</h1>
        <ViewTransaction data={data} />
      </div>
    </div>
  );
}

export default Wallet;
