import {
  PersonAddOutlined,
  PersonRemoveOutlined,
  DeleteForeverOutlined,
} from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { deletePost } from "apis/postApi";
import { addOrRemoveFriend } from "apis/userApi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setFriends, setPosts } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Friend({ friendId, name, subtitle, userPicture, post_id }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friend);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = friends?.some((friend) => friend._id === friendId);
  const loggedInUserId = useSelector((state) => state.user._id);

  const addfriend = async () => {
    const body = {
      user_id: _id,
      friend_id: friendId,
    };
    const getFriends = await addOrRemoveFriend(body, token);
    dispatch(setFriends({ friend: getFriends.data.friend }));
  };

  const handleDeletePost = async () => {
    const response = await deletePost(post_id, token);
    console.log(response, "response");
    if (response.status === 200) {
      toast.success(response.data.msg, {
        position: "top-right",
        autoClose: 5000,
      });
      dispatch(setPosts({ posts: response.data.data }));
    } else {
      toast.error(response.data.msg, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <ToastContainer />
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
          <IconButton
            onClick={handleDeletePost}
            sx={{
              backgroundColor: primaryLight,
              p: "0.6rem",
            }}
          >
            <DeleteForeverOutlined
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            />
          </IconButton>
        )}
        {friendId !== loggedInUserId && (
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
        )}
      </FlexBetween>
    </FlexBetween>
  );
}

export default Friend;
