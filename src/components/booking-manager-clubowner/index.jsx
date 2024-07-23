import { Box, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme.js";
import Header from "../dashboard/Header.jsx";
import DeleteButton from "../global/deletebutton/index.jsx";
import api from "../../config/axios.js";

const BookingManager = ({ clubId }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);

  const columns = [
    // {
    //   field: "bookingId",
    //   headerName: "Mã booking",
    //   flex: 1,
    //   headerAlign: "center",
    //   align: "center",
    // },
    {
      field: "bookingDate",
      headerName: "Ngày đặt sân",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    //
    // {
    //   field: "discountPrice",
    //   headerName: "Giá giảm",
    //   flex: 1,
    //   headerAlign: "center",
    //   align: "center"
    // },
    {
      field: "totalPrice",
      headerName: "Giá tổng",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "bookingType",
      headerName: "Type",
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
    //     <DeleteButton id={params.bookingId} rows={rows} setRows={setRows} />
    //   ),
    // },
  ];

  const fetchCourts = async () => {
    try {
      // nội dung fetch
      const response = await api.get(`/bookings/${clubId}`);
      console.log(response.data);
      // console.log(response.data);
      setRows(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchCourts();
  }, [clubId]);

  return (
    <Box m="20px" className="team-container">
      <Header title="Quản lý đơn đặt sân" subtitle="" />
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
          getRowId={(row) => row.bookingId}
        />
      </Box>

      {/* <Forms
          open={isFormOpen}
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
          fetFunction={fetchCourts}
          mode={mode}
          id={selectedCourtId}
        /> */}
    </Box>
  );
};

export default BookingManager;
