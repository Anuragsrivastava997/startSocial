import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
} from "@mui/material";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import UserImage from "components/UserImage";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import { createPost } from "apis/postApi";
import { BASE_URL } from "utils/default";

function MyPostWidget({ picture }) {
  const [isFile, setIsFile] = useState(false);
  const [file, setFile] = useState(null);
  const [post, setPost] = useState("");

  const dispatch = useDispatch();
  const { palette } = useTheme();
  const { _id, profilePic } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const handlePost = async () => {
    const formData = new FormData();

    formData.append("user_id", _id);
    formData.append("content", post);
    if (file) {
      formData.append("attachments", file);
    }

    const response = await createPost(formData, token);

    if (response.status === 201) {
      toast.success(response.data.msg, {
        position: "top-right",
        autoClose: 5000,
      });
    } else {
      toast.error(response.data.msg, {
        position: "top-right",
        autoClose: 5000,
      });
    }
    dispatch(setPosts({ posts: response.data.data }));

    setFile(null);
    setPost("");
  };

  return (
    <WidgetWrapper>
      <ToastContainer />
      <FlexBetween gap="1rem">
        <UserImage image={`${BASE_URL}/${profilePic}`} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>
      {isFile && (
        <Box
          borderRadius="5px"
          border={`1px solid ${medium}`}
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png,.mp4,.mov,.mp3,.gif"
            multiple={false}
            onDrop={(acceptedFiles) => setFile(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`1px solid ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "& :hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!file ? (
                    <p>
                      Drag 'n' drop some files here, or click to select file
                    </p>
                  ) : (
                    <FlexBetween>
                      <Typography>{file.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {file && (
                  <IconButton
                    onClick={() => setIsFile(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsFile(!isFile)}>
          <AttachFileOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Attachment
          </Typography>
        </FlexBetween>

        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          Post
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
}

export default MyPostWidget;
