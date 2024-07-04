import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlineIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlineIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlineIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { Dropdown } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/counterSlice";
import { UserOutlined, PoweroffOutlined } from "@ant-design/icons";

function Topbar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
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
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* Search bar */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* Icons */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlineIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>

        <IconButton>
          <NotificationsOutlineIcon />
        </IconButton>

        <IconButton>
          <SettingsOutlineIcon />
        </IconButton>

        <IconButton>
          <Dropdown
            menu={menuProps}
            // icon={}
          >
            <PersonOutlineIcon />
          </Dropdown>
        </IconButton>
      </Box>
    </Box>
  );
}

export default Topbar;
