import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';

import PostsList from './postsList';
import './categoryView.css';

const style = {
    height: 250,
    width: 250,
    margin: 40,
    padding: 100,
    textAlign: 'center',
    display: 'inline-block',
  };
  
  
class CategoryView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalOpen: false,
            isEdit: true,
            selectedPost: {}
        }
        this.editPost = this.editPost.bind(this)
    }

    editPost(e) {
        let postId = e.target.parentElement.getAttribute('post-id') || e.target.getAttribute('post-id')
        debugger
        const {posts} = this.props
        let filteredPost = posts.filter((post) => {
            return post.id === postId
        })
        this.setState({isEdit: true, modalOpen:true, selectedPost:{...filteredPost[0]}})
    }

    renderCategories(categoryPath) {
        return (
            <div className="category-title">
                <Link to={`/categories/${categoryPath}`} style={{ textDecoration: 'none' }}>
                    <span className="category-title-head">{categoryPath}</span>
                </Link>
            </div>
        )    
    }

    render() {
        const {categories, posts} = this.props
        const categoriesWrapper = categories.map((category, i) => (
            <Paper key={i} style={style} zDepth={3} rounded={true}>            
                {this.renderCategories(category.path)}
            </Paper>
        ));
        return(
            <div>
                <div className="category-content-header">
                        Category
                </div>
                <div className="category-divider">.</div>
                <div className="category-list">
                    {categoriesWrapper}
                </div>
                <div className="category-content-header">
                        Posts
                </div>
                <div className="category-divider">.</div>
                <div className="category-allposts">
                    <PostsList posts={posts} editPost={this.editPost} view={'post'}/>
                </div>
            </div>
        );    
    }
}
//TODO: Should be refactored.
export default CategoryView;