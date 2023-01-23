import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./form";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreen = useMediaQuery("(minn-width: 1000px)");
  const background = theme.palette.background.alt;

  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={background}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          StartSocial
        </Typography>
      </Box>
      <Box
        width={isNonMobileScreen ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={background}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to StartSocial! A Social Media for Startups
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};
export default LoginPage;
