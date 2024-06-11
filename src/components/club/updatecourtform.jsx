import { useState } from "react";
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

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  address: yup.string().required("Address is required"),
  hotline: yup.string().required("Hotline is required"),
  numCourts: yup.number().required("Number of courts is required").min(1),
  openTime: yup.string().required("Open time is required"),
  closeTime: yup
    .string()
    .required("Close time is required")
    .test("is-greater", "Close time must be after open time", function (value) {
      const { openTime } = this.parent;
      return value > openTime;
    }),
});

const UpdateCourtForm = ({ open, onClose, onSubmit }) => {
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

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Cập nhật sân</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <FormControl fullWidth margin="normal" error={!!errors.name}>
            <TextField
              label="Name"
              {...control.register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <TextField
              label="Description"
              {...control.register("description")}
            />
          </FormControl>

          <FormControl fullWidth margin="normal" error={!!errors.address}>
            <TextField
              label="Address"
              {...control.register("address")}
              error={!!errors.address}
              helperText={errors.address?.message}
            />
          </FormControl>

          <FormControl fullWidth margin="normal" error={!!errors.hotline}>
            <TextField
              label="Hotline"
              {...control.register("hotline")}
              error={!!errors.hotline}
              helperText={errors.hotline?.message}
            />
          </FormControl>

          <FormControl fullWidth margin="normal" error={!!errors.numCourts}>
            <InputLabel>Số lượng sân</InputLabel>
            <Controller
              name="numCourts"
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
            <FormHelperText>{errors.numCourts?.message}</FormHelperText>
          </FormControl>

          <FormControl fullWidth margin="normal" error={!!errors.openTime}>
            <InputLabel>Giờ mở cửa</InputLabel>
            <Controller
              name="openTime"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select {...field} label="Giờ mở cửa">
                  <MenuItem value="06:00">06:00</MenuItem>
                  <MenuItem value="07:00">07:00</MenuItem>
                  <MenuItem value="08:00">08:00</MenuItem>
                </Select>
              )}
            />
            <FormHelperText>{errors.openTime?.message}</FormHelperText>
          </FormControl>

          <FormControl fullWidth margin="normal" error={!!errors.closeTime}>
            <InputLabel>Giờ đóng cửa</InputLabel>
            <Controller
              name="closeTime"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select {...field} label="Giờ đóng cửa">
                  <MenuItem value="18:00">18:00</MenuItem>
                  <MenuItem value="19:00">19:00</MenuItem>
                  <MenuItem value="20:00">20:00</MenuItem>
                </Select>
              )}
            />
            <FormHelperText>{errors.closeTime?.message}</FormHelperText>
          </FormControl>

          <DialogActions>
            <Button onClick={onClose} color="secondary">
              Hủy
            </Button>
            <Button type="submit" color="primary">
              Cập nhật
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCourtForm;
