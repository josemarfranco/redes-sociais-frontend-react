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
  const [reload, setReload] = React.useState(false);

  React.useEffect(() => {
    const authHeader = `Bearer ${localStorage.getItem("pixit")}`;
    axios
      .get("/queries/generalfeed", { headers: { Authorization: authHeader } })
      .then((res) => {
        setFeed(res);
        setReload(false);
      })
      .catch((error) => error.message);
  }, [reload]);

  function formatDate(date) {
    const formattedDate = new Date(date);
    const [day, month, year, hours, minutes] = [
      formattedDate.getDate(),
      formattedDate.getMonth(),
      formattedDate.getFullYear(),
      formattedDate.getHours(),
      formattedDate.getMinutes(),
    ];
    return (
      <div className={generalFeedStyles["post-date"]}>
        <small>
          {day}/{month}/{year}
        </small>
        <small>
          ({hours}:{minutes})
        </small>
      </div>
    );
  }

  const renderedPost = feed.data.map((post) => (
    <div key={post._id}>
      {post.image ? (
        <div className={generalFeedStyles["pixit-post"]}>
          <div className={generalFeedStyles["pixit-post-profile"]}>
            <img width="30" height="30" src={post.profilePic} alt={post.name} />
            <h3>{post.name}</h3>
          </div>
          <div className={generalFeedStyles["pixit-post-content"]}>
            <div className={generalFeedStyles["pixit-post-image-div"]}>
              <img
                className={generalFeedStyles["pixit-post-image"]}
                src={post.image}
                alt={post.image}
              />
            </div>
            <div className={generalFeedStyles["pixit-post-text-content"]}>
              <p>{post.content}</p>
              {formatDate(post.date)}
            </div>
          </div>
        </div>
      ) : (
        <div key={post._id} className={generalFeedStyles["post"]}>
          <div className={generalFeedStyles["post-profile-picture"]}>
            <img
              width="100"
              height="100"
              src={post.profilePic}
              alt={post.name}
            />
            <div className={generalFeedStyles["post-profile"]}>
              {formatDate(post.date)}
            </div>
          </div>
          <div className={generalFeedStyles["post-profile-content"]}>
            <h3>{post.name}</h3>
            <p>{post.content}</p>
          </div>
        </div>
      )}
    </div>
  ));
  return (
    <div className={generalFeedStyles["container"]}>
      <PostInputBox setReload={setReload} />
      {renderedPost}
    </div>
  );
}
