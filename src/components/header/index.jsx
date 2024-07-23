/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import {
  UserOutlined,
  BarsOutlined,
  HistoryOutlined,
  PoweroffOutlined,
  SearchOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import "./index.scss";
import { useEffect, useState } from "react";
import { Dropdown } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../redux/features/counterSlice";
import { toast } from "react-toastify";
import api from "../../config/axios";

function Header({ balanceChange }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const [inputSearch, setInputSearch] = useState("");

  const handleLogOut = () => {
    dispatch(logout());
    toast.success("Đăng xuất thành công!");
    navigate("/");
  };

  const handleCheckIn = (value) => {
    console.log("Navigating to check-in with value:", value);
    navigate(`/checkin/${value}`);
  };

  const onClick = ({ key }) => {
    console.log("Dropdown menu clicked with key:", key);
    switch (key) {
      case "1":
        navigate("/profile");
        break;
      case "2":
        navigate("/history-booking");
        break;
      case "3":
        handleLogOut();
        break;
      default:
        break;
    }
  };

  const items = [
    {
      label: "Hồ sơ",
      key: "1",
      icon: <UserOutlined />,
    },
    {
      label: "Lịch sử đặt lịch",
      key: "2",
      icon: <HistoryOutlined />,
    },
    {
      label: "Đăng xuất",
      key: "3",
      icon: <PoweroffOutlined />,
      danger: true,
    },
  ];
  const menuProps = {
    items,
    onClick,
  };

  const [role, setRole] = useState("");
  const fetchProfileData = async () => {
    try {
      console.log("Fetching profile data...");
      const [response, responseprice] = await Promise.all([
        api.get("/profile"),
        api.get(`/wallet/${user.id}`),
      ]);
      const profileData = response.data;
      setRole(profileData.role);
      setBalance(responseprice.data.balance);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  useEffect(() => {
    if (user) {
      fetchProfileData();
    } else {
      console.log("User not logged in, skipping fetch profile data.");
    }
  }, [user]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchHeader();
    }
  };

  const handleSearchHeader = () => {
    sessionStorage.setItem("search", "true");
    console.log("Search input:", inputSearch);
    navigate(`/list-club?search=${inputSearch}`);
  };

  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/badminton-booking-platform.appspot.com/o/Screenshot%202024-06-27%20213810.png?alt=media&token=8aa9ac61-4427-4b4e-b778-6d0567aba4dc"
            alt="logo"
          />
        </Link>
      </div>

      <div className="header__nav">
        <ul>
          <li className="header__link">
            <Link to="/">Trang chủ</Link>
          </li>

          <li className="header__link">
            <Link to="/introduction">Giới thiệu</Link>
          </li>

          <li className="header__link">
            <Link to="/list-club">Danh sách sân</Link>
          </li>

          <li className="header__link">
            <Link to="/contest">Lịch thi đấu</Link>
          </li>

          <li className="header__link">
            <Link to="/policy">Quy định</Link>
          </li>

          {(role === "CLUB_OWNER" || role === "ADMIN") && user != null ? (
            <li className="header__link">
              <Link to="/dashboard">Quản lý</Link>
            </li>
          ) : (
            ""
          )}

          {role === "CLUB_STAFF" && user != null ? (
            <li className="header__link">
              <Link to="#" onClick={() => handleCheckIn(user.id)}>
                Kiểm Tra Code
              </Link>
            </li>
          ) : (
            ""
          )}

          <div className="search-bar">
            <input
              type="text"
              placeholder="Nhập tên sân cần tìm"
              className="search-input"
              onChange={(e) => setInputSearch(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <SearchOutlined
              className="search-icon"
              onClick={handleSearchHeader}
            />
          </div>
        </ul>
      </div>

      <div className="header__button">
        {user == null ? (
          <>
            <div className="custome-login">
              <Link to="login">
                <button>Đăng nhập</button>
              </Link>
            </div>
            <div className="custome-register">
              <Link to="register">
                <button>Đăng ký</button>
              </Link>
            </div>
          </>
        ) : (
          <div className="header__options">
            <div className="header__wallet">
              <ul className="">
                <li>
                  <Link to="/wallet">
                    <WalletOutlined /> Số dư ví: {formatCurrency(balanceChange)}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="header__menu">
              <Dropdown.Button
                size="large"
                menu={menuProps}
                icon={<BarsOutlined />}
              >
                {user.name}
              </Dropdown.Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
