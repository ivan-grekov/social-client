import React from 'react';
import { AuthContext } from '../../context/AuthContext';
import './comments.scss';
import axios from 'axios';
import Comment from './Comment';
import { BASE_URL } from '../../apiCalls';

const Comments = ({
  postId,
  commentOpen,
}: {
  postId: string;
  commentOpen: boolean;
}) => {
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user, comments, dispatch } = React.useContext(AuthContext);
  const [descInputComment, setDescInputComment] = React.useState('');

  React.useEffect(() => {
    const getComments = async () => {
      try {
        dispatch({ type: 'SET_COMMENTS', payload: [] });
        const { data } = await axios.get(
          `${BASE_URL}/api/comments?postId=${postId}`
        );
        dispatch({ type: 'SET_COMMENTS', payload: data });
      } catch (error) {
        console.log(error);
      }
    };
    getComments();
  }, [postId, user, commentOpen, dispatch]);

  const onClickSendComment = async (e: React.MouseEvent) => {
    setDescInputComment('');
    e.preventDefault();
    const newComment = {
      userId: user._id,
      postId: postId,
      userImg: user.profilePicture,
      username: user.username,
      desc: descInputComment,
    };

    try {
      await axios.post(`/api/comments`, newComment);
      const { data } = await axios.get(
        `${BASE_URL}/api/comments?postId=${postId}`
      );
      dispatch({ type: 'SET_COMMENTS', payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="comments">
      <div className="write">
        <img
          className="userImg"
          src={
            user?.profilePicture
              ? publicFolder + user.profilePicture
              : publicFolder + 'person/noAvatar.png'
          }
          alt="user profile"
        />
        <input
          type="text"
          placeholder="write a comment"
          value={descInputComment}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setDescInputComment(event.target.value);
          }}
        />
        <button onClick={onClickSendComment}>Send</button>
      </div>
      {comments &&
        comments.map((comment) => (
          <Comment comment={comment} postId={postId} key={comment._id} />
        ))}
    </div>
  );
};

export default Comments;
