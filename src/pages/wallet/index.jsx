import { useState } from "react";
import "./index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../../config/axios";
import { toast } from "react-toastify";

function Wallet() {
  const [amount, setAmount] = useState("");

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
    </div>
  );
}

export default Wallet;
