const MAIN_URI = 'http://localhost:3001';
const AUTH_TOKEN = '503a657b-2e4c-456b-b745-86341694f8'
const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization':  AUTH_TOKEN
}

// API calls for Categories
export const getCategories = () => {
    return fetch(`${MAIN_URI}/categories`, {headers}).then(res => res.json());
}

export const getPostsByCategory = (category) => {
    return fetch(`${MAIN_URI}/${category}/posts`, {headers}).then(res => res.json());
}

// API calls for Posts
export const getPosts = (id = '') => {
    return fetch(`${MAIN_URI}/posts/${id}`, {headers}).then(res => res.json());
}

export const addPost = ({id, timestamp, title, body, author, category}) => {
    return fetch(`${MAIN_URI}/posts`, {headers, method: 'POST', body: JSON.stringify({
        id,
        timestamp,
        title,
        body,
        author,
        category
        })
    })
        .then(res => 
            {
                res.json()
            }
        )
}

export const editPost = (id  = '', {title, body}) => {
    return fetch(`${MAIN_URI}/posts/${id}`, {headers, method: 'PUT', body: JSON.stringify({
        title,
        body,
        })
    })
        .then(res => {return;})
}

export const votePost = (id = '', typeVote) => {
    return fetch(`${MAIN_URI}/posts/${id}`, {headers, method: 'POST', body: JSON.stringify({
      option: typeVote
    })})
    .then(res => res.json());
  }

export const deletePost = (id = '') => {
    return fetch(`${MAIN_URI}/posts/${id}`, {headers, method: 'DELETE'}).then(res => {return;});
}

// API calls for comments

export const getCommentsByPost = (id='') => {
    return fetch(`${MAIN_URI}/posts/${id}/comments`, {headers})
            .then(res => res.json());
}

export const addCommentByPost = ({id, timestamp, body, author, parentId}) => {
    return fetch(`${MAIN_URI}/comments`, {headers, method: 'POST', body: JSON.stringify({
        id,
        timestamp,
        body,
        author,
        parentId
    })
}).then(res => {return;});
}

export const getCommentById = (id = '') => {
    return fetch(`${MAIN_URI}/comments/${id}`, {headers})
    .then(res => res.json());
}

export const voteComment = (id = '', typeVote) => {
        return fetch(`${MAIN_URI}/comments/${id}`, {headers, method: 'POST', body: JSON.stringify({
            option: typeVote
        })
    })
    .then(() => {return;});
}

export const editComment = ({ timestamp, id, body }) => {
        return fetch(`${MAIN_URI}/comments/${id}`, {headers, method: 'PUT', body: JSON.stringify({
            body,
            timestamp
        })
    })
    .then(() => {return;});
}

export const deleteComment = (id = '') => {
    return fetch(`${MAIN_URI}/comments/${id}`, {headers, method: 'DELETE'})
    .then(() => {return;});
}