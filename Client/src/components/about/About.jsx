import React, { useContext, useEffect, useState } from "react";
import spin from "../../../public/spin.svg";
import { FaInstagram } from "react-icons/fa";
import { FiFacebook, FiTwitter } from "react-icons/fi";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
import { UserContext } from "../../userContext";
import Comments from "../comment/comment";
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

const About = () => {
  const [postInfo, setPostInfo] = useState(null);
  const { id } = useParams();
  const { userInfo } = useContext(UserContext);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    fetch(`${API_ENDPOINT}/post/${id}`)
      .then((response) => response.json())
      .then((data) => {
        const currentUserHasLiked = data.likes.some(
          (like) => like.toString() === userInfo.id
        );
        setLiked(currentUserHasLiked);
        setLikes(data.likes.length);
        console.log(data);
      });
  }, [id]);

  useEffect(() => {
    fetch(`${API_ENDPOINT}/post/${id}`).then((res) =>
      res.json().then((posts) => setPostInfo(posts))
    );
  }, []);

  async function toggleLikeStatus() {
    if (userInfo.id) {
      const response = await fetch(`${API_ENDPOINT}/post/${id}/like`, {
        method: "PATCH",
        credentials: "include",
      });

      const data = await response.json();
      setLiked(!liked ? true : false);
      setLikes(data.likes.length);
    } else alert("Login first!");
  }

  return (
    <div>
      {postInfo ? (
        <div className="container w-[90%] md:w-[70%] lg:w-[50%]  mx-auto">
          <div
            key={postInfo._id}
            className="flex flex-col  justify-center mt-8"
          >
            <div className="flex flex-col  justify-center ">
              <h2
                className=" text-[35px]  font-extrabold  text-[#000] tracking-wide"
                dir="auto"
              >
                {postInfo.title}
              </h2>
              <p className="text-[20px] text-[#929191] mt-3  " dir="auto">
                {postInfo.summary}
              </p>
              <div className="flex items-center mt-5">
                <div className="w-[55px] h-[55px] bg-black rounded-full ">
                  {" "}
                </div>
                <div className="flex flex-col ml-5">
                  <p>{postInfo["writer"]["username"]}</p>
                  <time className="text-[14px] text-[#929191]">
                    {format(new Date(postInfo.createdAt), "MMM d, yyyy")}
                  </time>
                </div>
                {/* <img src="" alt="" /> */}

                {userInfo.id === postInfo.writer._id && (
                  <Link to={`/edit/${postInfo._id}`} className="ml-auto ">
                    <div className="mr-4 w-[30px] h-[20px] px-10 py-4 border rounded-3xl flex justify-center items-center hover:bg-blue-600 hover:text-white hover:border-transparent cursor-pointer">
                      Edit
                    </div>
                  </Link>
                )}
              </div>
            </div>
            <div className="w-[100%] h-[50px] border-y-[2px] mt-8 flex">
              <div
                className="flex items-center mr-8 cursor-pointer"
                onClick={toggleLikeStatus}
              >
                {liked ? <AiFillLike /> : <AiOutlineLike />}

                <p className="ml-2"> {likes}</p>
              </div>
              <div className="flex items-center mr-8">
                <FaRegComment className="cursor-pointer" />
                <p className="ml-2">{postInfo.comments.length}</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div>
                <img
                  className="w-[350px] h-[200px] object-cover md:w-[700px] md:h-[450px] rounded-[20px] mt-14"
                  src={`${API_ENDPOINT}/${postInfo.cover}`}
                  alt=""
                />
              </div>

              <p
                dangerouslySetInnerHTML={{ __html: postInfo.content }}
                className="text-[16px] text-[#929191] mt-5  lg:text-start  w-[100%] lg:w-[680px]"
                dir="auto"
              ></p>

              <span className="text-[#929191] text-[25px]">,,,,,</span>
            </div>
          </div>
          <div className="flex gap-5 justify-center items-center mt-10">
            <FaInstagram size={22} color="" />
            <FiFacebook size={22} color="" />
            <FiTwitter size={22} color="" />
          </div>
          <div className="mt-20">
            <Comments postInfo={postInfo} userInfo={userInfo} />
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-[500px]">
          <img src={spin} alt="spin Logo" className="w-[80px]" />
        </div>
      )}
    </div>
  );
};

export default About;
