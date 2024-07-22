import { Menu, Switch } from "antd";
import { useEffect, useState } from "react";
import { ScheduleOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../config/axios";
import BookingDaily from "../../components/booking-daily";
import BookingFlexible from "../../components/booking-flexible";
import BookingFixed from "../../components/booking-fixed";

function Booking() {
  const { clubId } = useParams();
  const [club, setClub] = useState({});
  // console.log(id);

  const getClubById = async () => {
    try {
      const response = await api.get(`/club/${clubId}`);
      // console.log(response.data);
      setClub(response.data);
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  useEffect(() => {
    getClubById();
  }, [clubId]);

  const items = [
    {
      key: "1",
      label: "Chọn loại hình đặt sân",
      icon: <ScheduleOutlined />,
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
      {current === "1" && <BookingDaily club={club} />}
      {current === "2" && <BookingFixed club={club} />}
      {current === "3" && <BookingFlexible club={club} />}
    </div>
  );
}

export default Booking;
