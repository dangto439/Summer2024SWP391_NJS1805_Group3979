import React, { useEffect, useState } from "react";
import { Modal, Button, message } from "antd";
import api from "../../config/axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice";
import { useNavigate } from "react-router-dom";

const ConfirmRegistration = ({ visible, onClose, id }) => {
  const [confirmed, setConfirmed] = useState(false);
  const [contest, setContest] = useState(null);
  const [walletClub, setWalletClub] = useState(null);
  const [price, setPrice] = useState(0);
  const [balance, setBalance] = useState(0);
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const handleConfirm = async () => {
    if (user == null) {
      message.error("Vui lòng đăng nhập trước khi tham gia");
      navigate("/login");
      return;
    }

    if (balance >= price) {
      const data = {
        senderWalletId: user.id,
        receiverWalletId: walletClub?.walletId,
        amount: price,
      };
      console.log(data);
      try {
        await registration();
        await tranfer(data);
        navigate("/wallet");
      } catch (error) {
        console.log(error);
      }

      setConfirmed(true);
      onClose();
    } else {
      message.error("Số dư tài khoản không đủ. Vui lòng nạp tiền.");
      const data = {
        senderWalletId: user.id,
        receiverWalletId: walletClub?.walletId,
        amount: price,
      };
      sessionStorage.setItem("contest", JSON.stringify(data));
      sessionStorage.setItem("typepayment", "CONTEST");
      //nếu có lỗi thì nó chuyển qua trang thanh toán để nạp tiền
      handleWalletVnpay(price);
      //còn set bên wallet để láy giá trị set tiếp
    }
  };

  const walletClubOwner = async (clubid) => {
    try {
      const response = await api.get(`wallet-owner/${clubid}`);
      setWalletClub(response.data);
    } catch (error) {
      message.error("Không thể lấy thông tin ví của câu lạc bộ.");
    }
  };

  const tranfer = async (data) => {
    try {
      await api.post(`/wallet/transfer-contest`, data);
    } catch (error) {
      throw new Error("Chuyển tiền thất bại");
    }
  };

  const registration = async () => {
    try {
      // console.log(id);
      await api.post(`/registration?contestId=${id}`);
    } catch (error) {
      console.log(error);
      message.error(error.response.data);
    }
  };

  const handleDecline = () => {
    setConfirmed(false);
    onClose();
  };

  const getBalance = async () => {
    try {
      const response = await api.get(`/wallet/${user.id}`);
      setBalance(response.data.balance);
    } catch (error) {
      message.error("Không thể lấy thông tin số dư.");
    }
  };
  const handleWalletVnpay = async (values) => {
    try {
      const response = await api.post(`/vnpay?amount=${values}`);
      const paymentLink = response.data;
      window.location.href = paymentLink;
    } catch (error) {
      message.error("Không thể thanh toán!");
    }
  };

  useEffect(() => {
    const getAContest = async () => {
      if (id != null) {
        try {
          console.log(id);
          const response = await api.get(`/contest/${id}`);
          setContest(response.data);
          setPrice(response.data.participationPrice);
          walletClubOwner(response.data.clubId);
        } catch (error) {
          message.error("Không thể lấy thông tin giải đấu.");
        }
      }
    };

    if (user) {
      getAContest();
      getBalance();
    }
  }, [id, user]);

  const formatPrice = (price) => {
    return price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  return (
    <Modal
      title="Xác nhận tham gia giải đấu"
      visible={visible}
      onOk={handleConfirm}
      onCancel={handleDecline}
      footer={[
        <Button key="back" onClick={handleDecline}>
          Hủy
        </Button>,
        <Button key="submit" type="primary" onClick={handleConfirm}>
          Xác nhận
        </Button>,
      ]}
    >
      <p>Bạn có chắc chắn muốn tham gia giải đấu không?</p>
      <p>Lệ phí : {formatPrice(price)}</p>
    </Modal>
  );
};

export default ConfirmRegistration;
