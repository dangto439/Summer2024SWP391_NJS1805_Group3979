import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Divider, Pagination } from "@mui/material";
import { Routes, Route, useLocation } from "react-router-dom";
import axios from "axios";

const ListContest = () => {
  const [contests, setContests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const location = useLocation();

  // dữ liệu tạm test
  const listContestsNotStart = [
    {
      id: 1,
      startdate: "2024-07-20",
      enddate: "2024-08-20",
      image: "https://via.placeholder.com/150",
      name: "Cuộc thi A",
      location: "Hà Nội",
      description: "Mô tả cuộc thi A",
      scale: "100 người",
      phonenumber: "0123456789",
    },
    {
      id: 2,
      startdate: "2024-08-15",
      enddate: "2024-09-15",
      image: "https://via.placeholder.com/150",
      name: "Cuộc thi B",
      location: "TP.HCM",
      time: "09:00 AM",
      description: "Mô tả cuộc thi B",
      scale: "200 người",
      phonenumber: "0987654321",
    },
    {
      id: 3,
      startdate: "2024-09-10",
      enddate: "2024-10-10",
      image: "https://via.placeholder.com/150",
      name: "Cuộc thi C",
      location: "Đà Nẵng",
      time: "10:00 AM",
      description: "Mô tả cuộc thi C",
      scale: "150 người",
      phonenumber: "0981234567",
    },
  ];

  const listContestsStart = [
    {
      id: 1,
      startdate: "2024-07-20",
      enddate: "2024-08-20",
      image: "https://via.placeholder.com/150",
      name: "Cuộc thi Q",
      location: "Hà Nội",
      description: "Mô tả cuộc thi A",
      scale: "100 người",
    },
    {
      id: 2,
      startdate: "2024-08-15",
      enddate: "2024-09-15",
      image: "https://via.placeholder.com/150",
      name: "Cuộc thi E",
      location: "TP.HCM",
      time: "09:00 AM",
      description: "Mô tả cuộc thi B",
      scale: "200 người",
    },
    {
      id: 3,
      startdate: "2024-09-10",
      enddate: "2024-10-10",
      image: "https://via.placeholder.com/150",
      name: "Cuộc thi W",
      location: "Đà Nẵng",
      time: "10:00 AM",
      description: "Mô tả cuộc thi C",
      scale: "150 người",
    },
  ];

  useEffect(() => {
    const fetchContests = async () => {
      try {
        if (
          location.pathname === "/contest" ||
          location.pathname === "/contest/dangdienra"
        ) {
          setContests(listContestsStart);
        } else if (location.pathname === "/contest/sapdienra") {
          setContests(listContestsNotStart);
        }
      } catch (error) {
        console.error("Error getting data: ", error);
      }
    };
    fetchContests();
  }, [location.pathname]);

  // Call Api để làm thật
  //  useEffect(() => {
  //   const fetchContests = async () => {
  //     try {
  //       let endpoint = "/contests";
  //       if (location.pathname === "/contest" || location.pathname === "/contest/dangdienra") {
  //         endpoint = "/contests/start";
  //       } else if (location.pathname === "/contest/sapdienra") {
  //         endpoint = "/contests/notstar";
  //       }

  //       const response = await axios.get(endpoint);
  //       setContests(response.data);
  //     } catch (error) {
  //       console.error("Error getting data: ", error);
  //     }
  //   };
  //   fetchContests();
  // }, [location.pathname]);

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

  const renderContests = () => {
    if (!Array.isArray(contests)) {
      return null;
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentContests = contests.slice(
      startIndex,
      startIndex + itemsPerPage
    );

    return currentContests.map((contest) => (
      <Box key={contest.id} mb={3}>
        <Box display="flex" alignItems="center" mt={2}>
          <Typography variant="h6" color="textSecondary" sx={{ mr: 2 }}>
            {formatDate(contest.startdate)}
          </Typography>
          <Divider sx={{ flexGrow: 1 }} />
        </Box>

        <Box display="flex" mt={2}>
          <img
            src={contest.image}
            alt={contest.name}
            style={{ width: "300px", height: "200px", marginRight: "100px" }}
          />
          <Box>
            <Typography variant="h5" color="primary">
              {contest.name}
            </Typography>
            <Typography variant="body1">
              <strong>Địa điểm:</strong> {contest.location}
              <br />
              <strong>Ngày bắt đầu:</strong> {contest.startdate}
              <br />
              <strong>Ngày kết thúc:</strong> {contest.enddate}
              <br />
              <strong>Mô tả:</strong> {contest.description}
              <br />
              <strong>Số lượng:</strong> {contest.scale}
              <br />
              {location.pathname === "/contest/sapdienra" && (
                <>
                  <strong>Số liên hệ:</strong> {contest.phonenumber}
                </>
              )}
            </Typography>
            {location.pathname === "/contest/sapdienra" && (
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
            )}
          </Box>
        </Box>
      </Box>
    ));
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box p={3} ml={3}>
      <Routes>
        <Route path="" element={<Box mt={3}>{renderContests()}</Box>} />
      </Routes>

      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination
          count={Math.ceil((contests?.length || 0) / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
};

export default ListContest;
