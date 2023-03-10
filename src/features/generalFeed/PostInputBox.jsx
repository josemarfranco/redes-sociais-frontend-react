import axios from "axios";
import React from "react";
import commonStyles from "../../features/common/Common.module.css";
import generalFeedStyles from "./GeneralFeed.module.css";

export default function PostInputBox() {
  const [newPost, setNewPost] = React.useState({
    image: "",
    content: "",
  });
  const [picturePreview, setPicturePreview] = React.useState(null);
  const authHeader = `Bearer ${localStorage.getItem("pixit")}`;

  const handleChange = (event) => {
    setNewPost({ ...newPost, content: event.target.value });
  };

  const handleFileChange = (event) => {
    axios
      .post(
        "/media/post",
        { pic: event.target.files[0] },
        { headers: { "content-type": "multipart/form-data" } }
      )
      .then((res) => {
        setNewPost({ ...newPost, image: res.data.filePath });
        setPicturePreview(res.data.filePath);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/posts/create", newPost, {
        headers: { Authorization: authHeader },
      })
      .then(() => {
        setNewPost({
          content: "",
          image: "",
        });
        setPicturePreview("");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const cancelImagePost = () => {
    setNewPost({ ...newPost, image: "" });
    setPicturePreview(null);
  };

  console.log(newPost);

  const showSubmitControls = () => {
    return (
      <div className={generalFeedStyles["post-input-button-area"]}>
        {picturePreview ? (
          <button
            className={generalFeedStyles["pixit-button"]}
            type="submit"
            onClick={cancelImagePost}
          >
            Remover Foto
          </button>
        ) : (
          <label
            type="button"
            className={generalFeedStyles["pixit-label-button"]}
          >
            <input type="file" name="image" onChange={handleFileChange} />
            {picturePreview ? "Remover Foto" : "Escolher Foto"}
          </label>
        )}
        <button className={commonStyles["standard-button"]} type="submit">
          Postar
        </button>
      </div>
    );
  };

  return (
    <form
      className={generalFeedStyles["post-input-box"]}
      onSubmit={handleSubmit}
    >
      <label htmlFor="content">O que acontece?</label>
      {picturePreview ? (
        <div className={generalFeedStyles["post-input-picturePreview-area"]}>
          <img
            className={generalFeedStyles["post-input-picturePreview"]}
            src={picturePreview}
            alt="Preview"
          />
        </div>
      ) : null}
      <input
        className={generalFeedStyles["post-input"]}
        name="content"
        type="text"
        value={newPost.content}
        onChange={handleChange}
      />
      {showSubmitControls()}
    </form>
  );
}
