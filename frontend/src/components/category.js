import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { getAllCategories } from '../actions/categoryActions';
import { getAllPosts } from '../actions/postActions';

import './category.css'

class Category extends Component {

    render() {
        const {categoryPath} = this.props;
        return (
            <div className="category">
                <div className="category-title">
                    <Link to={`/categories/${categoryPath}`} style={{ textDecoration: 'none' }}>
                        <span className="category-title-head">{categoryPath}</span>
                    </Link>
                </div>    
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    const categoryID = props.categoryid ? props.categoryid : props.match.params.categoryid;
    const postsList = state.posts.posts ? state.posts.posts.filter(post => categoryID === post.category) : [];
    const category = state.categories.categories.find(category => categoryID === category.path) || [];
    console.log("State", category, postsList)
    return {
        category: category,
        posts: postsList
    }
}

function mapDispatchToProps(dispatch) {
    return {
      fetchAllCategories: () => dispatch(getAllCategories()),
      fetchAllPosts: () => dispatch(getAllPosts())
    };
}
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Category));