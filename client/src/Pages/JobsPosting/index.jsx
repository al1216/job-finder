import React, { useEffect, useState } from "react";
import "./style.css";
import LoggedInUsers from "./LoggedInUsers";
import Error from "../Error";

export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkUserToken = () => {
    const token = localStorage.getItem("user-token");
    console.log(token);
    if (!token || token === "undefined") {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  };
  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn]);

  return (
    <>
      {isLoggedIn && <LoggedInUsers />}
      {!isLoggedIn && <Error />}
    </>
  );
}
