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
import { useEffect } from "react";

const schema = yup.object().shape({
  clubId: yup.string().required("Club ID is required"),
  name: yup.string().required("Name is required"),
  numCourts: yup.number().required("Number of courts is required").min(1),
});

const Forms = ({ open, onClose, onSubmit, fetFunction, mode, courtId }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (mode === "update" && courtId) {
      //viet cu phap update du lieu tu DB len
    }
  }, [mode, courtId]);

  const handleFormSubmit = async (data) => {
    const adjustedData = {
      // ...data,
      // openingTime: parseInt(data.openingTime, 10),
      // closingTime: parseInt(data.closingTime, 10),
      // urlImages: ["none image"],
    };

    try {
      if (mode === "create") {
        //cu phap cho submit cho create
        // await api.post("/club", adjustedData);
      } else if (mode === "update") {
        // cu phap cho submit cho update
      }
      onSubmit(adjustedData);
      fetFunction();
    } catch (error) {
      console.error("Error submitting form: ", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {mode === "create" ? "Tạo mới sân" : "Cập nhật sân"}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <FormControl fullWidth margin="normal" error={!!errors.clubId}>
            <InputLabel>Mã Club</InputLabel>
            <Controller
              name="clubId"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select {...field} label="Club ID">
                  <MenuItem value="ClubID1">ClubID1</MenuItem>
                  <MenuItem value="ClubID2">ClubID2</MenuItem>
                  <MenuItem value="ClubID3">ClubID3</MenuItem>
                </Select>
              )}
            />
            <FormHelperText>{errors.clubId?.message}</FormHelperText>
          </FormControl>

          <FormControl fullWidth margin="normal" error={!!errors.name}>
            <TextField
              label="Name"
              {...control.register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
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

          <DialogActions>
            <Button onClick={onClose} color="secondary">
              Hủy
            </Button>
            <Button type="submit" color="primary">
              {mode === "create" ? "Tạo" : "Cập nhật"}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Forms;
