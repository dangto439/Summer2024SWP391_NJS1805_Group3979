import { useState, useEffect } from "react";
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
  Pagination,
} from "@mui/material";
import {
  useLocation,
  Link as RouterLink,
  Routes,
  Route,
} from "react-router-dom";
import { tokens } from "../../theme";
import SearchIcon from "@mui/icons-material/Search";

const Contest = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  const [contests, setContests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2; // Số lượng mục trên mỗi trang

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
    {
      id: 3,
      date: "2024-09-10",
      image: "https://via.placeholder.com/150",
      name: "Cuộc thi C",
      location: "Đà Nẵng",
      time: "10:00 AM",
      description: "Mô tả cuộc thi C",
      scale: "150 người",
      hotline: "0981234567",
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

  useEffect(() => {
    // upload dữ liệu DB
    setContests(sampleContests);
  }, []);

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

  const renderContests = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentContests = contests.slice(
      startIndex,
      startIndex + itemsPerPage
    );

    return currentContests.map((contest) => (
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
                sx={{
                  marginRight: "15px",
                  backgroundColor: "#6992CE",
                }}
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

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
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
                // dĩm ko còn cách nào hay hơn nữa
                location.pathname === "/contest/danhsach" || "/contest"
                  ? `2px solid ${colors.greenAccent[500]}`
                  : "none",
            }}
          >
            Danh sách
          </Button>
          {/* <Button
            component={RouterLink}
            to="ngay"
            sx={{
              borderBottom:
                location.pathname === "/contest/ngay"
                  ? `2px solid ${colors.greenAccent[500]}`
                  : "none",
            }}
          >
            Ngày
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
          </Button> */}
        </Box>
      </Box>

      <Routes>
        <Route path="" element={<Box mt={3}>{renderContests()}</Box>} />
        <Route path="danhsach" element={<Box mt={3}>{renderContests()}</Box>} />
        {/* <Route path="ngay" element={<Box mt={3}>Page Ngày</Box>} />
        <Route path="thang" element={<Box mt={3}>Pgae Tháng</Box>} /> */}
      </Routes>

      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination
          count={Math.ceil(contests.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
};

export default Contest;
