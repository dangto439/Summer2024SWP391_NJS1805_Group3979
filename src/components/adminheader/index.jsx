import { Link, useNavigate } from "react-router-dom";
import "./index.scss";
import {
  BsFillBellFill,
  BsFillEnvelopeFill,
  BsPersonCircle,
} from "react-icons/bs";
import { Dropdown } from "antd";
import { UserOutlined, PoweroffOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/counterSlice";

function AdminHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items = [
    {
      label: "Hồ sơ",
      key: "1",
      icon: <UserOutlined />,
    },

    {
      label: "Đăng xuất",
      key: "2",
      icon: <PoweroffOutlined />,
      danger: true,
    },
  ];
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
        handleLogOut();
        break;
      default:
        break;
    }
  };
  const menuProps = {
    items,
    onClick,
  };
  return (
    <header className="headeradmin">
      <div className="header-right">
        <BsFillBellFill className="icon bell" />
        <BsFillEnvelopeFill className="icon Envelope" />
        {/* <Link to={"/admin/profile"}>
          <BsPersonCircle className="icon" />
        </Link> */}

        <Dropdown
          menu={menuProps}
          // icon={}
        >
          <BsPersonCircle className="icon" />
        </Dropdown>
      </div>
    </header>
  );
}

export default AdminHeader;
