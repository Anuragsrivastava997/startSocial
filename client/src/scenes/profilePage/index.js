import { Box, useMediaQuery } from "@mui/material";
import { getUser } from "apis/userApi";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import NavBar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/FriendlistWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";
import { BASE_URL } from "utils/default";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();

  const token = useSelector((state) => state.token);
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");

  const getUserData = async () => {
    const response = await getUser(userId, token);
    setUser(response.data);
  };

  useEffect(() => {
    getUserData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <div>
      <NavBar />

      {/* User Section */}
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreen ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreen ? "26%" : undefined}>
          <UserWidget userId={userId} picturePath={user.profilePic} />
        </Box>

        {/* Main Feed */}
        <Box
          flexBasis={isNonMobileScreen ? "42%" : undefined}
          mt={isNonMobileScreen ? undefined : "2rem"}
        >
          <MyPostWidget
            picture={
              user.profilePic
                ? `${BASE_URL}/${user.profilePic}`
                : `../assets/blank_profile.webp`
            }
          />
          <Box m="2rem 0" />
          <PostsWidget userId={userId} isProfile />
        </Box>
      </Box>
    </div>
  );
};
export default ProfilePage;
