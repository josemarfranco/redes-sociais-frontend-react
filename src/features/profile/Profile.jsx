import React from "react";
import axios from "axios";
import profileStyles from "./Profile.module.css";
import profileDefaultImage from "../../media/default.png";

export default function Profile() {
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
    <div className={profileStyles["profile"]}>
      <img
        className={profileStyles["profile-picture"]}
        width="200"
        height="200"
        src={card.profilePic}
        alt={card.name}
      />
      <h2>{card.name}</h2>
      <h2>{card.surname}</h2>
      <div className={profileStyles["profile-panel"]}></div>
    </div>
  );
}
