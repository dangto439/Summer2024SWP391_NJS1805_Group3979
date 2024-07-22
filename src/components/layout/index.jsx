import { Outlet } from "react-router-dom";
import Header from "../header";
import Footer from "../footer";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice";
import api from "../../config/axios";

function Layout() {
  const [balanceChange, setBalanceChange] = useState(0);
  const user = useSelector(selectUser);

  const fetchBalance = async () => {
    const response = await api.get(`/wallet/${user.id}`);
    console.log(response);
    setBalanceChange(response.data.balance);
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <div>
      <Header balanceChange={balanceChange} />
      <div>
        <Outlet context={{ setBalanceChange, balanceChange }} />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
