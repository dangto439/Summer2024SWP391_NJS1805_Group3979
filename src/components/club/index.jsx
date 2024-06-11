import { useState } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme.js";
// import { mockDataTeam } from "../../data/mockData.js";
import Header from "../../components/dashboard/Header.jsx";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import CreateNewClubForm from "./createnewclubform.jsx";
import DeleteButton from "../global/deletebutton";
const Club = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);
  const [isCreateNewClub, setCreateNewClub] = useState(false);

  const handleUpdate = (id) => {};

  const handleFormOpen = () => {
    setCreateNewClub(true);
  };

  const handleFormClose = () => {
    setCreateNewClub(false);
  };

  const handleFormSubmit = (value) => {
    //Viết hàm submit vào đây nè
    handleFormClose();
  };

  const columns = [
    {
      field: "name",
      headerName: "Tên Club",
      flex: 1,
      cellClassName: "name-column--cell",
      headerAlign: "center",
      align: "center",
    },
    // {
    //   field: "name",
    //   headerName: "Địa chỉ",
    //   flex: 1,
    //   cellClassName: "name-column--cell",
    //   headerAlign: "center",
    //   align: "center",
    // },
    // {
    //   field: "name",
    //   headerName: "Hotline",
    //   flex: 1,
    //   cellClassName: "name-column--cell",
    //   headerAlign: "center",
    //   align: "center",
    // },
    // {
    //   field: "age",
    //   headerName: "Số lượng sân",
    //   type: "number",
    //   headerAlign: "center",
    //   align: "center",
    // },
    // {
    //   field: "age",
    //   headerName: "Thời gian hoạt động",
    //   type: "number",
    //   headerAlign: "center",
    //   align: "center",
    // },

    {
      field: "age",
      headerName: "Trạng thái",
      type: "number",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "update",
      headerName: "Cập Nhật Club",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <IconButton
          onClick={() => handleUpdate(params.id)}
          sx={{ color: "#CE671B" }}
        >
          <PublishedWithChangesIcon />
        </IconButton>
      ),
    },
    {
      field: "delete",
      headerName: "Xóa Club",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <DeleteButton id={params.id} rows={rows} setRows={setRows} />
      ),
    },
  ];

  return (
    <Box m="20px" className="team-container">
      <Header
        title="Manage Club"
        subtitle="Dĩm nè"
        buttonText="Thêm mới sân"
        onButtonClick={handleFormOpen}
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
      <CreateNewClubForm
        open={isCreateNewClub}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
      />
    </Box>
  );
};

export default Club;
