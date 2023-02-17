import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation } from "react-router-dom";

const Write = () => {
  const [value, setValue] = useState("");
  const [file, setFile] = useState("");
  const [cat, setCat] = useState("");
  const [title, setTitle] = useState("");

  const state = useLocation().state;
  console.log(state);

  return (
    <div className="add">
      <div className="content">
        <input type="text" placeholder="Title" onChange={() => setValue()} />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
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
          <input style={{ display: "none" }} type="file" name="" id="file" />
          <label className="file" htmlFor="file">
            Upload
          </label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button>Update</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input type="radio" name="cat" value="art" id="art" />
            <label htmlFor="art">ART</label>
          </div>

          <div className="cat">
            <input type="radio" name="cat" value="science" id="science" />
            <label htmlFor="science">SCIENCE</label>
          </div>
          <div className="cat">
            <input type="radio" name="cat" value="technology" id="technology" />
            <label htmlFor="technology">TECHNOLOGY</label>
          </div>
          <div className="cat">
            <input type="radio" name="cat" value="cinema" id="cinema" />
            <label htmlFor="cinema">CINEMA</label>
          </div>
          <div className="cat">
            <input type="radio" name="cat" value="design" id="design" />
            <label htmlFor="design">DESIGN</label>
          </div>
          <div className="cat">
            <input type="radio" name="cat" value="food" id="food" />
            <label htmlFor="food">FOOD</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
