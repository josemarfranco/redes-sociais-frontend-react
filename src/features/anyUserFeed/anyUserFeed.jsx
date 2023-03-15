import React from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import anyUserFeedStyles from "../generalFeed/GeneralFeed.module.css";
import PostAnswerInputBox from "../generalFeed/PostAnswerInputBox";
import formatDate from "../components/formatDate";
import profileDefaultImage from "../../media/default.png";

export default function AnyUserFeed() {
  const idRouterParam = useParams();
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
  const authHeader = `Bearer ${localStorage.getItem("pixit")}`;
  const [reload, setReload] = React.useState(false);

  React.useEffect(() => {
    axios
      .get("/queries/anyuserfeed/" + idRouterParam.userId, {
        headers: { Authorization: authHeader },
      })
      .then((res) => {
        setFeed(res);
        setReload(false);
      })
      .catch((error) => error.message);
  }, [reload, authHeader, idRouterParam]);

  const renderedPost = feed.data.map((post) => (
    <div key={post._id}>
      {post.image ? (
        <div className={anyUserFeedStyles["pixit-post"]}>
          <div className={anyUserFeedStyles["pixit-post-profile"]}>
            <Link to={`/${post.parentId}`}>
              <img
                src={post.profilePic ? post.profilePic : profileDefaultImage}
                alt={post.name}
              />
            </Link>
            <Link to={`/${post.parentId}`}>
              <h3>{post.name}</h3>
            </Link>
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
              <div className={anyUserFeedStyles["post-date"]}>
                {formatDate(post.date)}
              </div>
            </div>
          </div>
          <PostAnswerInputBox post={post} setReload={setReload} />
          {post.answerPosts?.map((answerPost) => (
            <div
              key={answerPost._id}
              className={anyUserFeedStyles["pixit-post-answer-area"]}
            >
              <div className={anyUserFeedStyles["pixit-post-answer"]}>
                <Link to={`/${answerPost.ownerId}`}>
                  <img
                    className={
                      anyUserFeedStyles["pixit-post-anwser-area-picture"]
                    }
                    src={
                      answerPost.profilePic
                        ? answerPost.profilePic
                        : profileDefaultImage
                    }
                    alt={answerPost.name}
                  />
                </Link>
                <p>{answerPost.content}</p>
              </div>
            </div>
          ))}
          <div className={anyUserFeedStyles["pixit-post-anwser-area-gambs"]} />
        </div>
      ) : (
        <div key={post._id} className={anyUserFeedStyles["post"]}>
          <div className={anyUserFeedStyles["post-content-area"]}>
            <div className={anyUserFeedStyles["post-profile"]}>
              <Link to={`/${post.parentId}`}>
                <img
                  src={post.profilePic ? post.profilePic : profileDefaultImage}
                  alt={post.name}
                />
              </Link>
              <div className={anyUserFeedStyles["post-date"]}>
                {formatDate(post.date)}
              </div>
            </div>
            <div className={anyUserFeedStyles["post-content"]}>
              <Link to={`/${post.parentId}`}>
                <h3>{post.name}</h3>
              </Link>
              <p>{post.content}</p>
            </div>
          </div>
          <PostAnswerInputBox post={post} setReload={setReload} />
          {post.answerPosts?.map((answerPost) => (
            <div
              key={answerPost._id}
              className={anyUserFeedStyles["post-answer-area"]}
            >
              <div className={anyUserFeedStyles["post-answer"]}>
                <Link to={`/${answerPost.ownerId}`}>
                  <img
                    className={
                      anyUserFeedStyles["pixit-post-anwser-area-picture"]
                    }
                    src={
                      answerPost.profilePic
                        ? answerPost.profilePic
                        : profileDefaultImage
                    }
                    alt={answerPost.name}
                  />
                </Link>
                <p>{answerPost.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  ));
  return <div className={anyUserFeedStyles["container"]}>{renderedPost}</div>;
}
