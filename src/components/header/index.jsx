import { Link, useNavigate } from "react-router-dom";
import {
  UserOutlined,
  BarsOutlined,
  HistoryOutlined,
  PoweroffOutlined,
  SearchOutlined,
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
  const [tab, setTab] = useState([]);

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const fetchProfileData = async () => {
    try {
      const response = await api.get("/profile");
      const profileData = response.data;
      setRole(profileData.role);
      console.log(role);
      setName(profileData.name);
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
          <img src="./src/logo.svg" alt="logo" />
        </Link>
      </div>
      <nav className="header__nav">
        <ul>
          <li
            onClick={() => {
              setTab(1);
            }}
            className={`header__link ${tab == 1 && "active"}`}
          >
            <Link to="/">Trang chủ</Link>
          </li>

          <li
            onClick={() => {
              setTab(2);
            }}
            className={`header__link ${tab == 2 && "active"}`}
          >
            <Link to="/introduction">Giới thiệu</Link>
          </li>

          <li
            onClick={() => {
              setTab(3);
            }}
            className={`header__link ${tab == 3 && "active"}`}
          >
            <Link to="/list-club">Danh sách sân</Link>
          </li>

          <li
            onClick={() => {
              setTab(4);
            }}
            className={`header__link ${tab == 4 && "active"}`}
          >
            <Link to="/">Lịch thi đấu</Link>
          </li>

          <li
            onClick={() => {
              setTab(5);
            }}
            className={`header__link ${tab == 5 && "active"}`}
          >
            <Link to="/contact">Liên hệ</Link>
          </li>

          {(role == "CLUB_OWNER" || role == "ADMIN") && user != null ? (
            <li
              onClick={() => {
                setTab(6);
              }}
              className={`header__link ${tab == 7 && "active"}`}
            >
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
          <Dropdown.Button menu={menuProps} icon={<BarsOutlined />}>
            {name}
          </Dropdown.Button>
        )}
      </div>

      {/* <div className={`header__search ${isShowSearch ? "active" : ""}`}>
        <input type="text" placeholder="Tìm kiếm sân..." />
        <CloseOutlined
          onClick={() => {
            setIsShowSearch(false);
            setTab([]);
          }}
        />
      </div> */}
    </header>
  );
}

export default Header;
