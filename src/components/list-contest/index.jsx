import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Divider, Pagination } from "@mui/material";
import {
  Routes,
  Route,
  useLocation,
  Link as RouterLink,
  Link,
  Outlet,
} from "react-router-dom";
import axios from "axios";
import ContestDetail from "../../components/contest-detail";
import RegisterContest from "../../components/register-contest";

const ListContest = () => {
  const [contests, setContests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const location = useLocation();
  const today = new Date();

  // Dữ liệu tạm test
  const allContests = [
    {
      contestId: 1,
      participationPrice: 100000,
      capacity: 100,
      name: "Cuộc thi A",
      firstPrize: 1000000,
      secondPrize: 500000,
      startDate: "2024-07-20",
      endDate: "2024-08-20",
      clubId: 1,
      urlBanner: "https://via.placeholder.com/150",
    },
    {
      contestId: 2,
      participationPrice: 150000,
      capacity: 200,
      name: "Cuộc thi B",
      firstPrize: 2000000,
      secondPrize: 1000000,
      startDate: "2024-08-15",
      endDate: "2024-09-15",
      clubId: 2,
      urlBanner: "https://via.placeholder.com/150",
    },
    {
      contestId: 3,
      participationPrice: 120000,
      capacity: 150,
      name: "Cuộc thi C",
      firstPrize: 1500000,
      secondPrize: 750000,
      startDate: "2024-09-10",
      endDate: "2024-10-10",
      clubId: 3,
      urlBanner: "https://via.placeholder.com/150",
    },
    {
      contestId: 4,
      participationPrice: 110000,
      capacity: 80,
      name: "Cuộc thi D",
      firstPrize: 1200000,
      secondPrize: 600000,
      startDate: "2024-07-10",
      endDate: "2024-07-15",
      clubId: 4,
      urlBanner: "https://via.placeholder.com/150",
    },
  ];

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const contestsNotStart = allContests.filter(
          (contest) => new Date(contest.startDate) > today
        );
        const contestsStart = allContests.filter(
          (contest) => new Date(contest.startDate) <= today
        );

        if (
          location.pathname === "/contest" ||
          location.pathname === "/contest/dangdienra"
        ) {
          setContests(contestsStart);
        } else if (location.pathname === "/contest/sapdienra") {
          setContests(contestsNotStart);
        }
      } catch (error) {
        console.error("Error getting data: ", error);
      }
    };
    fetchContests();
  }, [location.pathname]);

  // Dữ liệu test
  const hotContests = [
    {
      imgSrc: "https://via.placeholder.com/50",
      alt: "Tin tức 1",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      imgSrc: "https://via.placeholder.com/50",
      alt: "Tin tức 2",
      content:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      imgSrc: "https://via.placeholder.com/50",
      alt: "Tin tức 3",
      content:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
  ];

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
      <Box key={contest.contestId} mb={3}>
        <Box display="flex" alignItems="center" mt={2}>
          <Typography variant="h6" color="textSecondary" sx={{ mr: 2 }}>
            {formatDate(contest.startDate)}
          </Typography>
          <Divider sx={{ flexGrow: 1 }} />
        </Box>

        <Box display="flex" mt={2}>
          <img
            src={contest.urlBanner}
            alt={contest.name}
            style={{ width: "300px", height: "200px", marginRight: "100px" }}
          />
          <Box>
            <Typography variant="h5" color="primary" textAlign="left">
              {contest.name}
            </Typography>
            <Typography variant="body1" textAlign="left">
              <strong>Ngày bắt đầu:</strong> {contest.startDate}
              <br />
              <strong>Ngày kết thúc:</strong> {contest.endDate}
              <br />
              <strong>Phần thưởng nhất:</strong> {contest.firstPrize}
              <br />
              <strong>Phần thưởng nhì:</strong> {contest.secondPrize}
              <br />
              <strong>Số lượng:</strong> {contest.capacity}
            </Typography>
            {location.pathname === "/contest/sapdienra" && (
              <Box mt={2} display="flex" justifyContent="flex-start">
                <Button
                  component={Link}
                  to={`/contest/sapdienra/chitiet/${contest.contestId}`}
                  variant="contained"
                  sx={{ marginRight: "15px", backgroundColor: "#6992CE" }}
                >
                  Chi tiết
                </Button>
                <Button
                  component={Link}
                  to={`/contest/sapdienra/thamgia/${contest.contestId}`}
                  variant="contained"
                  sx={{ backgroundColor: "#B84848" }}
                >
                  Tham gia
                </Button>
              </Box>
            )}
            {location.pathname === "/contest/dangdienra" ||
            location.pathname === "/contest" ? (
              <Box mt={2} display="flex" justifyContent="center">
                <Button
                  component={Link}
                  to={`/contest/dangdienra/chitiet2/${contest.contestId}`}
                  variant="contained"
                  sx={{ marginRight: "15px", backgroundColor: "#6992CE" }}
                >
                  Chi tiết
                </Button>
              </Box>
            ) : null}
          </Box>
        </Box>
      </Box>
    ));
  };

  const renderHotContests = () => {
    return hotContests.map((news, index) => (
      <Box
        key={index}
        display="flex"
        mb={2}
        border="1px solid #ddd"
        p={1}
        borderRadius={1}
      >
        <img
          src={news.imgSrc}
          alt={news.alt}
          style={{ marginRight: "10px" }}
          height="100px"
        />
        <Typography variant="body1">{news.content}</Typography>
      </Box>
    ));
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box display="flex" p={2}>
      <Box flex="2" mr={10}>
        <Box mt={3}>{renderContests()}</Box>
        <Box display="flex" justifyContent="center" mt={3}>
          <Pagination
            count={Math.ceil((contests?.length || 0) / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
          />
        </Box>
      </Box>

      <Box flex="1" position="sticky" maxHeight="100vh" overflow="auto">
        <Typography
          variant="h6"
          color="primary"
          sx={{
            textAlign: "center",
            borderBottom: "2px solid #78B9A9",
            marginBottom: "15px",
            paddingBottom: "10px",
          }}
        >
          CUỘC THI ĐANG ĐƯỢC CHÚ Ý
        </Typography>
        {renderHotContests()}
      </Box>
      <Box>
        {/* <Routes>
          <Route path="chitiet2/:id" element={<Tournament />} />
          <Route path="chitiet/:id" element={<ContestDetail />} />
          <Route path="thamgia/:id" element={<RegisterContest />} />
        </Routes> */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default ListContest;
