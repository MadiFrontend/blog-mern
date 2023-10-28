import React from "react";
import Articles from "../articles/Articles";
import Card from "../card/Card";
import SearchBar from "../serach/SearchBar";

const Banner = () => {
  return (
    <>
      <div className="container  lg:block mx-auto">
        <div className="boeder-banner flex flex-col justify-center px-3">
          <h1 className="text-[#000] md:text-[28px] font-extrabold lg:ml-[1rem] text-center mt-10 lg:text-left ">
            Discover Nice Articles Here
          </h1>
          <p className="text-[#929191] text-[12px] lg:text-left text-center  lg:ml-[1rem] mt-3  md:h-[70px] lg:w-[50%] font-bold">
            All The Articles And Contact Of The Site Have Been{" "}
            <span className="text-[#000] font-bold text-[16px]">
              Updated Today
            </span>
            And You Can Find Your{" "}
            <span className="text-[#000] font-bold text-[16px]">
              Articles And Contact
            </span>
            Quickly Without Any Problems
          </p>
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
            {/* <SearchBar /> */}
            {/* <div className="flex md:mr-10 pt-10 justify-between items-center ">
              {menus.map((menu) => {
                return (
                  <div
                    key={menu.id}
                    className="text-[14px] text-[#929191] hover:text-black cursor-pointer"
                  >
                    {menu.title}
                  </div>
                );
              })}
            </div> */}
          </div>
        </div>
      </div>
      <Articles />

      <Card />
    </>
  );
};

export default Banner;
