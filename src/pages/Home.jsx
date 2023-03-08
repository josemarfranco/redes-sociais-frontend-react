import React from "react";
import axios from "axios";
import homeStyles from "../features/home/Home.module.css";
import Header from "../features/header/Header";
import Profile from "../features/profile/Profile";
import GeneralFeed from "../features/generalFeed/GeneralFeed";
import PeopleCards from "../features/peopleCards/Cards";
import profileDefaultImage from "../media/default.png";

export default function Home() {
  const [card, setCard] = React.useState({
    id: "",
    name: "",
    surname: "",
    profilePic: profileDefaultImage,
  });

  React.useEffect(() => {
    const authHeader = `Bearer ${localStorage.getItem("OI TERINHA!")}`;
    axios
      .get("/users/me", { headers: { Authorization: authHeader } })
      .then((res) => {
        setCard(res.data);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  return (
    <div className={homeStyles["container"]}>
      <Header card={card} />
      <Profile card={card} />
      <GeneralFeed />
      <PeopleCards />
    </div>
  );
}
