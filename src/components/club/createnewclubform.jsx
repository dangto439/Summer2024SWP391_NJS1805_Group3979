import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import api from "../../config/axios";

const schema = yup.object().shape({
  clubName: yup.string().required("Name is required"),
  clubAddress: yup.string().required("Address is required"),
  clubDescription: yup.string().required("Description is required"),
  clubHotLine: yup.string().required("Hotline is required"),
  capacity: yup.number().required("Number of courts is required").min(1),
  openingTime: yup.string().required("Open time is required"),
  closingTime: yup
    .string()
    .required("Close time is required")
    .test("is-greater", "Close time must be after open time", function (value) {
      const { openingTime } = this.parent;
      const convertToInt = (timeStr) => parseInt(timeStr.replace(":", ""), 10);
      const openingTimeInt = convertToInt(openingTime);
      const closingTimeInt = convertToInt(value);
      return closingTimeInt > openingTimeInt;
    }),
});

const CreateNewClubForm = ({ open, onClose, onSubmit, fetFunction }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [province, setProvince] = useState("");
  const [districts, setDistricts] = useState([]);

  const handleProvinceChange = (event) => {
    setProvince(event.target.value);
    setDistricts(["District 1", "District 2", "District 3"]);
  };

  const handleFormSubmit = async (data) => {
    const adjustedData = {
      ...data,
      openingTime: parseInt(data.openingTime, 10),
      closingTime: parseInt(data.closingTime, 10),
      urlImages: ["none image"],
    };

    try {
      onSubmit(adjustedData);
      await api.post("/club", adjustedData);
      fetFunction();
    } catch (error) {
      console.error("Error creating club: ", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Tạo mới Club</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <FormControl fullWidth margin="normal" error={!!errors.clubName}>
            <TextField
              label="Name"
              {...control.register("clubName")}
              error={!!errors.clubName}
              helperText={errors.clubName?.message}
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <TextField
              label="Description"
              {...control.register("clubDescription")}
            />
          </FormControl>

          <FormControl fullWidth margin="normal" error={!!errors.clubAddress}>
            <TextField
              label="Address"
              {...control.register("clubAddress")}
              error={!!errors.clubAddress}
              helperText={errors.clubAddress?.message}
            />
          </FormControl>

          <FormControl fullWidth margin="normal" error={!!errors.clubHotLine}>
            <TextField
              label="Hotline"
              {...control.register("clubHotLine")}
              error={!!errors.clubHotLine}
              helperText={errors.clubHotLine?.message}
            />
          </FormControl>

          <FormControl fullWidth margin="normal" error={!!errors.capacity}>
            <InputLabel>Số lượng sân</InputLabel>
            <Controller
              name="capacity"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select {...field} label="Số lượng sân">
                  {[...Array(10).keys()].map((n) => (
                    <MenuItem key={n + 1} value={n + 1}>
                      {n + 1}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            <FormHelperText>{errors.capacity?.message}</FormHelperText>
          </FormControl>

          <FormControl fullWidth margin="normal" error={!!errors.openingTime}>
            <InputLabel>Giờ mở cửa</InputLabel>
            <Controller
              name="openingTime"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select {...field} label="Giờ mở cửa">
                  <MenuItem value="4">04:00</MenuItem>
                  <MenuItem value="5">05:00</MenuItem>
                  <MenuItem value="6">06:00</MenuItem>
                  <MenuItem value="7">07:00</MenuItem>
                  <MenuItem value="8">08:00</MenuItem>
                </Select>
              )}
            />
            <FormHelperText>{errors.openingTime?.message}</FormHelperText>
          </FormControl>

          <FormControl fullWidth margin="normal" error={!!errors.closingTime}>
            <InputLabel>Giờ đóng cửa</InputLabel>
            <Controller
              name="closingTime"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select {...field} label="Giờ đóng cửa">
                  <MenuItem value="20">20:00</MenuItem>
                  <MenuItem value="21">21:00</MenuItem>
                  <MenuItem value="22">22:00</MenuItem>
                  <MenuItem value="23">23:00</MenuItem>
                </Select>
              )}
            />
            <FormHelperText>{errors.closingTime?.message}</FormHelperText>
          </FormControl>

          <DialogActions>
            <Button onClick={onClose} color="secondary">
              Hủy
            </Button>
            <Button type="submit" color="primary">
              Tạo
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewClubForm;
