import React from "react";
import axios from "axios";
import Header from "./Header";
import GeneralFeed from "./GeneralFeed";
import CardsPanel from "./CardsPanel";
import profileDefaultImage from "../../images/default.png";

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
    <>
      <Header />
      <div className="homepage-flex-container fade-in">
        <div className="profile">
          <img
            className="profile-picture"
            width="200"
            height="200"
            src={card.profilePic}
            alt={card.name}
          />
          <h2>{card.name}</h2>
          <h2>{card.surname}</h2>
          <div className="profile-panel"></div>
        </div>
        <GeneralFeed />
        <CardsPanel />
      </div>
    </>
  );
}
