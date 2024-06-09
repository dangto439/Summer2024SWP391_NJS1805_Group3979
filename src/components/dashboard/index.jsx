import { ColorModeContext, useMode } from "../../theme";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./topbar";
import Sidebar from "./sidebar";
import Staff from "../staff/index";
import { Route, Routes } from "react-router-dom";

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
              <Route path="allstaff" element={<Staff />} />
              {/* <Route path="profile" element={<Profile />} />
              <Route path="manage-account" element={<ManageAccount />} /> */}
            </Routes>
          </Box>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default Dashboard;
