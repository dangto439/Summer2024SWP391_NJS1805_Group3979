import { useState } from "react";
import { Link } from "react-router-dom";
import {
  MdAdminPanelSettings,
  MdDashboard,
  MdOutlinePeopleAlt,
} from "react-icons/md";
import { GiTennisCourt } from "react-icons/gi";
import { FcSettings } from "react-icons/fc";
import "./index.scss";

function AdminSlidebar() {
  const [selectedItem, setSelectedItem] = useState("dashboard");

  const handleItemClick = (itemName) => {
    setSelectedItem(itemName);
  };

  return (
    <aside>
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <MdAdminPanelSettings className="icon_header" />
          Admin
        </div>
        <span className="icon close_icon"></span>
      </div>
      <ul className="sidebar_list">
        <li
          className={`sidebar_list_item ${
            selectedItem === "dashboard" ? "active" : ""
          }`}
        >
          <Link to={"/admin"} onClick={() => handleItemClick("dashboard")}>
            <MdDashboard className="icon Dashboard" />
            Dashboard
          </Link>
        </li>
        <li
          className={`sidebar_list_item ${
            selectedItem === "account" ? "active" : ""
          }`}
        >
          <Link
            to={"/admin/account"}
            onClick={() => handleItemClick("account")}
          >
            <MdOutlinePeopleAlt className="icon people" />
            Người dùng
          </Link>
        </li>
        <li
          className={`sidebar_list_item ${
            selectedItem === "club" ? "active" : ""
          }`}
        >
          <Link to={"/admin/club"} onClick={() => handleItemClick("club")}>
            <GiTennisCourt className="icon badmintonCourt" />
            Câu lạc bộ
          </Link>
        </li>
        <li
          className={`sidebar_list_item ${
            selectedItem === "setting" ? "active" : ""
          }`}
        >
          <Link
            to={"/admin/setting"}
            onClick={() => handleItemClick("setting")}
          >
            <FcSettings className="icon" />
            Cài đặt
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default AdminSlidebar;
