import {
  Box,
  Card,
  CardMedia,
  Grid,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import api from "../../config/axios";

function NewTournament() {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await api.get("/current-clubs");
        setClubs(response.data);
      } catch (error) {
        console.error("Error fetching clubs:", error);
      }
    };
    fetchClubs();
  }, []);

  return (
    <Box m="20px">
      <Card sx={{ backgroundColor: "#726868" }}>
        <CardMedia sx={{ backgroundColor: "#C5C3C3", padding: "20px" }}>
          <Typography
            variant="h5"
            sx={{ marginBottom: "20px", color: "black" }}
          >
            Thông tin cơ bản
          </Typography>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <Typography sx={{ color: "black", textAlign: "center" }}>
                  Host
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <FormControl fullWidth sx={{ marginBottom: 2 }}>
                  <InputLabel sx={{ color: "black" }}>Host</InputLabel>
                  <Select
                    variant="outlined"
                    name="host"
                    label="Host"
                    sx={{
                      backgroundColor: "white",
                      borderRadius: "8px",
                      color: "black",
                    }}
                  >
                    {clubs.map((club) => (
                      <MenuItem key={club.clubId} value={club.clubId}>
                        {club.clubname}
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
                  name="tournamentName"
                  sx={{
                    backgroundColor: "white",
                    marginBottom: 2,
                    borderRadius: "8px",
                    color: "black",
                  }}
                  InputProps={{
                    style: { color: "black" },
                  }}
                />
              </Grid>
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
                  name="quantity"
                  sx={{
                    backgroundColor: "white",
                    marginBottom: 2,
                    borderRadius: "8px",
                    color: "black",
                  }}
                  InputProps={{
                    style: { color: "black" },
                  }}
                />
              </Grid>
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
                  name="firstPrize"
                  sx={{
                    backgroundColor: "white",
                    marginBottom: 2,
                    borderRadius: "8px",
                    color: "black",
                  }}
                  InputProps={{
                    style: { color: "black" },
                  }}
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
                  name="secondPrize"
                  sx={{
                    backgroundColor: "white",
                    marginBottom: 2,
                    borderRadius: "8px",
                    color: "black",
                  }}
                  InputProps={{
                    style: { color: "black" },
                  }}
                />
              </Grid>
              <Grid item xs={2}>
                <Typography sx={{ color: "black", textAlign: "center" }}>
                  Bắt đầu
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="datetime-local"
                  name="startTime"
                  sx={{
                    backgroundColor: "white",
                    marginBottom: 2,
                    borderRadius: "8px",
                    color: "black",
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    style: { color: "black" },
                  }}
                />
              </Grid>
              <Grid item xs={2}>
                <Typography sx={{ color: "black", textAlign: "center" }}>
                  Kết thúc
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="datetime-local"
                  name="endTime"
                  sx={{
                    backgroundColor: "white",
                    marginBottom: 2,
                    borderRadius: "8px",
                    color: "black",
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    style: { color: "black" },
                  }}
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
                  name="participationFee"
                  sx={{
                    backgroundColor: "white",
                    marginBottom: 2,
                    borderRadius: "8px",
                    color: "black",
                  }}
                  InputProps={{
                    style: { color: "black" },
                  }}
                />
              </Grid>
              <Grid item xs={2}>
                <Typography sx={{ color: "black", textAlign: "center" }}>
                  Description
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  variant="outlined"
                  multiline
                  rows={4}
                  name="description"
                  sx={{
                    backgroundColor: "white",
                    marginBottom: 2,
                    borderRadius: "8px",
                    color: "black",
                  }}
                  InputProps={{
                    style: { color: "black" },
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </CardMedia>
      </Card>
    </Box>
  );
}

export default NewTournament;
