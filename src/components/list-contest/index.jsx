import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Button,
  Typography,
  Divider,
  Pagination,
  InputBase,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
} from "@mui/material";
import { useLocation, Link } from "react-router-dom";
import api from "../../config/axios";
import ConfirmRegistration from "../register-contest";
import { tokens } from "../../theme";

const ListContest = () => {
  const [contests, setContests] = useState([]);
  const [filteredContests, setFilteredContests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const location = useLocation();
  const today = useMemo(() => new Date().setHours(0, 0, 0, 0), []);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [sortCriteria, setSortCriteria] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortCriteriaChange = (event) => {
    setSortCriteria(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await api.get("/contests");
        setContests(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchContests();
  }, []);

  useEffect(() => {
    const filterAndSortContests = () => {
      let filtered = [];
      const contestsNotStart = contests.filter(
        (contest) => new Date(contest.startDate).setHours(0, 0, 0, 0) > today
      );
      const contestsStart = contests.filter(
        (contest) => new Date(contest.startDate).setHours(0, 0, 0, 0) <= today
      );

      if (
        location.pathname === "/contest" ||
        location.pathname === "/contest/dangdienra"
      ) {
        filtered = contestsStart;
      } else if (location.pathname === "/contest/sapdienra") {
        filtered = contestsNotStart;
      }

      if (searchQuery) {
        filtered = filtered.filter((contest) =>
          contest.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Sort
      if (sortCriteria) {
        filtered.sort((a, b) => {
          switch (sortCriteria) {
            case "name":
              return sortOrder === "asc"
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name);
            case "startDate":
              return sortOrder === "asc"
                ? new Date(a.startDate) - new Date(b.startDate)
                : new Date(b.startDate) - new Date(a.startDate);
            case "capacity":
              return sortOrder === "asc"
                ? a.capacity - b.capacity
                : b.capacity - a.capacity;
            default:
              return 0;
          }
        });
      }

      setFilteredContests(filtered);
    };

    filterAndSortContests();
  }, [
    contests,
    searchQuery,
    sortCriteria,
    sortOrder,
    location.pathname,
    today,
  ]);

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

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${month} năm ${year}`;
  };

  const renderContests = () => {
    if (!Array.isArray(filteredContests)) {
      return null;
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentContests = filteredContests.slice(
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
        <Box display="flex" alignItems="flex-start" mt={2}>
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
                  onClick={showModal}
                  component={Link}
                  variant="contained"
                  sx={{ backgroundColor: "#B84848" }}
                >
                  Tham gia
                </Button>
                <ConfirmRegistration
                  visible={isModalVisible}
                  onClose={handleClose}
                  id={contest.contestId}
                />
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

  return (
    <Box display="flex" p={2}>
      <Box flex="2" mr={10}>
        <Box mt={3}>{renderContests()}</Box>
        <Box display="flex" justifyContent="center" mt={3}>
          <Pagination
            count={Math.ceil((filteredContests?.length || 0) / itemsPerPage)}
            page={currentPage}
            onChange={(event, page) => setCurrentPage(page)}
          />
        </Box>
      </Box>

      <Box flex="1" position="sticky" maxHeight="100vh" overflow="auto">
        <Box
          display="flex"
          backgroundColor={colors.greenAccent[900]}
          borderRadius="3px"
        >
          <InputBase
            sx={{ ml: 2, flex: 1, width: "300px" }}
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <IconButton type="button" sx={{ p: 1 }}>
            {/* <SearchIcon /> */}
          </IconButton>
        </Box>
        <FormControl sx={{ minWidth: 120, mr: 2 }}>
          <InputLabel>Sắp xếp theo</InputLabel>
          <Select
            value={sortCriteria}
            onChange={handleSortCriteriaChange}
            displayEmpty
          >
            <MenuItem value="name">Tên</MenuItem>
            <MenuItem value="startDate">Ngày</MenuItem>
            <MenuItem value="capacity">Số Lượng</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Thứ tự</InputLabel>
          <Select
            value={sortOrder}
            onChange={handleSortOrderChange}
            displayEmpty
          >
            <MenuItem value="asc">Tăng dần</MenuItem>
            <MenuItem value="desc">Giảm dần</MenuItem>
          </Select>
        </FormControl>
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
    </Box>
  );
};

export default ListContest;
