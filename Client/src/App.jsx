import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Banner from "./components/banner/Banner";
import Footer from "./components/footer/Footer";
import About from "./components/about/About";
import Card from "./components/card/Card";
import Write from "./components/write/Write";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import { UserContextProvider } from "./userContext";
import CreateBlog from "./components/createPost/CreateBlog";
import EditPost from "./components/editPost/EditPost";

// imported articles in banner
// imported Card in banner
// imported About in and link to About
// imported card in and link to Blog
const App = () => {
  return (
    <>
      <UserContextProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Banner />} />
          <Route path="/post/:id" element={<About />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/card" element={<Card />} />
          <Route path="/write" element={<Write />} />
          <Route path="/create" element={<CreateBlog />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </UserContextProvider>
    </>
  );
};

export default App;
