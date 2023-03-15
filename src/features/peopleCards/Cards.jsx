import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import cardsStyles from "./Cards.module.css";
import profileDefaultImage from "../../media/default.png";

export default function Cards() {
  const [cards, setCards] = React.useState({
    data: [
      {
        _id: "",
        name: "",
        surname: "",
        profilePic: profileDefaultImage,
      },
    ],
  });

  React.useEffect(() => {
    const authHeader = `Bearer ${localStorage.getItem("pixit")}`;
    axios
      .get("/queries/peoplecards", { headers: { Authorization: authHeader } })
      .then((res) => {
        setCards(res);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  const renderedCard = cards.data.map((card) => (
    <div key={card._id} className={cardsStyles["card"]}>
      <div className={cardsStyles["card-id"]}>
        <div>
          <Link to={`/users/${card._id}`}>
            <img
              className={cardsStyles["card-picture"]}
              src={card.profilePic ? card.profilePic : profileDefaultImage}
              alt={card.name}
            />
          </Link>
        </div>
        <div className={cardsStyles["card-name"]}>
          <Link to={`/users/${card._id}`}>
            <h4>{card.name}</h4>
          </Link>
          <Link to={`/users/${card._id}`}>
            <h4>{card.surname}</h4>
          </Link>
        </div>
      </div>
    </div>
  ));

  return <div className={cardsStyles["container"]}>{renderedCard}</div>;
}
