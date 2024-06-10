import { useState, useEffect } from "react";
import { Menu, MenuItem } from "react-pro-sidebar";
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
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutline";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import PlaceIcon from "@mui/icons-material/Place";

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

  const [isCollapsed, setIsCollapsed] = useState(
    JSON.parse(localStorage.getItem("isCollapsed")) || false
  );
  const [selected, setSelected] = useState("Dashboard");
  const [openStaffs, setOpenStaffs] = useState(false);
  const [openCourts, setOpenClubs] = useState(false);
  const [openBooking, setOpenBooking] = useState(false);

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

  return (
    <Box
      sx={{
        "& .MuiDrawer-paper": {
          backgroundColor: colors.primary[400],
          borderRadius: "30px",
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
          width: isCollapsed ? 80 : 240,
          flexShrink: 0,
          transition: "width 0.3s",
        }}
        PaperProps={{
          style: {
            width: isCollapsed ? 80 : 240,
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
                  Club Owner
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
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
                  src="https://images.unsplash.com/photo-1716798084682-decdb59ca364?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
                  Demi
                </Typography>
                <Typography color={colors.greenAccent[500]} fontSize="10px">
                  FE DatSan79
                </Typography>
              </Box>
            </Box>
          )}

          {/* Menu Items */}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Home"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h8"
              color={colors.grey[300]}
              sx={{ m: "15px 0 0 20px" }}
              fontSize="15px"
            >
              Management
            </Typography>
            <Item
              title="Club"
              to="club"
              icon={<PlaceIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <MenuItem
              onClick={handleStaffsClick}
              style={{ color: colors.grey[100] }}
              icon={<GroupOutlinedIcon />}
            >
              <Typography display="flex">
                Staff
                {openStaffs ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </Typography>
            </MenuItem>
            <Collapse in={openStaffs} timeout="auto" unmountOnExit>
              <Box component="div" sx={{ padding: 0 }}>
                <Box sx={{ pl: 4 }}>
                  <Item
                    title="ClubID1"
                    to="staff/clubid1"
                    selected={selected}
                    setSelected={setSelected}
                  />
                </Box>
                <Box sx={{ pl: 4 }}>
                  <Item
                    title="All Staff"
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
              icon={<StarOutlineIcon />}
            >
              <Typography display="flex">
                Court
                {openCourts ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </Typography>
            </MenuItem>
            <Collapse in={openCourts} timeout="auto" unmountOnExit>
              <Box component="div" disablePadding sx={{ pl: 4 }}>
                <Item
                  title="ClubID1"
                  to="court/clubid1"
                  selected={selected}
                  setSelected={setSelected}
                />
              </Box>
            </Collapse>

            <MenuItem
              onClick={handleBookingClick}
              style={{ color: colors.grey[100] }}
              icon={<InventoryOutlinedIcon />}
            >
              <Typography display="flex">
                Booking
                {openBooking ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </Typography>
            </MenuItem>
            <Collapse in={openBooking} timeout="auto" unmountOnExit>
              <Box component="div" disablePadding>
                <Box sx={{ pl: 4 }}>
                  <Item
                    title="ClubID1"
                    to="booking/clubid1"
                    selected={selected}
                    setSelected={setSelected}
                  />
                </Box>
              </Box>
            </Collapse>
            <Typography
              variant="h8"
              color={colors.grey[300]}
              sx={{ m: "15px 0 0 20px" }}
              fontSize="15px"
            >
              Pages
            </Typography>
            <Item
              title="Profile"
              to="profile"
              icon={<AccountBoxOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Calendar"
              to="calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Bar Chart"
              to="bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Pie Chart"
              to="pie"
              icon={<PieChartOutlineOutlinedIcon />}
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
