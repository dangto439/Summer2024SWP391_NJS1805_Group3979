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

function NewTournament() {
  const [clubs, setClubs] = useState([]);
  const [tournamentName, setTournamentName] = useState("");
  const [tournamentImage, setTournamentImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [firstPrize, setFirstPrize] = useState(0);
  const [secondPrize, setSecondPrize] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [participationFee, setParticipationFee] = useState(0);
  const [hostClubId, setHostClubId] = useState("");
  const navigate = useNavigate();

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

  // const handleImageChange = (info) => {
  //   if (info.file.status === "done") {
  //     setTournamentImage(info.file.originFileObj);
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       setPreviewImage(reader.result);
  //     };
  //     reader.readAsDataURL(info.file.originFileObj);
  //   }
  // };

  const handleFormSubmit = async () => {
    // if (!tournamentImage) {
    //   alert("Please select an image.");
    //   return;
    // }

    try {
      // const imageURL = await uploadFile(tournamentImage);

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
        startDate: startTime,
        endDate: endTime,
        capacity: parseInt(quantity) + 1,
        participationPrice: parseFloat(participationFee),
        clubId: parseInt(hostClubId),
      };
      console.log(formData);

      const response = await api.post("/contest", formData);

      console.log("Tournament saved successfully:", response.data);

      // navigate(`/dashboard/tournaments/${response.data.id}`);
    } catch (error) {
      console.error("Error saving tournament:", error);
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
  // const [previewImage, setPreviewImage] = useState("");
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
                type="number"
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
                type="number"
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
            <Grid item xs={2}>
              <Typography sx={{ color: "black", textAlign: "center" }}>
                Mô tả
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <TextField
                fullWidth
                variant="outlined"
                multiline
                rows={4}
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
                onChange={(e) =>
                  setQuantity(e.target.value).format("YYYY-MM-DD")
                }
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
                onChange={(e) =>
                  setStartTime(e.target.value).format("YYYY-MM-DD")
                }
                sx={{
                  backgroundColor: "white",
                  marginBottom: 2,
                  borderRadius: "8px",
                  color: "black",
                }}
                InputLabelProps={{ shrink: true }}
                InputProps={{ style: { color: "black" } }}
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
                InputLabelProps={{ shrink: true }}
                InputProps={{ style: { color: "black" } }}
              />
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ color: "black", textAlign: "center" }}>
                Phí tham gia
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
        <Box display="flex" justifyContent="flex-end" mt={2} mr={2}>
          <Button onClick={handleFormSubmit} sx={{ backgroundColor: "green" }}>
            Lưu và Tiếp tục
          </Button>
        </Box>
      </Card>
    </Box>
  );
}

export default NewTournament;
