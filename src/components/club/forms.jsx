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
import { Upload, Image } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import api from "../../config/axios";

const schema = yup.object().shape({
  clubName: yup.string().required("Name is required"),
  clubAddress: yup.string().required("Specific address is required"),
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
  city: yup.string().required("City/Province is required"),
  district: yup.string().required("District is required"),
});

const Forms = ({ open, onClose, onSubmit, fetFunction, mode, clubid }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [province, setProvince] = useState("");
  const [districts, setDistricts] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    if (mode === "update" && clubid) {
      //viet cu phap update du lieu tu DB len
    }
  }, [mode, clubid]);

  const handleProvinceChange = (event) => {
    setProvince(event.target.value);
    setDistricts(["District 1", "District 2", "District 3"]);
  };

  const handleFormSubmit = async (data) => {
    const adjustedData = {
      ...data,
      openingTime: parseInt(data.openingTime, 10),
      closingTime: parseInt(data.closingTime, 10),
      urlImages: fileList.map((file) =>
        file.response ? file.response.url : file.url
      ),
    };

    try {
      if (mode === "create") {
        await api.post("/club", adjustedData);
      } else if (mode === "update") {
        // cu phap cho submit cho update
      }
      onSubmit(adjustedData);
      fetFunction();
    } catch (error) {
      console.error("Error submitting form: ", error);
    }
  };

  const handleChange = ({ fileList }) => setFileList(fileList);

  const handlePreview = async (file) => {
    setPreviewImage(file.url || file.thumbUrl);
    setPreviewOpen(true);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {mode === "create" ? "Tạo mới Club" : "Cập nhật Club"}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <FormControl fullWidth margin="normal" error={!!errors.clubName}>
            <TextField
              label="Name "
              {...control.register("clubName")}
              error={!!errors.clubName}
              helperText={errors.clubName?.message}
            />
          </FormControl>

          <FormControl
            fullWidth
            margin="normal"
            error={!!errors.clubDescription}
          >
            <TextField
              label="Description "
              {...control.register("clubDescription")}
              multiline
              rows={4}
              error={!!errors.clubDescription}
              helperText={errors.clubDescription?.message}
            />
          </FormControl>

          <FormControl fullWidth margin="normal" error={!!errors.clubHotLine}>
            <TextField
              label="Hotline "
              {...control.register("clubHotLine")}
              error={!!errors.clubHotLine}
              helperText={errors.clubHotLine?.message}
            />
          </FormControl>

          <FormControl fullWidth margin="normal" error={!!errors.capacity}>
            <InputLabel>Số lượng sân </InputLabel>
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
            <InputLabel>Giờ mở cửa </InputLabel>
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
            <InputLabel>Giờ đóng cửa </InputLabel>
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

          <FormControl fullWidth margin="normal" error={!!errors.city}>
            <InputLabel>City/Province </InputLabel>
            <Controller
              name="city"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  {...field}
                  label="City/Province"
                  onChange={handleProvinceChange}
                >
                  <MenuItem value="Hanoi">Hanoi</MenuItem>
                  <MenuItem value="HCMC">Ho Chi Minh City</MenuItem>
                  <MenuItem value="Danang">Danang</MenuItem>
                </Select>
              )}
            />
            <FormHelperText>{errors.city?.message}</FormHelperText>
          </FormControl>

          <FormControl fullWidth margin="normal" error={!!errors.district}>
            <InputLabel>District </InputLabel>
            <Controller
              name="district"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select {...field} label="District">
                  {districts.map((district, index) => (
                    <MenuItem key={index} value={district}>
                      {district}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            <FormHelperText>{errors.district?.message}</FormHelperText>
          </FormControl>

          <FormControl fullWidth margin="normal" error={!!errors.clubAddress}>
            <TextField
              label="Specific address "
              {...control.register("clubAddress")}
              error={!!errors.clubAddress}
              helperText={errors.clubAddress?.message}
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
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
    </Dialog>
  );
};

export default Forms;
