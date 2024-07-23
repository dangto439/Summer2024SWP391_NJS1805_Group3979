import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardMedia,
  Grid,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  Button,
} from "@mui/material";
import api from "../../config/axios.js";
import uploadFile from "../../utils/upload.js";
import { Upload, Image } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function NewTournament() {
  const [clubs, setClubs] = useState([]);
  const [tournamentName, setTournamentName] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [firstPrize, setFirstPrize] = useState("");
  const [secondPrize, setSecondPrize] = useState("");
  const [quantity, setQuantity] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [participationFee, setParticipationFee] = useState(0);
  const [hostClubId, setHostClubId] = useState("");
  const navigate = useNavigate();

  const getCurrentDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await api.get(`current-clubs`);
        setClubs(response.data);
      } catch (error) {
        console.error("Error fetching clubs:", error);
      }
    };
    fetchClubs();
  }, []);

  const handleFormSubmit = async () => {
    if (!tournamentName.trim()) {
      toast.error("Tên cuộc thi không được để trống.");
      return;
    }
    if (
      parseFloat(firstPrize) < 0 ||
      parseFloat(secondPrize) < 0 ||
      parseFloat(participationFee) < 0
    ) {
      toast.error("Không thể có giá trị âm");
      return;
    }

    if (!startTime || !endTime) {
      toast.error("Thời gian không được để trống.");
      return;
    }
    if (new Date(startTime) >= new Date(endTime)) {
      toast.error("Ngày bắt đầu phải trước ngày kết thúc.");
      return;
    }
    try {
      const uploadPromises = fileList.map(async (file) => {
        const downloadURL = await uploadFile(file.originFileObj);
        return downloadURL;
      });
      const imageURL = await Promise.all(uploadPromises);

      const formData = {
        name: tournamentName,
        urlBanner: imageURL[0],
        firstPrize: parseFloat(firstPrize),
        secondPrize: parseFloat(secondPrize),
        startDate: startTime.format("YYYY-MM-DD"),
        endDate: endTime.format("YYYY-MM-DD"),
        capacity: parseInt(quantity),
        participationPrice: parseFloat(participationFee),
        clubId: parseInt(hostClubId),
      };
      const response = await api.post("/contest", formData);
      navigate(`/dashboard/tournaments/detail/${response.data.contestId}`);
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const [previewOpen, setPreviewOpen] = useState(false);
  const [fileList, setFileList] = useState([]);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  return (
    <Box m="20px">
      <Card sx={{ backgroundColor: "white", borderRadius: "10px" }}>
        <CardMedia sx={{ backgroundColor: "#B8B5B5", padding: "20px" }}>
          <Typography
            variant="h5"
            sx={{ marginBottom: "20px", color: "black" }}
          >
            Thông tin cơ bản
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <Typography sx={{ color: "black", textAlign: "center" }}>
                Host
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <Select
                  variant="outlined"
                  value={hostClubId}
                  onChange={(e) => setHostClubId(e.target.value)}
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    color: "black",
                  }}
                >
                  {clubs.map((club) => (
                    <MenuItem key={club.clubId} value={club.clubId}>
                      {club.clubName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ color: "black", textAlign: "center" }}>
                Tên Cuộc Thi
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <TextField
                fullWidth
                variant="outlined"
                value={tournamentName}
                onChange={(e) => setTournamentName(e.target.value)}
                sx={{
                  backgroundColor: "white",
                  marginBottom: 2,
                  borderRadius: "8px",
                  color: "black",
                }}
                InputProps={{ style: { color: "black" } }}
              />
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ color: "black", textAlign: "center" }}>
                Hình ảnh
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <Upload
                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
              >
                {fileList.length >= 8 ? null : uploadButton}
              </Upload>
            </Grid>
            {previewImage && (
              <Image
                wrapperStyle={{
                  display: "none",
                }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewImage(""),
                }}
                src={previewImage}
              />
            )}
            <Grid item xs={2}>
              <Typography sx={{ color: "black", textAlign: "center" }}>
                Giải nhất
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <TextField
                fullWidth
                variant="outlined"
                value={firstPrize}
                onChange={(e) => setFirstPrize(e.target.value)}
                sx={{
                  backgroundColor: "white",
                  marginBottom: 2,
                  borderRadius: "8px",
                  color: "black",
                }}
                InputProps={{ style: { color: "black" } }}
              />
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ color: "black", textAlign: "center" }}>
                Giải nhì
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <TextField
                fullWidth
                variant="outlined"
                value={secondPrize}
                onChange={(e) => setSecondPrize(e.target.value)}
                sx={{
                  backgroundColor: "white",
                  marginBottom: 2,
                  borderRadius: "8px",
                  color: "black",
                }}
                InputProps={{ style: { color: "black" } }}
              />
            </Grid>
          </Grid>
        </CardMedia>
        <CardMedia sx={{ backgroundColor: "#B8B5B5", padding: "20px" }}>
          <Typography
            variant="h5"
            sx={{ marginBottom: "20px", color: "black" }}
          >
            Thông tin chi tiết
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <Typography sx={{ color: "black", textAlign: "center" }}>
                Số lượng
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <TextField
                fullWidth
                variant="outlined"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                sx={{
                  backgroundColor: "white",
                  marginBottom: 2,
                  borderRadius: "8px",
                  color: "black",
                }}
                InputProps={{ style: { color: "black" } }}
              />
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ color: "black", textAlign: "center" }}>
                Bắt đầu (dự kiến)
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <TextField
                fullWidth
                variant="outlined"
                type="date"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                sx={{
                  backgroundColor: "white",
                  marginBottom: 2,
                  borderRadius: "8px",
                  color: "black",
                }}
                inputProps={{
                  min: getCurrentDate(),
                  style: { color: "black" },
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ color: "black", textAlign: "center" }}>
                Kết thúc (dự kiến)
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <TextField
                fullWidth
                variant="outlined"
                type="date"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                sx={{
                  backgroundColor: "white",
                  marginBottom: 2,
                  borderRadius: "8px",
                  color: "black",
                }}
                inputProps={{
                  min: startTime || getCurrentDate(),
                  style: { color: "black" },
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ color: "black", textAlign: "center" }}>
                Lệ phí
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <TextField
                fullWidth
                variant="outlined"
                type="number"
                value={participationFee}
                onChange={(e) => setParticipationFee(e.target.value)}
                sx={{
                  backgroundColor: "white",
                  marginBottom: 2,
                  borderRadius: "8px",
                  color: "black",
                }}
                InputProps={{ style: { color: "black" } }}
              />
            </Grid>
          </Grid>
        </CardMedia>
        <Box display="flex" justifyContent="flex-end" mt={2} pr={2}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "#007BFF",
              color: "white",
              borderRadius: "8px",
              padding: "10px 20px",
            }}
            onClick={handleFormSubmit}
          >
            Lưu
          </Button>
        </Box>
      </Card>
    </Box>
  );
}

export default NewTournament;
