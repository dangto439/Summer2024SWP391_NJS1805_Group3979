import { ColorModeContext, useMode } from "../../theme";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./topbar";
import Sidebar from "./sidebar";
import Staff from "../staff/index";
import { Route, Routes } from "react-router-dom";
// import Profile from "../profile";
import Club from "../club/index";
import Court from "../court/index";
import api from "../../config/axios";
import { useEffect, useState } from "react";
import ClubOwnerDasboard from "../clubowner";
import BookingManager from "../booking-manager-clubowner";
import PromotionManager from "../promotion-manager";

function Dashboard() {
  const [theme, colorMode] = useMode();
  const [clubs, setClubs] = useState([]);

  const fetchClubs = async () => {
    try {
      const response = await api.get("/current-clubs");
      setClubs(response.data);
    } catch (error) {
      console.error("Error fetching clubs:", error);
    }
  };

  useEffect(() => {
    fetchClubs();
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box className="Dashboard" display="flex" height="100vh">
          <Sidebar />
          <Box component="main" className="content" flexGrow={1}>
            <Topbar />
            <Routes>
              <Route path="" element={<ClubOwnerDasboard />} />
              <Route path="club" element={<Club />} />
              {clubs.map((club) => (
                <Route
                  key={club.clubId}
                  path={`staff/${club.clubId}`}
                  element={<Staff clubId={club.clubId} />}
                />
              ))}
              <Route
                path="staff/allstaff"
                element={<Staff clubId={"allstaff"} />}
              />
              {clubs.map((club) => (
                <Route
                  key={club.clubId}
                  path={`court/${club.clubId}`}
                  element={<Court clubId={club.clubId} />}
                />
              ))}
              {/* <Route path="booking/clubid1" element={<Booking />} /> */}
              {clubs.map((club) => (
                <Route
                  key={club.clubId}
                  path={`bookingmanager/${club.clubId}`}
                  element={<BookingManager clubId={club.clubId} />}
                />
              ))}

              {clubs.map((club) => (
                <Route
                  key={club.clubId}
                  path={`promotionmanager/${club.clubId}`}
                  element={<PromotionManager clubId={club.clubId} />}
                />
              ))}

              {/* <Route path="profile" element={<Profile />} /> */}
            </Routes>
          </Box>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default Dashboard;
