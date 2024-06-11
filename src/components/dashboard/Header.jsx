import React from "react";
import {
  Typography,
  Box,
  Button,
  useTheme,
  Breadcrumbs,
  Link,
} from "@mui/material";
import { tokens } from "../../theme";
import { useLocation, Link as RouterLink } from "react-router-dom";

const Header = ({ title, subtitle, buttonText, onButtonClick }) => {
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
    <Box mb="30px">
      {Breadcrumb()}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography
            variant="h5"
            color={colors.grey[100]}
            fontWeight="bold"
            sx={{ mb: "5px" }}
          >
            {title}
          </Typography>
          <Typography variant="h8" color={colors.greenAccent[400]}>
            {subtitle}
          </Typography>
        </Box>
        {buttonText && onButtonClick && (
          <Button
            variant="contained"
            color="primary"
            onClick={onButtonClick}
            sx={{
              backgroundColor: colors.greenAccent[600],
              color: colors.grey[100],
              "&:hover": {
                backgroundColor: colors.greenAccent[800],
              },
            }}
          >
            {buttonText}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Header;
