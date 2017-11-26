import * as serverAPI from './../utils/serverAPI';

export const GET_COMMENTS_BY_POST_ID = 'GET_COMMENTS_BY_POST_ID';
export const LIKE_COMMENT = 'LIKE_COMMENT';
export const UNLIKE_COMMENT = 'UNLIKE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const ADD_COMMENT = 'ADD_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';

export function addComment(comment) {
  return (dispatch) => {
    serverAPI.addCommentToPost(comment).then(() => {
      serverAPI.getCommentsByPost(comment.parentId).then((comments) => {
        dispatch(addCommentSuccess(comments));
      });
    });
  };
}

export function addCommentSuccess(comments) {
  return {
    type: ADD_COMMENT,
    comments: comments
  }
}

export function updateComment(comment) {
  return (dispatch) => {
    serverAPI.editComment(comment).then(() => {
      serverAPI.getCommentsByPost(comment.parentId).then((comments) => {
        dispatch(updateCommentSuccess(comments));
      });
    });
  };
}

export function updateCommentSuccess(comments) {
  return {
    type: UPDATE_COMMENT,
    comments: comments
  }
}

export function deleteComment(commentUuid, postUuid) {
  return (dispatch) => {
    serverAPI.deleteComment(commentUuid).then(() => {
      serverAPI.getCommentsByPost(postUuid).then((comments) => {
        dispatch(deleteCommentSuccess(comments));
      });
    });
  };
}

export function deleteCommentSuccess(comments) {
  return {
    type: DELETE_COMMENT,
    comments: comments
  }
}

export function getCommentsByPost(postId) {
  return (dispatch) => {
    serverAPI.getCommentsByPost(postId).then((comments) => {
      dispatch(getCommentsSuccess(comments));
    });
  };
}

export function getCommentsSuccess(comments) {
  return {
    type: GET_COMMENTS_BY_POST_ID,
    comments: comments
  }
}

export function likeComment(postId, commentId) {
  return (dispatch) => {
    serverAPI.voteComment(commentId, 'upVote').then(() => {
      serverAPI.getCommentsByPost(postId).then((comments) => {
        dispatch(likeCommentSuccess(comments));
      });
    });
  };
}

export function likeCommentSuccess(comments) {
  return {
    type: LIKE_COMMENT,
    comments: comments
  }
}

export function unlikeComment(postId, commentId) {
  return (dispatch) => {
    serverAPI.voteComment(commentId, 'downVote').then(() => {
      serverAPI.getCommentsByPost(postId).then((comments) => {
        dispatch(unlikeCommentSuccess(comments));
      });
    });
  };
}

export function unlikeCommentSuccess(comments) {
  return {
    type: UNLIKE_COMMENT,
    comments: comments
  }
}
