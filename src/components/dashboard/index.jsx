import { ColorModeContext, useMode } from "../../theme";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./topbar";
import Sidebar from "./sidebar";
import Staff from "../staff/index";
import { Route, Routes } from "react-router-dom";
import Profile from "../profile";
import Club from "../club/index";
import Court from "../court/index";
// import Booking from "../booking/index";

// import "./styles/styledeletebutton.scss";

function Dashboard() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box className="Dashboard" display="flex" height="100vh">
          <Sidebar />
          <Box component="main" className="content" flexGrow={1}>
            <Topbar />
            <Routes>
              <Route path="club" element={<Club />} />
              <Route path="staff/clubid1" element={<Staff />} />
              <Route path="staff/allstaff" element={<Staff />} />
              <Route path="court/clubid1" element={<Court />} />
              {/* <Route path="booking/clubid1" element={<Booking />} /> */}

              <Route path="profile" element={<Profile />} />
            </Routes>
          </Box>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default Dashboard;
