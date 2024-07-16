import { useLocation, useNavigate } from "react-router-dom";
import { Button, Result } from "antd";
import api from "../../config/axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

// Utility function to parse query parameters
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Payment() {
  const query = useQuery();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState(null);
  const [amount, setAmount] = useState(0);

  const vnp_Amount = query.get("vnp_Amount");
  const vnp_BankCode = query.get("vnp_BankCode");
  const vnp_PayDate = query.get("vnp_PayDate");
  const vnp_ResponseCode = query.get("vnp_ResponseCode");
  const walletId = query.get("walletId");
  const transactionId = query.get("transactionId");

  const handleClickHome = () => {
    navigate("/");
  };

  const isSuccess = Number(vnp_ResponseCode) === 0;

  const handleGetTransaction = async () => {
    try {
      const response = await api.get(`/transaction/${transactionId}`);
      setTransaction(response.data);
      if (response.data.type === "PENDING") {
        setAmount(Number(vnp_Amount) / 100);
      } else {
        setAmount(0);
      }
    } catch (error) {
      toast.error("Lấy transaction hiện tại thất bại");
    }
  };

  const handleUpdateTransactionDeposit = async (transactionType) => {
    try {
      const updatedTransaction = { ...transaction, type: transactionType };
      await api.put(
        `/transaction/${transactionId}?transactionType=${transactionType}`,
        updatedTransaction
      );
      setTransaction(updatedTransaction);
    } catch (error) {
      toast.error("Cập nhật transaction thất bại");
    }
  };

  const handleWalletDeposit = async () => {
    try {
      await api.post(`/wallet/${walletId}/deposit?amount=${amount}`);
    } catch (error) {
      toast.error("Cộng tiền vào ví thất bại");
    }
  };

  useEffect(() => {
    const processPayment = async () => {
      await handleGetTransaction();
      if (isSuccess) {
        await handleWalletDeposit();
        await handleUpdateTransactionDeposit("DEPOSIT");
      } else {
        await handleUpdateTransactionDeposit("CANCEL");
      }
    };

    processPayment();
  }, [amount]);

  return (
    <div className="ReturnPay container">
      {isSuccess ? (
        <Result
          status="success"
          title="Bạn đã thanh toán thành công"
          subTitle={
            <>
              Ngân hàng giao dịch: {vnp_BankCode} <br />
              Ngày thanh toán: {vnp_PayDate} <br />
              Số tiền thanh toán: {vnp_Amount / 100} VND
            </>
          }
          extra={[
            <Button type="primary" key="console" onClick={handleClickHome}>
              Quay lại trang chủ
            </Button>,
            <Button key="buy">Xem lại lịch sử đặt sân</Button>,
          ]}
        />
      ) : (
        <Result
          status="error"
          title="Thanh toán thất bại"
          subTitle={`Mã giao dịch: ${vnp_BankCode}.`}
          extra={[
            <Button type="primary" key="console" onClick={handleClickHome}>
              Quay lại trang chủ
            </Button>,
            <Button key="buy">Đặt lịch lại</Button>,
          ]}
        />
      )}
    </div>
  );
}

export default Payment;
