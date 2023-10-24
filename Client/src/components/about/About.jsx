import React, { useEffect, useState } from "react";
import { AboutBlog } from "../../data/AboutBlog";
import { FaInstagram } from "react-icons/fa";
import { FiFacebook, FiTwitter } from "react-icons/fi";
import { useParams } from "react-router-dom";

const About = () => {
  //   const [poster, setPoster] = useState({});
  const [postInfo, setPosts] = useState({});
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:3001/post/${id}`).then((res) =>
      res.json().then((posts) => setPosts(posts))
    );
  }, []);

  //   if (postInfo) {
  //     return "";
  //   }
  return (
    <div className="container mx-auto" dir="rtl">
      <div
        key={postInfo._id}
        className="flex flex-col items-center justify-center mt-20"
      >
        <img
          className="w-[350px] h-[200px] md:w-[600px] md:h-[300px] rounded-[20px]"
          src={"http://localhost:3001/" + postInfo.cover}
          alt=""
        />
        <h2 className="text-[24px] font-extrabold text-center lg:mr-12 text-[#000] mt-10">
          {postInfo.title}
        </h2>
        <p className="text-[16px] text-[#929191] mt-3 text-center lg:text-start  w-[380px] lg:w-[600px]">
          {postInfo.summery}
        </p>
        <p
          dangerouslySetInnerHTML={{ __html: postInfo.content }}
          className="text-[16px] text-[#929191] mt-3 text-center lg:text-start  w-[380px] lg:w-[600px]"
        ></p>
        <span className="text-[#929191] text-[25px]">,,,,,</span>
      </div>

      <div className="flex gap-5 justify-center items-center mt-10">
        <FaInstagram size={22} color="" />
        <FiFacebook size={22} color="" />
        <FiTwitter size={22} color="" />
      </div>
    </div>
  );
};

export default About;
