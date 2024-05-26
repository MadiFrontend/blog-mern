import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LuCalendarDays } from "react-icons/lu";
import { GrFormView } from "react-icons/gr";
import { format } from "date-fns";
const Card = ({ data }) => {
  return (
    <div
      key={data._id}
      className="w-[300px] h-[450px] lg:flex lg:text-start flex flex-col justify-between items-center text-center "
    >
      <Link to={`post/${data._id}`}>
        <img
          className="w-[300px] h-[200px] object-cover  rounded-[20px]"
          src={"http://localhost:3001/" + data.cover}
          alt="post-image"
        />
      </Link>
      <div className="w-[100%] h-[50%]">
        <h2
          className="text-[24px] font-bold w-[100%]  line-clamp-2 mt-4 "
          dir="auto"
        >
          {data.title}
        </h2>
        <p
          className="text-[#929191] text-[14px] w-[100%] mt-4 truncate "
          dir="auto"
        >
          {data.summary}
        </p>
      </div>
      <div className="border border-t-1 w-[80%] mt-3"></div>
      <div className="flex w-[80%]  items-center justify-between mt-4 ">
        <div className="flex ">
          <LuCalendarDays size={20} />
          <time className="ml-2 text-[14px] text-[#929191]">
            {format(new Date(data.createdAt), "MMM d, yyyy")}
          </time>
        </div>
        <div className="flex items-center">
          <GrFormView size={28} />
          <p>{data["writer"]["username"]}</p>
        </div>
      </div>
      <div className="mt-5">
        <Link to={`post/${data._id}`} className="text-[14px]">
          <button className="w-[310px] h-[40px]  border-[2px] rounded-[20px] hover:bg-blue-600 hover:border-transparent hover:text-[#fff]">
            Read More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
