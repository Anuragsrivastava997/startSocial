import {
  PersonAddOutlined,
  PersonRemoveOutlined,
  DeleteForeverOutlined,
} from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { addOrRemoveFriend, getUserFriend } from "apis/userApi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

function Friend({ friendId, name, subtitle, userPicture }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = friends?.some((friend) => friend._id === friendId);
  const loggedInUserId = useSelector((state) => state.user._id);

  const addfriend = async () => {
    const body = {
      _id: _id,
      friendId: friendId,
    };
    await addOrRemoveFriend(body, token);
    const getFriends = await getUserFriend(_id, token);
    dispatch(setFriends({ friends: getFriends.data }));
  };

  console.log(friendId, loggedInUserId, "user");

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicture} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="bold"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      <FlexBetween>
        {friendId === loggedInUserId && (
          <DeleteForeverOutlined
            sx={{
              marginLeft: "0.5rem",
              "&:hover": {
                cursor: "pointer",
              },
            }}
          />
        )}
        <IconButton
          onClick={addfriend}
          sx={{
            backgroundColor: primaryLight,
            p: "0.6rem",
          }}
        >
          {isFriend ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>
      </FlexBetween>
    </FlexBetween>
  );
}

export default Friend;
