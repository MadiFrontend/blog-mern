import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import spin from "../../../public/spin.svg";
import { LuCalendarDays } from "react-icons/lu";
import { GrFormView } from "react-icons/gr";
import { format } from "date-fns";
const Card = () => {
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    fetch("http://localhost:3001/post").then((res) =>
      res.json().then((posts) => setPosts(posts))
    );
  }, []);

  return (
    <div className="container  mx-auto">
      {posts ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:justify-items-center gap-10 mt-16  ">
          {posts.length > 0 &&
            posts.map((data) => {
              return (
                <div
                  key={data._id}
                  className="w-[300px] h-[450px] lg:flex lg:text-start flex flex-col justify-between items-center text-center "
                >
                  <Link to={`post/${data._id}`}>
                    <img
                      className="w-[300px] h-[200px]  rounded-[20px]"
                      src={"http://localhost:3001/" + data.cover}
                      alt=""
                    />
                    <h2
                      className="text-[24px] font-bold w-[100%] mt-4"
                      dir="auto"
                    >
                      {data.title}
                    </h2>
                  </Link>

                  <p
                    className="text-[#929191] text-[14px] w-[100%] h-[15%] mt-4"
                    dir="auto"
                  >
                    {data.summery}
                  </p>
                  <div className="border border-t-1 w-[80%] mt-3"></div>
                  <div className="flex w-[80%]  items-center justify-between mt-4 ">
                    <div className="flex">
                      <LuCalendarDays size={20} />
                      <time className="ml-2 text-[14px] text-[#929191]">
                        {format(new Date(data.createdAt), "MMM d, yyyy")}
                      </time>
                    </div>
                    <div className="flex">
                      <GrFormView size={28} />
                      <span className="mt-1 text-[14px] text-[#929191]"></span>
                      <p>{data["writer"]["username"]}</p>
                    </div>
                  </div>
                  <div className="mt-5">
                    <Link to={`post/${data._id}`} className="text-[14px]">
                      <button className="w-[310px] h-[40px]  border-[2px] rounded-[20px] hover:bg-[#00a3ff] hover:text-[#fff]">
                        Read More
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <div className="flex justify-center items-center mt-16">
          {/* <p> Loading data, Wait a Moment Please ...</p> */}
          <img src={spin} alt="spin Logo" className="w-[80px]" />
        </div>
      )}
    </div>
  );
};

export default Card;
