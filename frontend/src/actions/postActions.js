import * as serverAPI from './../utils/serverAPI';

export const GET_POSTS = 'GET_POSTS';
export const DELETE_POST = 'DELETE_POST'

export function getAllPosts() {
    return (dispatch) => {
        serverAPI.getPosts().then(data => {
            dispatch(getAllPostsSuccess(data.posts))
        }).catch(error => {
            console.log('error')
            throw(error)
        })
    }
}

export function getAllPostsSuccess(posts) {
    return {
        type: GET_POSTS,
        posts
    }
}

export function deletePost(postId) {
    return (dispatch) => {
        serverAPI.deletePost(postId).then(() => {
            serverAPI.getPosts().then(posts => dispatch(deletePostSuccess(posts)));
        })
    }
}

export function deletePostSuccess(posts) {
    return {
        type: DELETE_POST,
        posts: posts.filter(post => post.deleted === false)
    }
}

export function updatePost(post) {
    return (dispatch) => {
      serverAPI.editPost(post.id, {
        title: post.title,
        body: post.body
      }).then(() => {
        serverAPI.getPosts().then(posts => {
          dispatch(updatePostSuccess(posts));
        })
      });
    };
  }
  
  export function updatePostSuccess(posts) {
    return {
      type: UPDATE_POST,
      posts: posts.filter(post => post.deleted===false)
    }
  }

  export function addPost(post) {
    return (dispatch) => {
      serverAPI.addPost(post).then(() => {
        serverAPI.getPosts().then(posts => {
          dispatch(addPostSuccess(posts));
        })
      });
    };
  }
  
  export function addPostSuccess(posts) {
    return {
      type: ADD_POST,
      posts: posts.filter(post => post.deleted===false)
    }
  }

  export function likePost(postId) {
    return (dispatch) => {
      serverAPI.votePost(postId, 'upVote').then(() => {
        serverAPI.getPosts().then(posts => {
          dispatch(likePostSuccess(posts));
        })
      });
    };
  }
  
  export function likePostSuccess(posts) {
    return {
      type: LIKE_POST,
      posts: posts.filter(post => post.deleted===false)
    }
  }

  export function unlikePost(postId) {
    return (dispatch) => {
      serverAPI.votePost(postId, 'downVote').then((posts) => {
        serverAPI.getPosts().then(posts => {
          dispatch(likePostSuccess(posts));
        })
      });
    };
  }
  
  export function unlikePostSuccess(postId) {
    return {
      type: UNLIKE_POST
    }
  }