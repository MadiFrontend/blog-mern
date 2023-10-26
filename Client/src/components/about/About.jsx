import React, { useContext, useEffect, useState } from "react";
import spin from "../../../public/spin.svg";
import { FaInstagram } from "react-icons/fa";
import { FiFacebook, FiTwitter } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
import { UserContext } from "../../userContext";

const About = () => {
  const [postInfo, setPostInfo] = useState(null);
  const { id } = useParams();
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    fetch(`http://localhost:3001/post/${id}`).then((res) =>
      res.json().then((posts) => setPostInfo(posts))
    );
  }, []);

  // if (postInfo) {
  //   return "";
  // }
  return (
    <div>
      {postInfo ? (
        <div className="container mx-auto" dir="auto">
          <div
            key={postInfo._id}
            className="flex flex-col items-center justify-center mt-20"
          >
            <div>
              <h2 className="text-[24px] font-extrabold text-center lg:mr-12 text-[#000] mt-10">
              {postInfo.title}
              </h2>

              <time className="ml-2 text-[14px] text-[#929191]">
                {format(new Date(postInfo.createdAt), "MMM d, yyyy")}
              </time>
              <p>{postInfo["writer"]["username"]}</p>
              {userInfo.id === postInfo.writer._id && (
                <div>
                  <Link to={`/edit/${postInfo._id}`}>Edit</Link>
                </div>
              )}
            </div>
            <img
              className="w-[350px] h-[200px] md:w-[600px] md:h-[300px] rounded-[20px]"
              src={"http://localhost:3001/" + postInfo.cover}
              alt=""
            />

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
      ) : (
        <div className="flex justify-center items-center h-[500px]">
          <img src={spin} alt="spin Logo" className="w-[80px]" />
        </div>
      )}
    </div>
  );
};

export default About;
