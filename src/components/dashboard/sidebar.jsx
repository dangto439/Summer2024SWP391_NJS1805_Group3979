import { useState, useEffect } from "react";
import { Menu, MenuItem } from "react-pro-sidebar";
import {
  FcBusinessman,
  FcCalendar,
  FcHome,
  FcParallelTasks,
  FcTodoList,
} from "react-icons/fc";
import { GiTennisCourt } from "react-icons/gi";

import {
  Box,
  Drawer,
  IconButton,
  Typography,
  useTheme,
  Collapse,
} from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
// import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
// import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
// import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutline";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
// import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlaceIcon from "@mui/icons-material/Place";
import api from "../../config/axios";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
      onClick={() => setSelected(title)}
      icon={icon}
      component={<Link to={to} />}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const MySidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [name, setName] = useState("");

  const [isCollapsed, setIsCollapsed] = useState(
    JSON.parse(localStorage.getItem("isCollapsed")) || false
  );
  const [selected, setSelected] = useState("Dashboard");
  const [openStaffs, setOpenStaffs] = useState(false);
  const [openCourts, setOpenClubs] = useState(false);
  const [openBooking, setOpenBooking] = useState(false);
  const [openPromotion, setOpenPromotion] = useState(false);
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    localStorage.setItem("isCollapsed", JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  const handleStaffsClick = () => {
    setOpenStaffs(!openStaffs);
  };

  const handleCourtClick = () => {
    setOpenClubs(!openCourts);
  };

  const handleBookingClick = () => {
    setOpenBooking(!openBooking);
  };

  const handlePromotionClick = () => {
    setOpenPromotion(!openPromotion);
  };

  const fetchProfileData = async () => {
    try {
      const response = await api.get("/profile");
      const profileData = response.data;
      setAvatarUrl(profileData.avatar);
      setName(profileData.name);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  const fetchClubs = async () => {
    try {
      const response = await api.get("/current-clubs");
      setClubs(response.data);
    } catch (error) {
      console.error("Error fetching clubs:", error);
    }
  };

  useEffect(() => {
    fetchProfileData();
    fetchClubs();
  }, []);

  return (
    <Box
      sx={{
        "& .MuiDrawer-paper": {
          backgroundColor: colors.primary[400],
          borderRadius: "30px",
          width: isCollapsed ? 80 : 290,
          transition: "width 0.3s",
        },
        "& .ps-menuitem-root": {
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "100%",
          padding: "8px 16px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          transition: "padding 0.3s",
        },
        "& .ps-menu-label": {
          marginLeft: "10px",
        },
        "& .ps-menuitem-root .ps-menu-button:hover": {
          color: "#0C8900 !important",
          backgroundColor: "transparent !important",
        },
        "& .ps-menuitem-root .ps-active": {
          color: "#6870fa !important",
        },
      }}
    >
      <Drawer
        variant="persistent"
        sx={{
          width: isCollapsed ? 80 : 290,
          flexShrink: 0,
          transition: "width 0.3s",
        }}
        PaperProps={{
          style: {
            width: isCollapsed ? 80 : 290,
            overflowX: "hidden",
          },
        }}
        open
      >
        <Menu iconShape="square">
          {/* Logo and menu */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={<MenuOutlinedIcon />}
            style={{
              margin: "10px 0 10px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography
                  color={colors.grey[100]}
                  display="flex"
                  alignContent="center"
                  fontSize="25px"
                >
                  Chủ câu lạc bộ
                </Typography>
                {/* <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton> */}
              </Box>
            )}
          </MenuItem>

          {/* USER */}
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignContent="center">
                <img
                  alt="profile-user"
                  width="60px"
                  height="60px"
                  src={avatarUrl}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "8px 0 0 0" }}
                  fontSize="20px"
                >
                  {name}
                </Typography>
              </Box>
            </Box>
          )}

          {/* Menu Items */}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Trang chủ"
              to="/"
              icon={<FcHome />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h8"
              color={colors.grey[300]}
              sx={{ m: "15px 0 0 20px" }}
              fontSize="15px"
            >
              Quản lý
            </Typography>
            <Item
              title="Câu lạc bộ"
              to="club"
              icon={<PlaceIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <MenuItem
              onClick={handleStaffsClick}
              style={{ color: colors.grey[100] }}
              icon={<FcBusinessman />}
            >
              <Typography display="flex">
                Nhân viên
                {openStaffs ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </Typography>
            </MenuItem>
            <Collapse in={openStaffs} timeout="auto" unmountOnExit>
              <Box component="div" sx={{ padding: 0 }}>
                {clubs.map((club) => (
                  <Box key={club.clubId} sx={{ pl: 4 }}>
                    <Item
                      title={club.clubName}
                      to={`staff/${club.clubId}`}
                      selected={selected}
                      setSelected={setSelected}
                    />
                  </Box>
                ))}
                <Box sx={{ pl: 4 }}>
                  <Item
                    title="Tất cả nhân viên"
                    to="staff/allstaff"
                    selected={selected}
                    setSelected={setSelected}
                  />
                </Box>
              </Box>
            </Collapse>

            <MenuItem
              onClick={handleCourtClick}
              style={{ color: colors.grey[100] }}
              icon={<GiTennisCourt />}
            >
              <Typography display="flex">
                Sân
                {openCourts ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </Typography>
            </MenuItem>
            <Collapse in={openCourts} timeout="auto" unmountOnExit>
              <Box component="div" disablePadding sx={{ pl: 4 }}>
                {/* <Item
                  title="ClubID1"
                  to="court/clubid1"
                  selected={selected}
                  setSelected={setSelected}
                /> */}
                {clubs.map((club) => (
                  <Box key={club.clubId} sx={{ pl: 4 }}>
                    <Item
                      title={club.clubName}
                      to={`court/${club.clubId}`}
                      selected={selected}
                      setSelected={setSelected}
                    />
                  </Box>
                ))}
              </Box>
            </Collapse>

            <MenuItem
              onClick={handleBookingClick}
              style={{ color: colors.grey[100] }}
              icon={<FcCalendar />}
            >
              <Typography display="flex">
                Đơn đặt sân
                {openBooking ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </Typography>
            </MenuItem>
            <Collapse in={openBooking} timeout="auto" unmountOnExit>
              <Box component="div" disablePadding>
                {/* <Box sx={{ pl: 4 }}>
                  <Item
                    title="ClubID1"
                    to="booking/clubid1"
                    selected={selected}
                    setSelected={setSelected}
                  />
                </Box> */}
                {clubs.map((club) => (
                  <Box key={club.clubId} sx={{ pl: 4 }}>
                    <Item
                      title={club.clubName}
                      to={`bookingmanager/${club.clubId}`}
                      selected={selected}
                      setSelected={setSelected}
                    />
                  </Box>
                ))}
              </Box>
            </Collapse>
            {/* <Item
              title="Mã khuyến mãi"
              to={`promotionmanager`}
              icon={<FcTodoList />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            <MenuItem
              onClick={handlePromotionClick}
              style={{ color: colors.grey[100] }}
              icon={<FcTodoList />}
            >
              <Typography display="flex">
                Mã khuyến mãi
                {openPromotion ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </Typography>
            </MenuItem>
            <Collapse in={openPromotion} timeout="auto" unmountOnExit>
              <Box component="div" disablePadding>
                {clubs.map((club) => (
                  <Box key={club.clubId} sx={{ pl: 4 }}>
                    <Item
                      title={club.clubName}
                      to={`promotionmanager/${club.clubId}`}
                      selected={selected}
                      setSelected={setSelected}
                    />
                  </Box>
                ))}
              </Box>
            </Collapse>
            <Item
              title="Giải đấu"
              to="tournaments"
              icon={<FcParallelTasks />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </Drawer>
    </Box>
  );
};

export default MySidebar;
