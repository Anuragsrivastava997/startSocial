import { Box } from "@mui/material";

const UserImage = ({ username, image, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt={username}
        src={image}
      />
    </Box>
  );
};

export default UserImage;
