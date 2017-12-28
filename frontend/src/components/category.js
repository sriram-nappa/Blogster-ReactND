import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
// import uuid from 'react-native-uuid';

import PostsList from './postsList';

import AddPostForm from './addPostForm';

import { getAllCategories } from '../actions/categoryActions';
import { getAllPosts, addPost } from '../actions/postActions';

import './category.css'

const style = {
    addPostBtnStyle : {
        margin: 12,
        color: '#ffffff'        
    },
}

class Category extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalOpen : false,
            isEdit : false,
            selectedPost: {}
        }
        this.closeModal = this.closeModal.bind(this)
        this.editPost = this.editPost.bind(this)
    }

    openModal() {
        console.log('Here')
        this.setState({modalOpen: true})
    }

    closeModal() {
        console.log("Called", this.state)
        this.setState({modalOpen: false, isEdit: false})
    }

    editPost(e) {
        let postId = e.target.parentElement.getAttribute('post-id') || e.target.getAttribute('post-id')
        const {posts} = this.props
        let filteredPost = posts.filter((post) => {
            return post.id === postId
        })
        console.log(filteredPost, "++++++++++++")
        this.setState({isEdit: true, modalOpen:true, selectedPost:{...filteredPost[0]}})
    }

    convertToDate(timestamp) {
        let date = new Date(timestamp);
        let dateString = date.toTimeString()
        return dateString
    }

    render() {
        const {category} = this.props;
        const currentCategory = {category: category.path}
        console.log(this.state, "Stateee")
        // const modalActions = [
        //     <FlatButton
        //       label="Cancel"
        //       primary={true}
        //       onClick={this.closeModal.bind(this)}
        //     />,
        //     <FlatButton
        //       label="Submit"
        //       primary={true}
        //       onClick={this.closeModal.bind(this)}
        //     />,
        // ];
        console.log(this.state.modalOpen, 'Edit Post', this.state.isEdit)
        return (
            <div className="category">
                <div className="category-content">
                    <span className="category-content-header">
                        {category.name}
                    </span>
                    <div className="category-divider">.</div>
                    <FlatButton backgroundColor="#0a4797"
                        hoverColor="#0d3a75"
                        label="Add Post"
                        style={style.addPostBtnStyle}
                        onClick={this.openModal.bind(this)}/>
                    <Dialog
                        title={this.state.isEdit ? "Edit Post" : "Add Post"}
                        // actions={modalActions}
                        modal={true}
                        open={this.state.modalOpen}
                    >
                        <AddPostForm closeModal={this.closeModal} isEdit={this.state.isEdit} selectedPost={this.state.isEdit ? this.state.selectedPost : currentCategory}/> 
                    </Dialog>
                    <div className="category-posts">
                        <PostsList posts={this.props.posts} editPost={this.editPost}/>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    const categoryID = props.categoryid ? props.categoryid : props.match.params.categoryid;
    const postsList = state.posts.posts ? state.posts.posts.filter(post => categoryID === post.category) : [];
    const category = state.categories.categories.find(category => categoryID === category.path) || [];
    console.log("State", postsList)
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