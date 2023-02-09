import { getPosts, getUserPosts } from "apis/postApi";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getAllPosts = async () => {
    const res = await getPosts(token);
    dispatch(setPosts({ posts: res.data }));
  };

  const getAllUserPosts = async () => {
    const res = await getUserPosts(userId, token);
    dispatch(setPosts({ posts: res.data }));
  };

  useEffect(() => {
    if (isProfile) {
      getAllUserPosts();
    } else {
      getAllPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {posts.map((post) => (
        <PostWidget
          key={post._id}
          id={post._id}
          user_id={post.user_id}
          name={post.user.name}
          content={post.content}
          location={post.user.location}
          profilePic={post.user.profilePic}
          likes={post.likes}
          comments={post.comment}
          attachments={post.attachments}
        />
      ))}
    </>
  );
};

export default PostsWidget;
