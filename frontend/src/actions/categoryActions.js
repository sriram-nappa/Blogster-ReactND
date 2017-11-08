import * as serverAPI from './../utils/serverAPI';

export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_POSTS_BY_CATEGORY = 'GET_POSTS_BY_CATEGORIES';

export function getAllCategories() {
    return (dispatch) => {
        serverAPI.getCategories().then(data => {
            dispatch(getAllCategoriesSuccess(data.categories))
        }).catch(error => {
            console.log('error!')
            throw(error)
        })
    }
}

export function getAllCategoriesSuccess(categories) {
    return ({
        type: GET_CATEGORIES,
        categories
    })
}