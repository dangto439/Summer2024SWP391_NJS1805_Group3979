import { useState, useEffect } from "react";
import {
  Box,
  Breadcrumbs,
  Button,
  IconButton,
  InputBase,
  Link,
  useTheme,
} from "@mui/material";
import {
  Link as RouterLink,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import ListContest from "../../components/list-contest";
import ScheduleContest from "../../components/scheduler-contest";
import SearchIcon from "@mui/icons-material/Search";
import { tokens } from "../../theme";
import axios from "axios";

import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-buttons/styles/material.css";
import "@syncfusion/ej2-calendars/styles/material.css";
import "@syncfusion/ej2-dropdowns/styles/material.css";
import "@syncfusion/ej2-inputs/styles/material.css";
import "@syncfusion/ej2-navigations/styles/material.css";
import "@syncfusion/ej2-popups/styles/material.css";
import "@syncfusion/ej2-react-schedule/styles/material.css";

// Để sử dụng được sync, registerLicense là cái key mà ngta cấp
import { registerLicense } from "@syncfusion/ej2-base";
registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NCaF5cXmpCeUx3QXxbf1x0ZFRHal9UTnVcUj0eQnxTdEFjX31bcXNWRWVZUUV0Wg=="
);

const Contest = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  const [contests, setContests] = useState([]);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        //check xem cú pháp call api đúng khum
        const response = await axios.get("/contests");
        setContests(response.data);
      } catch (error) {
        console.error("Error get data: ", error);
      }
    };
    fetchContests();
  }, []);

  const Breadcrumb = () => {
    const pathnames = location.pathname.split("/").filter((x) => x);
    return (
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: "20px", mt: "20px" }}>
        <Link component={RouterLink} to="/" color="inherit">
          Home
        </Link>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          return (
            <Link
              key={to}
              component={RouterLink}
              to={to}
              color="inherit"
              sx={{ textTransform: "capitalize" }}
            >
              {value}
            </Link>
          );
        })}
      </Breadcrumbs>
    );
  };

  return (
    <Box p={3} ml={3}>
      {Breadcrumb()}

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={5}
      >
        <Box
          display="flex"
          backgroundColor={colors.greenAccent[900]}
          borderRadius="3px"
        >
          <InputBase
            sx={{ ml: 2, flex: 1, width: "300px" }}
            placeholder="Search"
          />
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton>
        </Box>
        <Box display="flex">
          <Button
            component={RouterLink}
            to="danhsach"
            sx={{
              borderBottom:
                location.pathname === "/contest/danhsach" ||
                location.pathname === "/contest"
                  ? `2px solid ${colors.greenAccent[500]}`
                  : "none",
            }}
          >
            Danh sách
          </Button>
          <Button
            component={RouterLink}
            to="thang"
            sx={{
              borderBottom:
                location.pathname === "/contest/thang"
                  ? `2px solid ${colors.greenAccent[500]}`
                  : "none",
            }}
          >
            Tháng
          </Button>
        </Box>
      </Box>

      <Routes>
        <Route path="" element={<ListContest contests={contests} />} />
        <Route path="danhsach" element={<ListContest contests={contests} />} />
        <Route path="thang" element={<ScheduleContest contests={contests} />} />
      </Routes>
    </Box>
  );
};

export default Contest;
