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

function Header() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logout());
    toast.success("Đăng xuất thành công!");
    navigate("/");
  };

  const onClick = ({ key }) => {
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
      const response = await api.get("/profile");
      const profileData = response.data;
      setRole(profileData.role);
      console.log(role);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

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
      <nav className="header__nav">
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

          {/* <li
            onClick={() => {
              setTab(5);
            }}
            className={`header__link ${tab == 5 && "active"}`}
          >
            <Link to="/contact">Liên hệ</Link>
          </li> */}

          {(role == "CLUB_OWNER" || role == "ADMIN") && user != null ? (
            <li className="header__link">
              <Link to="/dashboard">Quản lý</Link>
            </li>
          ) : (
            ""
          )}

          <div className="search-bar">
            <input
              type="text"
              placeholder="Nhập tên sân cần tìm"
              className="search-input"
            />
            <SearchOutlined className="search-icon" />
          </div>
        </ul>
      </nav>

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
                    <WalletOutlined /> Số dư ví: đ
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
