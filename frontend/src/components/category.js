import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
// import uuid from 'react-native-uuid';

import AddPostForm from './addPostForm';

import { getAllCategories } from '../actions/categoryActions';
import { getAllPosts, addPost } from '../actions/postActions';

import './category.css'

const style = {
    dividerStyle : {
        float: 'left',
        marginTop: '25px'
    },
    addPostBtnStyle : {
        margin: 12,
        color: '#ffffff'        
    },
    postsView : {
        height: 250,
        width: 400,
        marginLeft: 20,
        float: 'left',
        padding: 20
    },
    postTitle : {
        color: '#000000',
        fontSize: 18,
        fontWeight: 'bolder',
        marginBottom: 15
    },
    textBold : {
        fontWeight: 'bold'
    },
    textItalics : {
        fontStyle: 'italic'
    },
    postDesc : {
        marginTop: 15
    }
}
class Category extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalOpen : false
        }
        this.closeModal = this.closeModal.bind(this)
    }

    openModal() {
        console.log('Here')
        this.setState({modalOpen: true})
    }

    closeModal() {
        console.log("Called", this.state)
        this.setState({modalOpen: false})
    }

    convertToDate(timestamp) {
        let date = new Date(timestamp);
        let dateString = date.toTimeString()
        return dateString
    }

    renderPosts() {
        var that = this
        const {posts} = this.props
        console.log(posts)
        return(
            posts.map((post, i) => (
                <Paper key={i} style={style.postsView} zDepth={3} rounded={true}>            
                    <div style={style.postTitle}>{post.title}</div>
                    <div>by <span style={style.textBold}>{post.author}</span> posted in <span style={style.textBold}>{post.category}</span></div>
                    <span style={style.textItalics}>{that.convertToDate(post.timestamp)}</span>
                    <div style={style.postDesc}>{post.body}</div>
                </Paper>
            )
        ))
    }

    render() {
        const {category} = this.props;
        const selectedPost = {category: category.path}
        console.log(this.props)
        const modalActions = [
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={this.closeModal.bind(this)}
            />,
            <FlatButton
              label="Submit"
              primary={true}
              onClick={this.closeModal.bind(this)}
            />,
        ];
        console.log(this.state.modalOpen)
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
                        title="Add Post"
                        // actions={modalActions}
                        modal={true}
                        open={this.state.modalOpen}
                    >
                        <AddPostForm closeModal={this.closeModal} isEdit={false} post={selectedPost}/> 
                    </Dialog>
                    <div className="category-posts">
                        {this.renderPosts()}
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