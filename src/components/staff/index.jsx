import { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../dashboard/Header";
import AddNewStaffAccountForm from "./formaddnewstaffaccount";
import { useLocation } from "react-router-dom";
import DeleteButton from "../global/deletebutton";

const Staff = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);
  const [isAddFormOpen, setAddFormOpen] = useState(false);
  const location = useLocation();

  const handleAddNewStaffAccount = () => {
    setAddFormOpen(true);
  };

  const handleFormClose = () => {
    setAddFormOpen(false);
  };

  const handleFormSubmit = (value) => {
    // Viết hàm submit vào đây
    handleFormClose();
  };

  const allColumns = [
    // {
    //   field: "clubid",
    //   headerName: "Club ID",
    //   headerAlign: "left",
    //   align: "left",
    // },
    {
      field: "id",
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
    {
      field: "delete",
      headerName: "Xóa",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <DeleteButton id={params.id} rows={rows} setRows={setRows} />
      ),
    },
  ];

  const [columns, setColumns] = useState([]);

  useEffect(() => {
    setColumns(
      location.pathname === "/dashboard/staff/clubid1"
        ? allColumns.filter((column) => column.field !== "clubid")
        : allColumns
    );
  }, [location]);

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
        <DataGrid rows={rows} columns={columns} />
      </Box>
      <AddNewStaffAccountForm
        open={isAddFormOpen}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
      />
    </Box>
  );
};

export default Staff;
