import axios from "axios";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../allContexts/userContext";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import editIcon from "../img/edit.png";
import DeleteIcon from "../img/delete.png";

const Comments = ({ item }) => {
  const { currentUser } = useContext(UserContext);
  const [commentInput, setCommentInput] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentsLength, setCommentsLength] = useState("");
  const [commentId, setCommentId] = useState(null);
  const [commentBool, setCommentBool] = useState(false);

  const getComments = async () => {
    try {
      const res = await axios.get(`/comments/?_id=${item.id}`);
      setComments(res.data);
      setCommentsLength(res.data.length);
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
        ? await axios.post("/comments/create", {
            desc: commentInput ? commentInput : null,
            uid: currentUser.id,
            postid: item.id,
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          })
        : await axios.put(`/comments/${commentId}`, {
            desc: commentInput ? commentInput : null,
          });
      console.log("it works");
    } catch (err) {
      console.log(err);
    }
    setCommentInput("");
    setCommentBool(false);
    getComments();
  };

  return (
    <div className="comments">
      <div className="likeComment">
        <div className="item">
          <ThumbUpAltOutlinedIcon />
          <span>291 Likes</span>
        </div>
        <div className="item">
          <MessageOutlinedIcon />
          <span>{commentsLength} Comments</span>
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
                    <img src={DeleteIcon} alt="" />
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
