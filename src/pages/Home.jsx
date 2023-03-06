import React from "react";
import homeStyles from "../features/home/Home.module.css";
import Header from "../features/header/Header";
import Profile from "../features/profile/Profile";
import GeneralFeed from "../features/generalFeed/GeneralFeed";
import PeopleCards from "../features/peopleCards/Cards";

export default function Home() {
  return (
    <div className={homeStyles["container"]}>
      <Header />
      <Profile />
      <GeneralFeed />
      <PeopleCards />
    </div>
  );
}
