import { Box, Typography, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { getUserFriend } from "apis/userApi";
import { BASE_URL } from "utils/default";

import { setFriends } from "state";

const FriendListWidget = ({ userID }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friend);

  const getFriends = async () => {
    const response = await getUserFriend(userID, token);
    dispatch(setFriends({ friend: response.data.friend }));
  };

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{
          mb: "1.5rem",
        }}
      >
        Friend list
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends?.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={friend.name}
            userPicture={
              friend.profilePic
                ? `${BASE_URL}/${friend.profilePic}`
                : `../assets/blank_profile.webp`
            }
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
