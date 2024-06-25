import { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../dashboard/Header";
import Forms from "./forms";
import { useLocation } from "react-router-dom";
import DeleteButton from "../global/deletebutton";
import api from "../../config/axios";

const Staff = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);
  const [isFormOpen, setFormOpen] = useState(false);
  const location = useLocation();

  const handleAddNewStaffAccount = () => {
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
  };

  const handleFormSubmit = () => {
    handleFormClose();
    fetchStaffs();
  };

  const allColumns = [
    {
      field: "staffId",
      headerName: "Mã",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "name",
      headerName: "Tên",
      flex: 1,
      cellClassName: "name-column--cell",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "gender",
      headerName: "Giới tính",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "Số điện thoại",
      flex: 1,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      headerAlign: "left",
      align: "left",
    },
    // {
    //   field: "accountStatus",
    //   headerName: "Status",
    //   flex: 1,
    //   headerAlign: "left",
    //   align: "left",
    // },
    {
      field: "delete",
      headerName: "Xóa",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <DeleteButton
          id={params.id}
          rows={rows}
          setRows={setRows}
          linkapi={"block-staff"}
          fetfunction={fetchStaffs}
        />
      ),
    },
  ];

  const [columns, setColumns] = useState([]);

  useEffect(() => {
    setColumns(
      location.pathname === "/dashboard/staff/clubid1"
        ? allColumns.filter((column) => column.field !== "clubid1")
        : allColumns
    );
  }, [location]);

  const fetchStaffs = async () => {
    try {
      const response = await api.get("/staff");
      const staffs = response.data;

      const filterStaffs = staffs.filter(
        (staff) => staff.accountStatus != "INACTIVE"
      );
      // setRows(response.data);
      setRows(filterStaffs);
    } catch (error) {
      console.error("Error fetching clubs:", error);
    }
  };

  useEffect(() => {
    fetchStaffs();
  });

  return (
    <Box m="20px" className="team-container">
      <Header
        title="Quản lý nhân viên"
        subtitle=""
        buttonText="Tạo tài khoản mới"
        onButtonClick={handleAddNewStaffAccount}
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
          "& .MuiDataGrid-virtualScroller": {
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
          getRowId={(row) => row.staffId}
        />
      </Box>
      <Forms
        open={isFormOpen}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
      />
    </Box>
  );
};

export default Staff;
