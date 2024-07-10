import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { tokens } from "../../theme.js";
import Header from "../dashboard/Header.jsx";
import DeleteButton from "../global/deletebutton/index.jsx";
import api from "../../config/axios.js";
import { message } from "antd";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const PromotionManager = ({ clubId }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    promotionCode: "",
    discount: "0%",
    startDate: dayjs(),
    endDate: dayjs().add(1, "day"),
    status: "ACTIVE",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "discount") {
      const numericValue = value.replace(/\D/g, "");
      setFormData({
        ...formData,
        [name]: numericValue + "%",
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleDateChange = (name, date) => {
    setFormData({
      ...formData,
      [name]: date,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.endDate.isBefore(formData.startDate)) {
      // alert("Ngày kết thúc phải sau ngày bắt đầu.");
      message.error("Ngày kết thúc phải sau ngày bắt đầu.");
      return;
    }
    const formattedData = {
      ...formData,
      discount: parseFloat(formData.discount.replace("%", "")),
      startDate: formData.startDate.format("YYYY-MM-DD"),
      endDate: formData.endDate.format("YYYY-MM-DD"),
    };
    // console.log(formattedData);
    // console.log(clubId);
    try {
      const response = await api.post(`/promotion/${clubId}`, formattedData);
      setRows((prevRows) => [...prevRows, response.data]);
      handleClose();
    } catch (error) {
      console.error("Tạo phiếu giảm giá thất bại", error);
    }
  };

  const columns = [
    // {
    //   field: "promotionId",
    //   headerName: "Mã giảm giá",
    //   flex: 1,
    //   headerAlign: "center",
    //   align: "center",
    // },
    {
      field: "promotionCode",
      headerName: "Mã giảm giá",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "discount",
      headerName: "Giá giảm (%)",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "startDate",
      headerName: "Ngày bắt đầu",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "endDate",
      headerName: "Ngày kết thúc",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "promotionStatus",
      headerName: "Trạng thái",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    // {
    //   field: "delete",
    //   headerName: "Xóa",
    //   flex: 1,
    //   headerAlign: "center",
    //   align: "center",
    //   renderCell: (params) => (
    //     <DeleteButton id={params.promotionId} rows={rows} setRows={setRows} />
    //   ),
    // },
  ];

  const fetchPromotions = async () => {
    try {
      const response = await api.get(`/promotion/${clubId}`);
      setRows(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, [clubId]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box m="20px" className="team-container">
        <Header
          title="Quản lý Phiếu Giảm Giá"
          subtitle=""
          buttonText="Tạo phiếu giảm giá mới"
          onButtonClick={handleOpen}
        />
        <Box
          m="40px 0 0 0"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.greenAccent[800],
              borderBottom: "none",
            },
            "&.MuIDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.greenAccent[800],
            },
            "& .MuiDataGrid-columnHeader": {
              display: "flex",
              justifyContent: "center",
            },
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => row.promotionId}
          />
        </Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              ...style,
              backgroundColor: "#383838",
              padding: 4,
              borderRadius: 2,
            }}
            component="form"
            onSubmit={handleSubmit}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ color: "#4cceac" }}
            >
              Tạo phiếu giảm giá mới
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="promotionCode"
              label="Mã giảm giá"
              name="promotionCode"
              value={formData.promotionCode}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="discount"
              label="Giá trị giảm giá"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
            />
            <DatePicker
              label="Ngày bắt đầu"
              value={formData.startDate}
              onChange={(date) => handleDateChange("startDate", date)}
              renderInput={(params) => (
                <TextField {...params} fullWidth margin="normal" />
              )}
            />
            <DatePicker
              label="Ngày kết thúc"
              value={formData.endDate}
              onChange={(date) => handleDateChange("endDate", date)}
              renderInput={(params) => (
                <TextField {...params} fullWidth margin="normal" />
              )}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Tạo
            </Button>
          </Box>
        </Modal>
      </Box>
    </LocalizationProvider>
  );
};

export default PromotionManager;
