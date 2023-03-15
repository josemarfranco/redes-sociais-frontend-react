import React from "react";
import axios from "axios";
import { UserContext } from "../../pages/Home";
import commonStyles from "../common/Common.module.css";
import generalFeedStyles from "./GeneralFeed.module.css";
import profileDefaultImage from "../../media/default.png";

export default function PostAnswerInputBox(props) {
  const { currentUser } = React.useContext(UserContext);
  const [newAnswer, setNewAnswer] = React.useState({
    content: "",
  });
  const authHeader = `Bearer ${localStorage.getItem("pixit")}`;

  const handleChange = (event) => {
    setNewAnswer({
      ...newAnswer,
      content: event.target.value,
      profilePic: currentUser.profilePic ? currentUser.profilePic : "",
      name: currentUser.name,
      ownerId: currentUser._id,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`/posts/createAnswer/${props.post._id}`, newAnswer, {
        headers: { Authorization: authHeader },
      })
      .then(() => {
        setNewAnswer({
          content: "",
        });
        props.setReload(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      {props.post.image ? (
        <form
          className={generalFeedStyles["pixit-post-anwser-area"]}
          onSubmit={handleSubmit}
        >
          <div
            className={
              generalFeedStyles["pixit-post-answer-picture-input-area"]
            }
          >
            <img
              className={generalFeedStyles["pixit-post-anwser-area-picture"]}
              src={
                currentUser.profilePic
                  ? currentUser.profilePic
                  : profileDefaultImage
              }
              alt={props.post.name}
            />
            <input
              className={generalFeedStyles["pixit-post-answer-input"]}
              name="content"
              type="text"
              value={newAnswer.content}
              onChange={handleChange}
            />
          </div>
          <button className={commonStyles["standard-button"]} type="submit">
            Responder
          </button>
        </form>
      ) : (
        <form
          className={generalFeedStyles["post-anwser-area"]}
          onSubmit={handleSubmit}
        >
          <div className={generalFeedStyles["post-answer-picture-input-area"]}>
            <img
              className={generalFeedStyles["post-anwser-area-picture"]}
              src={
                currentUser.profilePic
                  ? currentUser.profilePic
                  : profileDefaultImage
              }
              alt={props.post.name}
            />
            <input
              className={generalFeedStyles["post-answer-input"]}
              name="content"
              type="text"
              value={newAnswer.content}
              onChange={handleChange}
            />
          </div>
          <button className={commonStyles["standard-button"]} type="submit">
            Responder
          </button>
        </form>
      )}
    </>
  );
}
