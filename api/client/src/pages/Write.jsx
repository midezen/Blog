import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { axiosInstance } from "../config";

const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state ? state.desc : "");
  const [file, setFile] = useState("");
  const [cat, setCat] = useState(state ? state.cat : "");
  const [title, setTitle] = useState(state ? state.title : "");
  const navigate = useNavigate();

  const handleEditorChange = (content) => {
    setValue(content);
  };

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axiosInstance.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const imgUrl = await upload();
    try {
      const res = state
        ? await axiosInstance.put(`/posts/${state.id}`, {
            title,
            desc: value,
            postImg: file ? imgUrl : state.postImg,
            cat,
          })
        : await axiosInstance.post("/posts/create", {
            title,
            desc: value,
            postImg: file ? imgUrl : "",
            cat,
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
      state ? navigate(`/post/${state.id}`) : navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={handleEditorChange}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status:</b>Draft
          </span>
          <span>
            <b>visibility:</b>Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            name=""
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="file" htmlFor="file">
            Upload
          </label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleClick}>
              {state ? "Update" : "Publish"}
            </button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="art"
              id="art"
              checked={cat === "art"}
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="art">ART</label>
          </div>

          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="science"
              id="science"
              onChange={(e) => setCat(e.target.value)}
              checked={cat === "science"}
            />
            <label htmlFor="science">SCIENCE</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="technology"
              id="technology"
              onChange={(e) => setCat(e.target.value)}
              checked={cat === "technology"}
            />
            <label htmlFor="technology">TECHNOLOGY</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="cinema"
              id="cinema"
              onChange={(e) => setCat(e.target.value)}
              checked={cat === "cinema"}
            />
            <label htmlFor="cinema">CINEMA</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="design"
              id="design"
              onChange={(e) => setCat(e.target.value)}
              checked={cat === "design"}
            />
            <label htmlFor="design">DESIGN</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="food"
              id="food"
              onChange={(e) => setCat(e.target.value)}
              checked={cat === "food"}
            />
            <label htmlFor="food">FOOD</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
