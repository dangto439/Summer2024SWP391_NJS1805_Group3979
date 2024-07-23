import {
  Box,
  Breadcrumbs,
  Button,
  IconButton,
  InputBase,
  Link,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../../theme";
import SearchIcon from "@mui/icons-material/Search";
import { Link as RouterLink, useParams } from "react-router-dom";
import { useState } from "react";

const Checkin = () => {
  const { staffId } = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [searchTerm, setSearchTerm] = useState("");

  const testData = [
    {
      PlayingDate: "2024-07-01",
      CourtName: "CourtName A",
      Slot: "08:00:00",
      CustomerName: "Nguyễn Văn A",
      CustomerPhone: "0123123123",
      CheckinCode: "123XXX",
    },
    {
      PlayingDate: "2024-07-02",
      CourtName: "CourtName B",
      Slot: "08:00:00",
      CustomerName: "Nguyễn Văn B",
      CustomerPhone: "0123123123",
      CheckinCode: "456XXX",
    },
    {
      PlayingDate: "2024-07-01",
      CourtName: "CourtName C",
      Slot: "09:00:00",
      CustomerName: "Nguyễn Văn C",
      CustomerPhone: "0123123123",
      CheckinCode: "678XXX",
    },
  ];

  const Breadcrumb = () => {
    const pathnames = location.pathname.split("/").filter((x) => x);
    return (
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ mb: "20px", mt: "20px", fontSize: "18px" }}
      >
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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = testData.filter(
    (data) => data.CheckinCode.toLowerCase() === searchTerm.toLowerCase()
  );

  return (
    <Box p={15} ml={10}>
      {Breadcrumb()}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
      >
        <Box
          display="flex"
          backgroundColor={colors.blueAccent[900]}
          borderRadius="3px"
        >
          <InputBase
            sx={{ ml: 2, flex: 1, width: "500px", height: "50px" }}
            placeholder="Check in code"
            onChange={handleSearch}
            value={searchTerm}
          />
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton>
        </Box>
        <Box display="flex">
          <Button>San Cau long cua nhan vien do</Button>
        </Box>
      </Box>
      {searchTerm && (
        <Box display="flex" flexDirection="column" alignItems="center">
          {filteredData.map((data, index) => (
            <Box
              key={index}
              p={5}
              m={3}
              borderRadius="5px"
              width="50%"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              backgroundColor={colors.greenAccent[900]}
            >
              <Box>
                <Box display="flex" alignItems="baseline" mb={2}>
                  <Typography sx={{ fontWeight: "bold", mr: 2 }}>
                    Mã check-in:
                  </Typography>
                  <Typography>{data.CheckinCode}</Typography>
                </Box>
                <Box display="flex" alignItems="baseline" mb={2}>
                  <Typography sx={{ fontWeight: "bold", mr: 2 }}>
                    Ngày chơi:
                  </Typography>
                  <Typography>{data.PlayingDate}</Typography>
                </Box>
                <Box display="flex" alignItems="baseline" mb={2}>
                  <Typography sx={{ fontWeight: "bold", mr: 2 }}>
                    Tên sân:
                  </Typography>
                  <Typography>{data.CourtName}</Typography>
                </Box>
                <Box display="flex" alignItems="baseline" mb={2}>
                  <Typography sx={{ fontWeight: "bold", mr: 2 }}>
                    Thời gian:
                  </Typography>
                  <Typography>{data.Slot}</Typography>
                </Box>
                <Box display="flex" alignItems="baseline" mb={2}>
                  <Typography sx={{ fontWeight: "bold", mr: 2 }}>
                    Tên khách hàng:
                  </Typography>
                  <Typography>{data.CustomerName}</Typography>
                </Box>
                <Box display="flex" alignItems="baseline" mb={2}>
                  <Typography sx={{ fontWeight: "bold", mr: 2 }}>
                    Số điện thoại:
                  </Typography>
                  <Typography>{data.CustomerPhone}</Typography>
                </Box>
              </Box>
              <Button
                variant="contained"
                sx={{
                  ml: 2,
                  height: "40px",
                  color: "white",
                  backgroundColor: colors.greenAccent[400],
                }}
              >
                Hoàn tất
              </Button>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Checkin;
