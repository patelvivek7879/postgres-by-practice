import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./pages/Home";
import Register from "./components/Register";
import Landing from "./pages/Landing";
import Feedbacks from "./pages/Feedbacks";
import { useAuthContext } from "./AuthProvider";
import UserProfile from "./pages/UserProfile";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

const AppContainer = ({ setThemeVal }: any) => {

  const { loggedInUser }: any = useAuthContext();


  return (
    <Routes>
      <Route
        path="/"
        element={
          <Landing setThemeVal={setThemeVal} loggedInUser={loggedInUser} />
        }
      />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route
        path="/home"
        element={
          loggedInUser && (
            <Home setThemeVal={setThemeVal} loggedInUser={loggedInUser} />
          )
        }
      />
      <Route
        path="/:username/profile"
        element={
          loggedInUser && (
            <UserProfile
              setThemeVal={setThemeVal}
              loggedInUser={loggedInUser}
            />
          )
        }
      />
      <Route
        path="/:username/settings"
        element={
          loggedInUser && (
            <UserProfile
              setThemeVal={setThemeVal}
              loggedInUser={loggedInUser}
            />
          )
        }
      />
      <Route
        path="/admin/feedbacks"
        element={
          loggedInUser && (
            <Feedbacks setThemeVal={setThemeVal} loggedInUser={loggedInUser} />
          )
        }
      />
    </Routes>
  );
};

export default AppContainer;
