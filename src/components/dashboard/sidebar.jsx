import { useState } from "react";
import { Menu, MenuItem } from "react-pro-sidebar";
import { Box, Drawer, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

const MySidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <Box
      sx={{
        "& .MuiDrawer-paper": {
          // width: 240,
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
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
        }}
        open={!isCollapsed}
      >
        <Menu iconShape="square">
          {/* Logo and menu */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
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
        </Menu>
      </Drawer>
    </Box>
  );
};
export default MySidebar;
