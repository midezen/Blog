import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../allContexts/userContext";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import editIcon from "../img/edit.png";
import DeleteIcon from "../img/delete.png";
import { axiosInstance } from "../config";

const Comments = ({ item }) => {
  const { currentUser } = useContext(UserContext);
  const [commentInput, setCommentInput] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentId, setCommentId] = useState(null);
  const [commentBool, setCommentBool] = useState(false);
  const [likeBool, setLikeBool] = useState(false);
  const [likes, setLikes] = useState([]);

  const getComments = async () => {
    try {
      const res = await axiosInstance.get(`/comments/?_id=${item.id}`);
      setComments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getComments();
  }, [item.id]);

  const postComment = async (e) => {
    e.preventDefault();
    try {
      !commentBool
        ? await axiosInstance.post("/comments/create", {
            desc: commentInput ? commentInput : null,
            uid: currentUser.id,
            postid: item.id,
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          })
        : await axiosInstance.put(`/comments/${commentId}`, {
            desc: commentInput ? commentInput : null,
          });
    } catch (err) {
      console.log(err);
    }
    setCommentInput("");
    setCommentBool(false);
    getComments();
  };

  const deleteComment = async (prop) => {
    try {
      await axiosInstance.delete(`/comments/${prop}`);
    } catch (err) {
      console.log(err);
    }
    getComments();
  };

  const getLikes = async () => {
    try {
      const res = await axiosInstance.get(`/likes/?id=${item.id}`);
      setLikes(res.data);
    } catch (err) {
      console.log(err);
    }

    likes.length === 0 && setLikeBool(false);
  };

  useEffect(() => {
    getLikes();
  }, [item.id]);

  useEffect(() => {
    likes.find((obj) => {
      obj.uid === currentUser.id && setLikeBool(true);
    });
    likes.length === 0 && setLikeBool(false);
  }, [likes]);

  useEffect(() => {
    getLikes();
  }, []);

  useEffect(() => {
    likes.find((obj) => {
      obj.uid === currentUser.id && setLikeBool(true);
    });
  }, []);

  const handleLike = async () => {
    const check = likes.find((obj) => obj.uid === currentUser.id);
    if (check) {
      setLikeBool(true);
    } else {
      try {
        await axiosInstance.post("/likes/create", {
          postid: item.id,
          uid: currentUser.id,
        });
      } catch (err) {
        console.log(err);
      }
    }

    getLikes();
    setLikeBool(true);
  };

  const handleLikeDelete = async () => {
    const thisObj = likes.find((obj) => obj.uid === currentUser.id);
    if (thisObj) {
      const thisId = thisObj.id;
      try {
        await axiosInstance.delete(`/likes/${thisId}`);
      } catch (err) {
        console.log(err);
      }
    }

    getLikes();
    setLikeBool(false);
  };

  return (
    <div className="comments">
      <div className="likeComment">
        <div className="item">
          {!likeBool ? (
            <div className="items">
              <ThumbUpAltOutlinedIcon
                style={{ cursor: "pointer" }}
                onClick={handleLike}
              />
            </div>
          ) : (
            <ThumbUpAltIcon
              style={{ cursor: "pointer" }}
              onClick={handleLikeDelete}
            />
          )}

          <span>
            {likes.length} {likes.length === 1 ? "Like" : "Likes"}
          </span>
        </div>

        <div className="item">
          <MessageOutlinedIcon />
          <span>
            {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
          </span>
        </div>
      </div>
      <div className="createComment">
        <img
          src={process.env.PUBLIC_URL + `/profilePic/${currentUser.img}`}
          alt=""
        />
        <form onSubmit={postComment}>
          <div className="input">
            <input
              type="text"
              placeholder="Write a Comment"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
            />
            <span>Press Enter to post comment</span>
          </div>
          <button type="Submit" style={{ display: "none" }}>
            submit
          </button>
        </form>
      </div>
      <div className="allComments">
        {comments.map((comment) => {
          return (
            <div className="aComment" key={comment.commentId}>
              <div className="img">
                <img
                  src={process.env.PUBLIC_URL + `/profilePic/${comment.img}`}
                  alt=""
                />
                <div className="desc">
                  <span>{comment.username}</span>
                  <p>{comment.desc}</p>
                </div>
              </div>

              <div className="edge">
                <span>{moment(comment.date).fromNow()}</span>
                {currentUser.username !== comment.username ? (
                  ""
                ) : (
                  <>
                    <img
                      src={editIcon}
                      alt=""
                      onClick={() => {
                        setCommentInput(comment.desc);
                        setCommentId(comment.commentId);
                        setCommentBool(true);
                      }}
                    />
                    <img
                      src={DeleteIcon}
                      alt=""
                      onClick={() => deleteComment(comment.commentId)}
                    />
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comments;
