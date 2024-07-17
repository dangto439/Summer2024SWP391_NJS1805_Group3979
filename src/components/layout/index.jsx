import { Outlet } from "react-router-dom";
import Header from "../header";
import Footer from "../footer";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice";
import api from "../../config/axios";

function Layout() {
  const [balance2, setBalance2] = useState(0);
  const user = useSelector(selectUser);

  const fetchBalance = async () => {
    const response = await api.get(`/wallet/${user.id}`);
    console.log(response);
    setBalance2(response.data.balance);
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <div>
      <Header balance2={balance2} />
      <div>
        <Outlet context={{ setBalance2, balance2 }} />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
