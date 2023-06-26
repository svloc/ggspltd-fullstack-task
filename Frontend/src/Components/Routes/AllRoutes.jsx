import React from "react";
import { Routes, Route } from "react-router-dom";
import { PATH_NAME } from "../Configs/PathName";
import Login from "../Pages/Auth/Login";
import Home from "../Pages/Home/Home";
import Signup from "../Pages/Auth/Signup";
import PostList from "../Pages/Dashboard/PostList";
import PostEditor from "../Pages/Dashboard/PostEditor";


export default function AllRoutes() {
  return (
    <Routes>
      <Route path={PATH_NAME.LOGIN} element={<Login />} />
      <Route path={PATH_NAME.SIGNUP} element={<Signup />} />
      <Route element={<Home />}>
        <Route path={PATH_NAME.POST_LIST} element={<PostList />} />
        <Route path={PATH_NAME.ADD_POST} element={<PostEditor/>} />
        <Route path={PATH_NAME.EDIT_POST} element={<PostEditor/>} />
      </Route>
    </Routes>
  );
}
