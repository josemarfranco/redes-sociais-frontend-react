import axios from "axios";
import React from "react";
import commonStyles from "../../features/common/Common.module.css";
import generalFeedStyles from "./GeneralFeed.module.css";

export default function PostInputBox() {
  const [newPost, setNewPost] = React.useState({
    inputPost: "",
  });

  const handleChange = (event) => {
    setNewPost({ inputPost: event.target.value });
  };

  const handleSubmit = (event) => {
    const authHeader = `Bearer ${localStorage.getItem("OI TERINHA!")}`;
    event.preventDefault();
    axios
      .post(
        "/posts/create",
        {
          content: newPost.inputPost,
        },
        {
          headers: { Authorization: authHeader },
        }
      )
      .then(() => {
        alert("Post criado!");
        setNewPost({
          inputPost: "",
        });
      })
      .catch((error) => {
        setNewPost({
          error: <small className="red">{error.response.data.message}</small>,
          inputPost: "",
        });
      });
  };
  return (
    <form className={generalFeedStyles["post-input-box"]} onSubmit={handleSubmit}>
      <label htmlFor="content">Qual é a polêmica de hoje?</label>
      <input
        className={generalFeedStyles["post-input"]}
        name="content"
        type="text"
        value={newPost.inputPost}
        onChange={handleChange}
      />
      <button className={commonStyles["standard-button"]} type="submit">
        Postar
      </button>
    </form>
  );
}
