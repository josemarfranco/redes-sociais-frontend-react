import React from "react";
import { UserContext } from "../../pages/Home";
import profileStyles from "./Profile.module.css";

export default function Profile() {
  const { currentUser } = React.useContext(UserContext);

  return (
    <div className={profileStyles["container"]}>
      <img
        className={profileStyles["picture"]}
        width="200"
        height="200"
        src={currentUser.profilePic}
        alt={currentUser.name}
      />
      <div className={profileStyles["panel"]}></div>
    </div>
  );
}
