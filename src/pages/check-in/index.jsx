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
import { useEffect, useState } from "react";
import api from "../../config/axios";

const Checkin = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [searchTerm, setSearchTerm] = useState("");
  const [bookingDetails, setBookingDetails] = useState(null);
  const [clubId, setClubId] = useState();
  const { id: staffId } = useParams();

  const Breadcrumb = () => {
    const pathnames = location.pathname.split("/").filter((x) => x);
    return (
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ mb: "20px", mt: "20px", fontSize: "18px" }}
      >
        <Link component={RouterLink} to="/" color="inherit">
          Trang chủ
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

  const handleSearch = async (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value) {
      try {
        const response = await api.get(
          `/booking/booking-detail-response/${event.target.value}`
        );
        setBookingDetails(response.data);
      } catch (error) {
        console.error("Error fetching booking details: ", error);
      }
    } else {
      setBookingDetails(null);
    }
  };
  useEffect(() => {
    const fetchClubId = async () => {
      try {
        const response = await api.get(`/account/${staffId}`);
        setClubId(response.data.club.clubId);
      } catch (error) {
        console.error("Error fetching ClubId: ", error);
      }
    };
    fetchClubId();
  }, []);

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
            placeholder="Mã đặt sân"
            onChange={handleSearch}
            value={searchTerm}
          />
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton>
        </Box>
        <Box display="flex">
          <Box
            component={RouterLink}
            to={`/club-detail/${clubId}`}
            display="flex"
          >
            <Button>Trang chủ sân</Button>
          </Box>
        </Box>
      </Box>
      {searchTerm && bookingDetails && (
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box
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
                <Typography variant="h5" sx={{ fontWeight: "bold", mr: 2 }}>
                  Mã đặt sân:
                </Typography>
                <Typography variant="h5">
                  {bookingDetails.checkInCode}
                </Typography>
              </Box>
              <Box display="flex" alignItems="baseline" mb={2}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mr: 2 }}>
                  Tên khách hàng:
                </Typography>
                <Typography variant="h6">
                  {bookingDetails.customerName}
                </Typography>
              </Box>
              <Box display="flex" alignItems="baseline" mb={2}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mr: 2 }}>
                  Số điện thoại:
                </Typography>
                <Typography variant="h6">{bookingDetails.phone}</Typography>
              </Box>
              <Box display="flex" alignItems="baseline" mb={2}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mr: 2 }}>
                  Ngày chơi:
                </Typography>
                <Typography variant="h6">
                  {bookingDetails.playingDate}
                </Typography>
              </Box>
              <Box display="flex" alignItems="baseline" mb={2}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mr: 2 }}>
                  Tên sân:
                </Typography>
                <Typography variant="h6">{bookingDetails.courtName}</Typography>
              </Box>
              <Box display="flex" alignItems="baseline" mb={2}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mr: 2 }}>
                  Thời gian:
                </Typography>
                <Typography variant="h6">
                  {bookingDetails.timeSlot}:00
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Checkin;
