import { useMediaQuery, Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import NavBar from "scenes/navbar";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";

const HomePage = () => {
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");
  const { _id, profilePic } = useSelector((state) => state.user);

  return (
    <div>
      <NavBar />

      {/* User Section */}
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreen ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreen ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={profilePic} />
        </Box>

        {/* Main Feed */}
        <Box
          flexBasis={isNonMobileScreen ? "42%" : undefined}
          mt={isNonMobileScreen ? undefined : "2rem"}
        >
          <MyPostWidget picture={profilePic} />
          <PostsWidget userId={_id} />
        </Box>

        {/* Advertisement */}
        {isNonMobileScreen && <Box flexBasis="26%"></Box>}
      </Box>
    </div>
  );
};
export default HomePage;
