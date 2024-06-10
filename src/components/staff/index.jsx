import { useEffect, useState } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../dashboard/Header";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./index.scss";
import AddNewStaffAccountForm from "./formaddnewstaffaccount";
import api from "../../config/axios";
import { Popconfirm } from "antd";

const Staff = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);
  const [isAddFormOpen, setAddFormOpen] = useState(false);

  const handleDelete = async (id) => {
    //call api cho nay
    const response = await api.put(`/block-staff/${id}`);

    console.log(response.data);
    fetchaccountstaff();
  };

  const handleConfirm = (id) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure you want to delete this account?",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleDelete(id),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
      overlayClassName: "custom-confirm-alert-overlay",
    });
  };

  const handleAddNewStaffAccount = () => {
    setAddFormOpen(true);
  };

  const handleFormClose = () => {
    setAddFormOpen(false);
  };

  const handleFormSubmit = (value) => {
    //Viết hàm submit vào đây nè
    handleFormClose();
  };

  const columns = [
    {
      field: "id",
      headerName: "Staff ID", //tên cột
      headerAlign: "center",
      align: "center",
    },
    {
      field: "clubId",
      headerName: "Club ID",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "gender",
      headerName: "Gender",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "delete",
      headerName: "Delete Account",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <IconButton
          onClick={() => handleConfirm(params.id)}
          sx={{ color: "#AF2525" }}
        >
          <DeleteOutlineIcon />
        </IconButton>
      ),
    },
  ];

  const fetchaccountstaff = async () => {
    try {
      const response = await api.get("/staff");
      const accounts = response.data;
      const activeAccounts = accounts
        .filter((account) => account.accountStatus === "ACTIVE")
        .map((account) => ({
          id: account.id,
          clubId: account.club.clubId,
          name: account.name,
          email: account.email,
          gender: account.gender,
          phone: account.phone,
        }));
      setRows(activeAccounts);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchaccountstaff();
  }, []);

  return (
    <Box m="20px" className="team-container">
      <Header
        title="Manage Staff Account"
        subtitle="Dĩm nè"
        onAddStaff={handleAddNewStaffAccount}
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
