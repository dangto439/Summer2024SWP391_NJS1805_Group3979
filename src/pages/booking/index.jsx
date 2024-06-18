import { Menu, Switch } from "antd";
import BookingDaily from "../../components/bookingdaily";
import { useState } from "react";
import { MailOutlined } from "@ant-design/icons";
import BookingFixed from "../../components/bookingfixed";
import BookingFlexible from "../../components/bookingFlexible";

function Booking() {
  const items = [
    {
      key: "sub1",
      label: "Chọn loại hình đặt sân",
      icon: <MailOutlined />,
      children: [
        {
          key: "1",
          label: "Đặt Lịch Ngày",
        },
        {
          key: "2",
          label: "Đặt Lịch Cố Định",
        },
        {
          key: "3",
          label: "Đặt Lịch Linh Hoạt",
        },
      ],
    },
  ];

  const [theme, setTheme] = useState("dark");
  const [current, setCurrent] = useState("1");
  const changeTheme = (value) => {
    setTheme(value ? "dark" : "light");
  };
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  return (
    <div className="booking-container">
      <div className="menu-header">
        {/* <Switch
          checked={theme === "dark"}
          onChange={changeTheme}
          checkedChildren="Dark"
          unCheckedChildren="Light"
          className="theme-switch"
        /> */}
      </div>
      <Menu
        theme={theme}
        onClick={onClick}
        defaultOpenKeys={["sub1"]}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
        className="full-width-menu"
      />
      {current === "1" && <BookingDaily clubID={1} />}
      {current === "2" && <BookingFixed clubID={1} />}
      {current === "3" && <BookingFlexible clubID={1} />}
    </div>
  );
}

export default Booking;
