import * as serverAPI from './../utils/serverAPI';

export const GET_POSTS = 'GET_POSTS';

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
