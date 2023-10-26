import React from "react";
import Articles from "../articles/Articles";
import Card from "../card/Card";
const menus = [
  { id: 1, href: "#", title: "All" },
  { id: 2, href: "#", title: "Technology" },
  { id: 3, href: "#", title: "Sport" },
  { id: 4, href: "#", title: "Design" },
  { id: 5, href: "#", title: "Programing" },
  { id: 6, href: "#", title: "Engineering" },
];
const Banner = () => {
  return (
    <>
      <div className="container mx-auto">
        <div className="boeder-banner">
          <h1 className="text-[#000] md:text-[28px] font-extrabold lg:ml-[3rem] text-center mt-10 lg:text-left ">
            Discover Nice Articles Here
          </h1>
          <p className="text-[#929191] text-[12px] lg:text-left text-center ml-[2.5rem] lg:ml-[3rem] mt-3 md:w-[520px] w-[350px] md:h-[70px] font-bold">
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
            <form className="pt-10">
              <div className="relative lg:ml-[3rem] ml-[3.5rem] md:text-left">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <svg
                    className="w-4 h-4  dark:text-gray-400"
                    ariaHidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  id="default-search"
                  className="block md:w-[80%] w-[320px] md:h-[40px] bg-[#f3f3f5] p-[6px] pl-10 text-sm text-gray-900 border rounded-[20px]  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
            </form>
            <div className="flex md:mr-10 pt-10 justify-between items-center ">
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
            </div>
          </div>
        </div>
      </div>
      <Articles />

      <Card />
    </>
  );
};

export default Banner;
