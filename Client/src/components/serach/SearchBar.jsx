import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function SearchBar() {
  const [search, setSearch] = useState(" ");
  const [searchMyData, setSearchMyData] = useState([]);
  const [posts, setPosts] = useState(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/post").then((res) =>
      res.json().then((posts) => setPosts(posts))
    );
  }, []);

  const searchHandler = (e) => {
    const inputData = e.target.value;
    setSearch(inputData);
    const showData = posts.filter((items) =>
      items.title.toLowerCase().includes(search.toLowerCase())
    );
    if (inputData) {
      setSearchMyData(showData);
    } else {
      setSearchMyData([]);
    }
  };
  return (
    <div>
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
            className="block md:w-[80%] w-[320px] md:h-[40px] bg-[#f3f3f5] p-[6px] pl-10 text-sm text-gray-900 border rounded-[20px]  focus:ring-blue-500 focus:border-blue-500  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            onChange={searchHandler}
            onClick={() => {
              setShown(!shown);
            }}
          />
        </div>
      </form>

      {searchMyData && searchMyData.length > 0 && (
        <div className="bg-white w-[21%] h-[300px] shadow-2xl border rounded-2xl absolute z-[55] left-[190px] top-[20]  overflow-y-scroll scrollbar-hide ">
          {searchMyData.map((search) => {
            return (
              <div
                className="flex items-center my-10 hover:shadow-sm pb-1 cursor-pointer pr-2"
                key={search._id}
              >
                <div className="w-[20px] h-[10px] ">
                  {/* <Link to={`post/${search._id}`}>
                    <img
                      src={"http://localhost:3001/" + search.cover}
                      alt=""
                      className="w-full h-full rounded-[20px]"
                    />
                  </Link> */}
                </div>
                <div className=" w-[80%]">
                  <p className=" font-bold truncate">{search.title}</p>
                  <p className="text-[#949494] mt-1 truncate">
                    {search.summery}
                  </p>
                </div>
                
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
