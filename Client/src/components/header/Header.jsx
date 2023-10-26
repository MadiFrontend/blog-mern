import { useContext } from "react";
import { Link } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { TbBrandBlogger } from "react-icons/tb";
import { TfiWrite } from "react-icons/tfi";
import { AiOutlineUser } from "react-icons/ai";
import { TbLogout2 } from "react-icons/tb";
import { useEffect } from "react";
import { useState } from "react";
import { UserContext } from "../../userContext";
import user from "../../../public/user.jpg";
import SearchBar from "../serach/SearchBar";

// const navigation = [
//   { name: "Home", href: "/", current: false },
//   { name: "Blog", href: "/card", current: false },
//   { name: "Services", href: "/write", current: false },
//   // { name: "Register", href: "/register", current: false },
//   // { name: "Login", href: "/login", current: false },
//   { name: "Pricing", href: "#", current: false },
//   { name: "About Us", href: "about", current: false },
// ];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

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
      // body: JSON.stringify({ username, password }),
      // headers: { "content-Type": "application/json" },
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
              <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="lg:flex flex-shrink-0 hidden items-center ">
                  <Link to={"/"} className="mt-3 flex items-center">
                    <button className="bg-[#3b82f6] rounded-full p-2">
                      <TbBrandBlogger size={22} color="#fff" />
                    </button>

                    <h1 className="font-extrabold text-[#000] ml-2">
                      BLOG.
                      <span className="font-extrabold text-[#eee]">CO</span>
                    </h1>
                    {/* <div className="border border-r-1 h-[100%] ml-5"></div> */}
                  </Link>
                </div>

                <div className="md:hidden lg:flex ml-6 hidden mb-[25px]  ">
                  {/* <div className="flex space-x-2">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current
                            ? " text-[#94a3b8]"
                            : "hover:text-[#000]",
                          "px-6 py-4 text-sm font-bold mx-[8rem] me-0  nav-menu"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div> */}
                  <SearchBar />
                </div>
              </div>
              <div className="absolute inset-y-0 gap-5 mt-2 right-10 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
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
                      className="absolute flex flex-col  w-[10%] h-[100px] bg-[#fff] shadow top-[78px] rounded-b-[20px] z-50 overflow-hidden"
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

                {/* Profile dropdown */}
                {/* <Menu as="div" className="relative ml-3">
                                    <div>
                                        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="absolute -inset-1.5" />
                                            <button className='md:w-[120px] w-[90px] h-[40px] rounded-[15px] bg-[#122d5b]'>
                                                <a href="#" className='singup text-white'>ContactUs</a>
                                            </button>
                                        </Menu.Button>
                                    </div>
                                </Menu> */}
              </div>
            </div>
          </div>

          {/* <Disclosure.Panel className="sm:hidden header-menu">
            <div className="space-y-1 px-2 pb-3 pt-2 ">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? "bg-black text-black" : "text-[#000]",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel> */}
          <div className="border border-b-1 w-[95%] m-auto mt-3"></div>
        </>
      )}
    </Disclosure>
  );
}
