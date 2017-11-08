import {combineReducers} from 'redux';

import categoryReducer from './categoryReducer';
import postReducer from './postReducer';
// import commentReducer from './commentReducer';

const rootReducer = combineReducers({
    categories: categoryReducer,
    posts: postReducer,
    // comments: commentReducer
})

export default rootReducer