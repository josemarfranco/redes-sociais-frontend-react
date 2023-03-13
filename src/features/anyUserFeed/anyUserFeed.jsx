import React from "react";
import axios from "axios";
import anyUserFeedStyles from "./anyUserFeed.module.css";
import profileDefaultImage from "../../media/default.png";

export default function AnyUserFeed() {
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
      <div className={anyUserFeedStyles["post-date"]}>
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
        <div className={anyUserFeedStyles["pixit-post"]}>
          <div className={anyUserFeedStyles["pixit-post-profile"]}>
            <img width="30" height="30" src={post.profilePic} alt={post.name} />
            <h3>{post.name}</h3>
          </div>
          <div className={anyUserFeedStyles["pixit-post-content"]}>
            <div className={anyUserFeedStyles["pixit-post-image-div"]}>
              <img
                className={anyUserFeedStyles["pixit-post-image"]}
                src={post.image}
                alt={post.image}
              />
            </div>
            <div className={anyUserFeedStyles["pixit-post-text-content"]}>
              <p>{post.content}</p>
              {formatDate(post.date)}
            </div>
          </div>
        </div>
      ) : (
        <div key={post._id} className={anyUserFeedStyles["post"]}>
          <div className={anyUserFeedStyles["post-profile-picture"]}>
            <img
              width="100"
              height="100"
              src={post.profilePic}
              alt={post.name}
            />
            <div className={anyUserFeedStyles["post-profile"]}>
              {formatDate(post.date)}
            </div>
          </div>
          <div className={anyUserFeedStyles["post-profile-content"]}>
            <h3>{post.name}</h3>
            <p>{post.content}</p>
          </div>
        </div>
      )}
    </div>
  ));
  return <div className={anyUserFeedStyles["container"]}>{renderedPost}</div>;
}
