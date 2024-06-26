import { Outlet } from "react-router-dom";
import AdminSidebar from "../adminslidebar";
import AdminHeader from "../adminheader";
import "./index.scss";

function LayoutAdmin() {
  return (
    <div className="grid-container">
      <div>
        <AdminSidebar />
      </div>
      <div style={{ position: "relative" }}>
        <AdminHeader />
        <Outlet />
      </div>
    </div>
  );
}

export default LayoutAdmin;
