import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate, useParams } from "react-router-dom";

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
  const [summery, setSummery] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { id } = useParams();

  // const createNewPost = async (ev) => {
  //   const data = new FormData();
  //   data.set("title", title);
  //   data.set("summery", summery);
  //   data.set("content", content);
  //   data.set("file", files[0]);
  //   ev.preventDefault();
  //   const response = await fetch("http://localhost:3001/post", {
  //     method: "POST",
  //     body: data,
  //     credentials: "include",
  //   });
  //   if (response.ok) {
  //     setRedirect(true);
  //   }
  // };

  useEffect(() => {
    fetch(`http://localhost:3001/post/${id}`).then((res) =>
      res.json().then((posts) => {
        setTitle(posts.title);
        setSummery(posts.summery);
        setContent(posts.content);
      })
    );
  }, []);

  const updatePost = async (ev) => {
    ev.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summery", summery);
    data.set("content", content);
    data.set("id", id);
    if (files?.[0]) {
      data.set("file", files?.[0]);
    }

    const res = await fetch("http://localhost:3001/post", {
      method: "PUT",
      body: data,
      credentials: "include",
    });
    if (res) {
      setRedirect(true);
      console.log("updated")
    }
  };

  if (redirect) {
    return <Navigate to={"/post/" + id} />;
  }

  return (
    <div>
      <h1>My App</h1>
      <form className="flex flex-col" onSubmit={updatePost}>
        <input
          type="text"
          placeholder="title ..."
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          className="border my-2"
        />
        <input
          type="text"
          placeholder="summery ..."
          value={summery}
          onChange={(ev) => setSummery(ev.target.value)}
          className="border my-2"
        />
        <input
          type="file"
          onChange={(ev) => setFiles(ev.target.files)}
          className="border my-2"
        />
        <ReactQuill
          value={content}
          onChange={(newValue) => setContent(newValue)}
          modules={modules}
          formats={formats}
        />
        <button type="submit">Edit Post</button>
      </form>
    </div>
  );
}

export default EditPost;
