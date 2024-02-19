import React, { useEffect, useState } from "react";
import spin from "../../../public/spin.svg";
import Card from "./Card";

const CardList = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/post").then((res) =>
      res.json().then((posts) => setPosts(posts))
    );
  }, []);

  return (
    <div className="container flex justify-center lg:block min-h-screen mx-auto">
      {posts ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:justify-items-center gap-10 mt-16  ">
          {posts.map((data) => (
            <>
              <Card data={data} />
            </>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center mt-16">
          <img src={spin} alt="spin Logo" className="w-[80px]" />
        </div>
      )}
    </div>
  );
};

export default CardList;
