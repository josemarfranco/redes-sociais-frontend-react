import React from "react";
import { Navigate } from "react-router-dom";

export const HandleLogout = () => {
  localStorage.removeItem("pixit");
  return <Navigate to="/login" />;
};

export const ProtectedRoute = ({ children }) => {
  const [logged, setLogged] = React.useState("");

  fetch("/auth", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("pixit")}`,
      "content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      setLogged(data.status);
    });

  if (logged === "ERR") {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
};
