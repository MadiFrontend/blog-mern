import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};
const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [summery, setSummery] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  const createNewPost = async (ev) => {
    const data = new FormData();
    data.set("title", title);
    data.set("summery", summery);
    data.set("content", content);
    data.set("file", files[0]);
    ev.preventDefault();
    const response = await fetch("http://localhost:3001/post", {
      method: "POST",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className=" flex flex-col justify-center items-center ">
      <div className="w-[80%]">
        <div className="flex my-5">
          <button onClick={() => navigate(-1)}>
            <BiArrowBack  size={24} color="#a7a7a7"/>
          </button>
          <h1 className="text-blue-600 font-extrabold text-[30px] ml-4 ">
            Create a New Blog
          </h1>
        </div>
        <form className="flex flex-col" onSubmit={createNewPost}>
          <input
            type="text"
            placeholder="title ..."
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
            className="border my-2 px-2 py-1"
          />
          <input
            type="text"
            placeholder="summery ..."
            value={summery}
            onChange={(ev) => setSummery(ev.target.value)}
            className="border my-2 px-2 py-1"
          />
          <input
            type="file"
            onChange={(ev) => setFiles(ev.target.files)}
            className="border my-2 px-2 py-1"
          />
          <ReactQuill
            value={content}
            onChange={(newValue) => setContent(newValue)}
            modules={modules}
            formats={formats}
          />

          <button
            className="border my-2 px-2 py-1 bg-[#eee] disabled:text-white"
            type="submit"
            disabled={summery && title ? false : true}
          >
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateBlog;
