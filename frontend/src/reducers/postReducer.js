import { GET_POSTS } from './../actions/postActions';

const initialState = {
    posts: [],
};

export default (state= initialState, action) => {
    switch (action.type) {
        case GET_POSTS:
        default:
            return state;
    }
};