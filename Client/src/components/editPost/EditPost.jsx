import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

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

function EditPost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_ENDPOINT}/post/${id}`).then((res) =>
      res.json().then((posts) => {
        setTitle(posts.title);
        setSummary(posts.summary);
        setContent(posts.content);
      })
    );
  }, []);

  const updatePost = async (ev) => {
    ev.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    if (files?.[0]) {
      data.set("file", files?.[0]);
    }

    const res = await fetch(`${API_ENDPOINT}`, {
      method: "PUT",
      body: data,
      credentials: "include",
    });
    if (res) {
      setRedirect(true);
      console.log("updated");
    }
  };

  if (redirect) {
    return <Navigate to={"/post/" + id} />;
  }

  return (
    <div className=" flex flex-col justify-center items-center ">
      <div className="w-[80%]">
        <div className="flex my-5">
          <button onClick={() => navigate(-1)}>
            <BiArrowBack size={24} color="#a7a7a7" />
          </button>
          <h1 className="text-blue-600 font-extrabold text-[30px] ml-4 ">
            Edit Your Post
          </h1>
        </div>

        <form className="flex flex-col" onSubmit={updatePost}>
          <input
            type="text"
            placeholder="title ..."
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
            className="border my-2 px-2 py-1"
          />
          <input
            type="text"
            placeholder="summary ..."
            value={summary}
            onChange={(ev) => setSummary(ev.target.value)}
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

          <button className="border my-2 px-2 py-1 bg-[#eee]" type="submit">
            Edit Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditPost;
