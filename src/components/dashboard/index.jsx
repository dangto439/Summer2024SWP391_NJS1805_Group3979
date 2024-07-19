import { ColorModeContext, useMode } from "../../theme";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./topbar";
import Sidebar from "./sidebar";
import Staff from "../staff/index";
import { Route, Routes } from "react-router-dom";
import Profile from "../profile";
import Club from "../club/index";
import Court from "../court/index";
import api from "../../config/axios";
import { useEffect, useState } from "react";
import Tournaments from "../tournaments";
import NewTournament from "../tournaments/newtournament";
import TournamentDetail from "../tournaments/tournamentsdetail";
import GamebyOwner from "../tournaments/gamebyowner";
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
              <Route path="club" element={<Club />} />
              {clubs.map((club) => (
                <Route
                  key={club.clubId}
                  path={`staff/${club.clubId}`}
                  element={<Staff />}
                />
              ))}
              <Route path="staff/allstaff" element={<Staff />} />
              {clubs.map((club) => (
                <Route
                  key={club.clubId}
                  path={`court/${club.clubId}`}
                  element={<Court />}
                />
              ))}
              {/* <Route path="booking/clubid1" element={<Booking />} /> */}

              <Route path="profile" element={<Profile />} />
              <Route path="tournaments" element={<Tournaments />} />
              <Route path="tournaments/new" element={<NewTournament />} />
              {/* <Route
                path="tournaments/detail/:id"
                element={<TournamentDetail />}
              /> */}
              <Route
                path="tournaments/detail/:id"
                element={<TournamentDetail />}
              >
                <Route index element={<GamebyOwner />} />
              </Route>
            </Routes>
          </Box>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default Dashboard;
