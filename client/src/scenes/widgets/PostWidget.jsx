import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
  ReplyOutlined,
  DeleteForeverOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  Modal,
  Typography,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BASE_URL } from "utils/default";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { setPost } from "state";
import { addComment, deleteComment, handleLikeApi } from "apis/postApi";

function PostWidget({
  id,
  user_id,
  postUserId,
  name,
  content,
  location,
  profilePic,
  attachments,
  likes,
  comments,
}) {
  const [isComments, setIsComments] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const [reply, setReply] = useState("");
  const [commentId, setCommentId] = useState(null);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleReplyModel = (replyId) => {
    setIsReply(!isReply);
    setCommentId(replyId);
  };

  const handleReplyApi = async () => {
    const data = {
      post_id: commentId,
      user_id: loggedInUserId,
      content: reply,
      type: "reply",
      post_type: "comment",
    };

    const response = await addComment(data, token);
    if (response.status === 201) {
      toast.success(response.data.msg, {
        position: "top-right",
        autoClose: 5000,
      });
      dispatch(setPost({ post: response.data.data[0] }));
    } else {
      toast.error(response.data.msg, {
        position: "top-right",
        autoClose: 5000,
      });
    }

    setIsReply(!isReply);
    setReply("");
  };

  const handleCommentApi = async () => {
    const data = {
      post_id: id,
      user_id: loggedInUserId,
      content: comment,
      type: "comment",
      post_type: "post",
    };

    const response = await addComment(data, token);
    if (response.status === 201) {
      toast.success(response.data.msg, {
        position: "top-right",
        autoClose: 5000,
      });
      dispatch(setPost({ post: response.data.data[0] }));
    } else {
      toast.error(response.data.msg, {
        position: "top-right",
        autoClose: 5000,
      });
    }

    setComment("");
  };

  const deleteCommentApi = async (commentID) => {
    const data = {
      user_id: loggedInUserId,
    };

    const response = await deleteComment(commentID, data, token);
    if (response.status === 200) {
      toast.success(response.data.msg, {
        position: "top-right",
        autoClose: 5000,
      });
      dispatch(setPost({ post: response.data.data[0] }));
    } else {
      toast.error(response.data.msg, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  const handleLike = async () => {
    const update = {
      user_id: loggedInUserId,
    };
    const response = await handleLikeApi(id, update, token);
    if (response.status === 200) {
      toast.success(response.data.msg, {
        position: "top-right",
        autoClose: 5000,
      });
      dispatch(setPost({ post: response.data.data[0] }));
    } else {
      toast.error(response.data.msg, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };
  return (
    <WidgetWrapper m="2rem 0">
      <ToastContainer />
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicture={`${BASE_URL}/${profilePic}`}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {content}
      </Typography>
      {attachments && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`${BASE_URL}/${attachments}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={handleLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>
          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
              <Typography ml="0.5rem">{comments?.length}</Typography>
            </IconButton>
          </FlexBetween>
        </FlexBetween>
        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          <FlexBetween gap="1rem">
            <InputBase
              placeholder="Comment your thoughts"
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              sx={{
                width: "100%",
                backgroundColor: palette.neutral.light,
                borderRadius: "2rem",
                padding: "0.5rem 2rem",
                margin: "1rem 0",
              }}
            />
            <Button
              disabled={!isComments}
              onClick={handleCommentApi}
              sx={{
                color: palette.background.alt,
                backgroundColor: palette.primary.main,
                borderRadius: "3rem",
              }}
            >
              Comment
            </Button>
          </FlexBetween>
          {comments.map((comment) => (
            <Box key={comment._id}>
              <Divider />
              <FlexBetween>
                <Typography
                  sx={{
                    color: main,
                    m: "0.5rem 0",
                    pl: "1rem",
                  }}
                >
                  {comment.content}
                </Typography>
                <FlexBetween>
                  <Typography
                    onClick={() => handleReplyModel(comment._id)}
                    sx={{
                      "&:hover": {
                        cursor: "pointer",
                      },
                    }}
                  >
                    Reply
                  </Typography>
                  <DeleteForeverOutlined
                    sx={{
                      marginLeft: "0.5rem",
                      "&:hover": {
                        cursor: "pointer",
                      },
                    }}
                    onClick={() => deleteCommentApi(comment._id)}
                  />
                </FlexBetween>
              </FlexBetween>
              <Divider />
              {comment?.replies?.map((reply) => (
                <>
                  <FlexBetween ml="5rem">
                    <FlexBetween>
                      <ReplyOutlined />
                      <Typography
                        sx={{
                          color: main,
                          m: "0.5rem 0",
                          pl: "1rem",
                        }}
                      >
                        {reply.content}
                      </Typography>
                    </FlexBetween>
                    <DeleteForeverOutlined
                      sx={{
                        marginLeft: "0.5rem",
                        "&:hover": {
                          cursor: "pointer",
                        },
                      }}
                      onClick={() => deleteCommentApi(reply._id)}
                    />
                  </FlexBetween>
                  <Divider />
                </>
              ))}
            </Box>
          ))}
        </Box>
      )}
      {isReply && (
        <Modal
          open={isReply}
          onClose={() => setIsReply(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <FlexBetween>
            <Box sx={style}>
              <Typography
                sx={{
                  textAlign: "center",
                }}
              >
                Reply
              </Typography>
              <FlexBetween gap="2rem">
                <InputBase
                  placeholder="Reply your thoughts"
                  onChange={(e) => setReply(e.target.value)}
                  value={reply}
                  sx={{
                    width: "100%",
                    backgroundColor: palette.neutral.light,
                    borderRadius: "2rem",
                    padding: "1rem 2rem",
                    margin: "1rem 0",
                  }}
                />
                <Button
                  disabled={!isReply}
                  onClick={handleReplyApi}
                  sx={{
                    color: palette.background.alt,
                    backgroundColor: palette.primary.main,
                    borderRadius: "3rem",
                  }}
                >
                  Post
                </Button>
              </FlexBetween>
            </Box>
          </FlexBetween>
        </Modal>
      )}
    </WidgetWrapper>
  );
}

export default PostWidget;
