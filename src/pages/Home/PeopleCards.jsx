import React from "react";
import axios from "axios";
import profileDefaultImage from "../../images/default.png";

export default function PeopleCards() {
  const [cards, setCards] = React.useState({
    data: [
      {
        _id: "",
        name: "",
        surname: "",
        profilePic: profileDefaultImage,
        bio: "",
      },
    ],
  });

  React.useEffect(() => {
    const authHeader = `Bearer ${localStorage.getItem("OI TERINHA!")}`;
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
    <div key={card._id} className="people-card">
      <div className="people-card-id">
        <div>
          <img
            className="people-card-picture"
            width="50"
            height="50"
            src={card.profilePic}
            alt="nome"
          />
        </div>
        <div className="people-card-name">
          <p>
            <b>{card.name}</b>
          </p>
          <p>
            <b>{card.surname}</b>
          </p>
        </div>
      </div>
      <div className="people-card-bio">
        <p>{card.bio}</p>
      </div>
    </div>
  ));

  return <>{renderedCard}</>;
}
