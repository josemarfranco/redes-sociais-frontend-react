import axios from "axios";
import React from "react";

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
    <form className="post-input-box" onSubmit={handleSubmit}>
      <label htmlFor="content">Qual é a polêmica de hoje?</label>
      <input
        className="post-input"
        name="content"
        type="text"
        value={newPost.inputPost}
        onChange={handleChange}
      />
      <button className="standard-button" type="submit">
        Postar
      </button>
    </form>
  );
}
