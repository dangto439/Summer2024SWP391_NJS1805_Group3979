import React from "react";
import { Typography, Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";

const Header = ({ title, subtitle, buttonText, onButtonClick }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb="30px"
    >
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
  );
};

export default Header;
