import { Search } from "@mui/icons-material";
import {
  Box,
  Breadcrumbs,
  Button,
  IconButton,
  InputBase,
  Link,
  useTheme,
} from "@mui/material";
import { useLocation, Link as RouterLink } from "react-router-dom";
import { tokens } from "../../theme";
import SearchIcon from "@mui/icons-material/Search";

const Contest = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();

  const Breadcrumb = () => {
    const pathnames = location.pathname.split("/").filter((x) => x);
    return (
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: "20px" }}>
        <Link component={RouterLink} to="/" color="inherit">
          Home
        </Link>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          return (
            <Link
              key={to}
              component={RouterLink}
              to={to}
              color="inherit"
              sx={{ textTransform: "capitalize" }}
            >
              {value}
            </Link>
          );
        })}
      </Breadcrumbs>
    );
  };

  return (
    <Box p={3} ml={3}>
      {Breadcrumb()}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={5}
      >
        <Box
          display="flex"
          backgroundColor={colors.greenAccent[900]}
          borderRadius="3px"
        >
          <InputBase
            sx={{ ml: 2, flex: 1, width: "300px" }}
            placeholder="Search"
          />
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton>
        </Box>

        <Box
          display="flex"
          backgroundColor={colors.greenAccent[900]}
          color={colors.grey[100]}
          borderRadius="3px"
        >
          <Button>Danh sách</Button>
          <Button>Ngày</Button>
          <Button>Tháng</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Contest;
