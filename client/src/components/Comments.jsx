import { useContext, useState } from "react";
import { UserContext } from "../allContexts/userContext";

const Comments = ({ item }) => {
  const { currentUser } = useContext(UserContext);
  const [commentInput, setCommentInput] = useState("");
  return (
    <div className="comments">
      <div className="createComment">
        <img
          src={process.env.PUBLIC_URL + `/profilePic/${currentUser.img}`}
          alt=""
        />
        <div className="input">
          <input
            type="text"
            placeholder="Write a Comment"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
          />
          <span>Press Enter to post comment</span>
        </div>
        <button type="submit">submit</button>
      </div>
      <div className="allComments">
        <div className="aComment">
          <img src="" alt="" />
          <div className="desc">
            <span>username</span>
            <p>This is the comment</p>
          </div>
          <span>1 day ago</span>
        </div>
      </div>
    </div>
  );
};

export default Comments;
