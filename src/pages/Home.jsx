import React from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import homeStyles from "../features/home/Home.module.css";
import Header from "../features/header/Header";
import Profile from "../features/profile/Profile";
import PeopleCards from "../features/peopleCards/Cards";
import profileDefaultImage from "../media/default.png";

export const UserContext = React.createContext({});

export default function Home() {
  const [currentUser, setCurrentUser] = React.useState({
    _id: "",
    name: "",
    surname: "",
    profilePic: profileDefaultImage,
  });
  const authHeader = `Bearer ${localStorage.getItem("pixit")}`;

  React.useEffect(() => {
    axios
      .get("/users/me", { headers: { Authorization: authHeader } })
      .then((res) => {
        setCurrentUser({
          _id: res.data.id,
          name: res.data.name,
          surname: res.data.surname,
          profilePic: res.data.profilePic
            ? res.data.profilePic
            : profileDefaultImage,
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  }, [authHeader]);

  return (
    <UserContext.Provider value={{currentUser}}>
      <div className={homeStyles["container"]}>
        <Header />
        <Profile />
        <Outlet />
        <PeopleCards />
      </div>
    </UserContext.Provider>
  );
}
