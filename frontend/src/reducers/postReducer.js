import { 
    GET_POSTS,
    ADD_POST,
    UPDATE_POST,
    DELETE_POST,
    UNLIKE_POST,
    LIKE_POST
} from './../actions/postActions';

const initialState = {
    posts: [],
};

export default (state= initialState, action) => {
    switch (action.type) {
        case GET_POSTS:
        case ADD_POST:
        case DELETE_POST:
        case UNLIKE_POST:
        case LIKE_POST:
        case UPDATE_POST:
            return Object.assign({}, state, {
                posts: action.posts
            })
        default:
            return state;
    }
};