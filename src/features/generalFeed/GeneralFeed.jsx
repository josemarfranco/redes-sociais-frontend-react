import React from "react";
import axios from "axios";
import generalFeedStyles from "./GeneralFeed.module.css";
import PostInputBox from "./PostInputBox";
import profileDefaultImage from "../../media/default.png";

export default function GeneralFeed() {
  const [feed, setFeed] = React.useState({
    data: [
      {
        _id: "",
        name: "",
        profilePic: profileDefaultImage,
        content: "",
        date: "",
      },
    ],
  });

  React.useEffect(() => {
    const authHeader = `Bearer ${localStorage.getItem("pixit")}`;
    axios
      .get("/queries/generalfeed", { headers: { Authorization: authHeader } })
      .then((res) => {
        setFeed(res);
      })
      .catch((error) => error.message);
  }, []);

  function formatDate(date) {
    const formattedDate = new Date(date);
    const [day, month, hours, minutes] = [
      formattedDate.getDate(),
      formattedDate.getMonth(),
      formattedDate.getHours(),
      formattedDate.getMinutes(),
    ];
    if (new Date()) {
      return (
        <small>
          {hours}:{minutes}
        </small>
      );
    } else if (new Date() - 1) {
      return (
        <small>
          {hours}:{minutes} (Ontem)
        </small>
      );
    } else {
      return (
        <small>
          {hours}:{minutes} ({day}/{month})
        </small>
      );
    }
  }
  const renderedPost = feed.data.map((post) => (
    <div key={post._id} className={generalFeedStyles["post"]}>
      <div className={generalFeedStyles["post-profile-picture"]}>
        <img width="100" height="100" src={post.profilePic} alt={post.name} />
        <div className={generalFeedStyles["post-profile"]}>
          {formatDate(post.date)}
        </div>
      </div>
      <div className={generalFeedStyles["post-profile-content"]}>
        <h3>{post.name}</h3>
        <p>{post.content}</p>
      </div>
    </div>
  ));
  return (
    <div className={generalFeedStyles["container"]}>
      <PostInputBox />
      {renderedPost}
    </div>
  );
}
