import React from "react";
import profileStyles from "./Profile.module.css";

export default function Profile(props) {
  
  return (
    <div className={profileStyles["container"]}>
      <img
        className={profileStyles["picture"]}
        width="200"
        height="200"
        src={props.card.profilePic}
        alt={props.card.name}
      />
      <h2>{props.card.name}</h2>
      <h2>{props.card.surname}</h2>
      <div className={profileStyles["panel"]}></div>
    </div>
  );
}
