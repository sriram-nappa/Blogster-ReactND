import * as serverAPI from './../utils/serverAPI';

export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_POSTS_BY_CATEGORY = 'GET_POSTS_BY_CATEGORIES';

export function getAllCategories() {
    serverAPI.getCategories().then(({categories}) => {
        return {
            type: GET_CATEGORIES,
            categories: categories
        }
    })
}