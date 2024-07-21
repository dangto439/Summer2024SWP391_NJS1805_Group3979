import { useEffect, useState } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme.js";
// import Header from "../../components/dashboard/Header.jsx";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import DeleteButton from "../global/deletebutton";
import api from "../../config/axios.js";
import { message } from "antd";
import UpdateClubForm from "./forrmUpdateClub.jsx";
import "./index.scss";

const ClubAdmin = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);
  const [selectedClubId, setSelectedClubId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClubData, setSelectedClubData] = useState(null);

  const showModal = (clubData) => {
    setSelectedClubData(clubData);
    setIsModalOpen(true);
  };

  const handleOk = async (updatedClub) => {
    try {
      await handleUpdateClub(updatedClub.clubId, updatedClub);
      message.success("Cập nhật thành công!");
    } catch (error) {
      message.error("Cập nhật thát bại!");
    }
    setIsModalOpen(false);
    fetchallClubs();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleUpdate = async (id) => {
    const clubData = await fetchAClub(id);
    setSelectedClubId(id);
    showModal(clubData);
  };

  const columns = [
    {
      field: "clubName",
      headerName: "Tên Club",
      flex: 1,
      cellClassName: "name-column--cell",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "clubAddress",
      headerName: "Địa chỉ",
      flex: 1,
      cellClassName: "name-column--cell",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "hotline",
      headerName: "Hotline",
      flex: 1,
      cellClassName: "name-column--cell",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "description",
      headerName: "Mô tả",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "clubStatus",
      headerName: "Trạng thái",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "update",
      headerName: "Cập Nhật",
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
      headerName: "Xóa",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <DeleteButton
          id={params.id}
          rows={rows}
          setRows={setRows}
          linkapi={"club"}
          fetfunction={fetchallClubs}
        />
      ),
    },
  ];

  const fetchallClubs = async () => {
    try {
      const response = await api.get(`/clubs`);
      const clubs = response.data;

      const filteredClubs = clubs.filter(
        (club) => club.clubStatus !== "DELETED"
      );
      const rows = filteredClubs.map((club, index) => ({
        id: club.clubId || index,
        clubName: club.clubName,
        clubStatus: club.clubStatus,
        clubAddress: club.clubAddress,
        hotline: club.hotline,
        openTime: club.openTime,
        closeTime: club.closeTime,
        description: club.description,
      }));
      setRows(rows);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchAClub = async (id) => {
    const response = await api.get(`/club/${id}`);
    return response.data;
  };

  const handleUpdateClub = async (id, updatedClub) => {
    await api.put(`/club/${id}`, updatedClub);
  };

  useEffect(() => {
    fetchallClubs();
  }, []);

  return (
    <Box m="20px" className="team-container">
      {/* <Header title="Quản lý Clb" subtitle="" /> */}
      <h2 style={{ color: "white" }}>Quản Lí Câu Lạc Bộ</h2>
      <Box m="40px 0 0 0" height="75vh">
        <DataGrid rows={rows} columns={columns} />
      </Box>
      <UpdateClubForm
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        clubData={selectedClubData}
      />
    </Box>
  );
};

export default ClubAdmin;
