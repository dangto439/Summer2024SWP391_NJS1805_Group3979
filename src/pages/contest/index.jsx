import React, { useState, useEffect } from "react";
import {
  Box,
  Breadcrumbs,
  Button,
  IconButton,
  InputBase,
  Link,
  useTheme,
  Typography,
  Divider,
} from "@mui/material";
import { useLocation, Link as RouterLink } from "react-router-dom";
import { tokens } from "../../theme";
import SearchIcon from "@mui/icons-material/Search";

const Contest = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  const [contests, setContests] = useState([]);

  // dữ liệu thử nghiệm
  const sampleContests = [
    {
      id: 1,
      date: "2024-07-20",
      image: "https://via.placeholder.com/150",
      name: "Cuộc thi A",
      location: "Hà Nội",
      time: "08:00 AM",
      description: "Mô tả cuộc thi A",
      scale: "100 người",
      hotline: "0123456789",
    },
    {
      id: 2,
      date: "2024-08-15",
      image: "https://via.placeholder.com/150",
      name: "Cuộc thi B",
      location: "TP.HCM",
      time: "09:00 AM",
      description: "Mô tả cuộc thi B",
      scale: "200 người",
      hotline: "0987654321",
    },
  ];

  useEffect(() => {
    // upload dữ liệu DB
    setContests(sampleContests);
  }, []);

  const renderContests = () => {
    const months = [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ];

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const month = months[date.getMonth()];
      const year = date.getFullYear();
      return `${month} năm ${year}`;
    };

    return contests.map((contest) => (
      <Box key={contest.id} mb={3}>
        <Box display="flex" alignItems="center" mt={2}>
          <Typography variant="h6" color="textSecondary" sx={{ mr: 2 }}>
            {formatDate(contest.date)}
          </Typography>
          <Divider sx={{ flexGrow: 1 }} />
        </Box>
        <Box display="flex" mt={2}>
          <img
            // đang giả sử link hình
            src="https://plus.unsplash.com/premium_photo-1673995612893-bd26f8f780a0?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt={contest.name}
            style={{ width: "300px", height: "200px", marginRight: "100px" }}
          />
          <Box>
            <Typography variant="h5" color="primary">
              {contest.name}
            </Typography>
            <Typography variant="body1">
              <strong>Ngày:</strong>{" "}
              {new Date(contest.date).toLocaleDateString()}
              <br />
              <strong>Địa điểm:</strong> {contest.location}
              <br />
              <strong>Thời gian:</strong> {contest.time}
              <br />
              <strong>Mô tả:</strong> {contest.description}
              <br />
              <strong>Quy mô:</strong> {contest.scale}
              <br />
              <strong>Hotline:</strong> {contest.hotline}
            </Typography>
            <Box mt={2}>
              <Button
                variant="contained"
                sx={{ marginRight: "15px", backgroundColor: "#6992CE" }}
              >
                Chi tiết
              </Button>
              <Button variant="contained" sx={{ backgroundColor: "#B84848" }}>
                Tham gia
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    ));
  };

  const Breadcrumb = () => {
    const pathnames = location.pathname.split("/").filter((x) => x);
    return (
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: "20px" }}>
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

        <Box
          display="flex"
          backgroundColor={colors.greenAccent[900]}
          color={colors.grey[100]}
          borderRadius="3px"
        >
          <Button>Danh sách</Button>
          <Button>Ngày</Button>
          <Button>Tháng</Button>
        </Box>
      </Box>
      <Box mt={3}>{renderContests()}</Box>
    </Box>
  );
};

export default Contest;
