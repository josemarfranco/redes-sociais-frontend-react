import React from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import GeneralFeedStyles from "../generalFeed/GeneralFeed.module.css";
import AnyUserFeedStyles from "./AnyUserFeed.module.css";
import PostAnswerInputBox from "../generalFeed/PostAnswerInputBox";
import FollowButton from "../components/FollowButton";
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
  const [anyUser, setAnyUser] = React.useState({
    id: "",
    name: "",
    surname: "",
    profilePic: "",
  });
  const [reload, setReload] = React.useState(false);
  const authHeader = `Bearer ${localStorage.getItem("pixit")}`;

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

  React.useEffect(() => {
    axios
      .get("/users/read/" + idRouterParam.userId, {
        headers: { Authorization: authHeader },
      })
      .then((res) => {
        setAnyUser(res.data);
      })
      .catch((error) => error.message);
  }, [authHeader, idRouterParam]);

  console.log(reload);

  const renderedPost = feed.data.map((post) => (
    <div key={post._id}>
      {post.image ? (
        <div className={GeneralFeedStyles["pixit-post"]}>
          <div className={GeneralFeedStyles["pixit-post-content"]}>
            <div className={GeneralFeedStyles["pixit-post-image-div"]}>
              <img
                className={GeneralFeedStyles["pixit-post-image"]}
                src={post.image}
                alt={post.image}
              />
            </div>
            <div className={GeneralFeedStyles["pixit-post-text-content"]}>
              <p>{post.content}</p>
              <div className={GeneralFeedStyles["post-date"]}>
                {formatDate(post.date)}
              </div>
            </div>
          </div>
          <PostAnswerInputBox post={post} setReload={setReload} />
          {post.answerPosts?.map((answerPost) => (
            <div
              key={answerPost._id}
              className={GeneralFeedStyles["pixit-post-answer-area"]}
            >
              <div className={GeneralFeedStyles["pixit-post-answer"]}>
                <Link to={`/users/${answerPost.ownerId}`}>
                  <img
                    className={
                      GeneralFeedStyles["pixit-post-anwser-area-picture"]
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
          <div className={GeneralFeedStyles["pixit-post-anwser-area-gambs"]} />
        </div>
      ) : (
        <div key={post._id} className={GeneralFeedStyles["post"]}>
          <div className={GeneralFeedStyles["post-content-area"]}>
            <div className={GeneralFeedStyles["post-profile"]}></div>
            <div className={GeneralFeedStyles["post-content"]}>
              <p>{post.content}</p>
              <div className={GeneralFeedStyles["post-date"]}>
                {formatDate(post.date)}
              </div>
            </div>
          </div>
          <PostAnswerInputBox post={post} setReload={setReload} />
          {post.answerPosts?.map((answerPost) => (
            <div
              key={answerPost._id}
              className={GeneralFeedStyles["post-answer-area"]}
            >
              <div className={GeneralFeedStyles["post-answer"]}>
                <Link to={`/users/${answerPost.ownerId}`}>
                  <img
                    className={
                      GeneralFeedStyles["pixit-post-anwser-area-picture"]
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
  return (
    <div className={GeneralFeedStyles["container"]}>
      <div className={AnyUserFeedStyles["profile-area"]}>
        <div className={AnyUserFeedStyles["profile"]}>
          <img src={anyUser.profilePic} alt={anyUser.profilePic} />
          <div className={AnyUserFeedStyles["credentials"]}>
            <h2>{anyUser.name}</h2>
            <h2>{anyUser.surname}</h2>
          </div>
        </div>
        <div className={AnyUserFeedStyles["button-area"]}>
          <FollowButton
            anyUser={idRouterParam}
            setReload={setReload}
          />
        </div>
      </div>
      {renderedPost}
    </div>
  );
}
