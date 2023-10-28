import { useContext } from "react";
import { Link } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { TbBrandBlogger } from "react-icons/tb";
import { TfiWrite } from "react-icons/tfi";
import { AiOutlineUser } from "react-icons/ai";
import { TbLogout2 } from "react-icons/tb";
import { useEffect } from "react";
import { useState } from "react";
import { UserContext } from "../../userContext";
import user from "../../../public/user.jpg";
import SearchBar from "../serach/SearchBar";

export default function Header() {
  const [isActive, setisActive] = useState(false);

  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:3001/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  const logout = async () => {
    await fetch("http://localhost:3001/logout", {
      method: "POST",
      credentials: "include",
    });
    setUserInfo(null);
    window.location.reload();
  };

  const username = userInfo.username;
  return (
    <Disclosure as="nav" className="container mx-auto container-header">
      {({ open }) => (
        <>
          <div
            className="w-screen h-screen fixed z-40"
            onClick={() => {
              setisActive(false);
            }}
            style={{
              display: isActive ? "block" : "none",
            }}
          ></div>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex items-center justify-between sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 md:flex hidden items-center ">
                  <Link to={"/"} className="mt-3 flex items-center">
                    <button className="bg-[#3b82f6] rounded-full p-2">
                      <TbBrandBlogger size={22} color="#fff" />
                    </button>

                    <h1 className="font-extrabold text-[#000] ml-2">
                      BLOG.
                      <span className="font-extrabold text-[#eee]">CO</span>
                    </h1>
                  </Link>
                </div>

                <div className=" lg:flex   mb-[25px]  ">
                  <SearchBar />
                </div>
              </div>
              <div className="absolute inset-y-0 gap-5 mt-2 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {username && (
                  <>
                    <Link to="/create">
                      <div className="flex items-center cursor-pointer ">
                        <TfiWrite className="mr-2" />
                        Write
                      </div>
                    </Link>
                    <div
                      className="w-[30px] rounded-full border-[2px] bg-white overflow-hidden cursor-pointer z-50"
                      onClick={() => {
                        setisActive(!isActive);
                      }}
                    >
                      <img src={user} alt="" />
                    </div>

                    <div
                      className="absolute flex flex-col w-[100%] lg:w-[10%] md:w-[18%] md:h-[100px] bg-[#fff] shadow md:top-[78px] top-[68px]  z-50 overflow-hidden"
                      style={{
                        display: isActive ? "flex" : "none",
                      }}
                    >
                      <div className="p-2 hover:bg-[#f8f8f8] flex items-center cursor-pointer ">
                        {/* <AiOutlineUser /> */}

                        <p className=" ml-2">Hi {username}</p>
                      </div>
                      <div className="p-2 hover:bg-[#f8f8f8] flex items-center cursor-pointer">
                        <TbLogout2 />
                        <a onClick={logout} className=" ml-2">
                          log out
                        </a>
                      </div>
                    </div>
                  </>
                )}
                {!username && (
                  <>
                    <Link to="/login">
                      <AiOutlineUser size={24} />
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="border border-b-1 w-[95%] m-auto mt-3"></div>
        </>
      )}
    </Disclosure>
  );
}
