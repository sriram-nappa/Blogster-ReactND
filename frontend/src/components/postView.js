import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import AddCommentForm from './addCommentForm';

import { getCommentsByPost } from '../actions/commentActions';
import { 
    likePost,
    unlikePost,
    deletePost
} from '../actions/postActions';

import './postView.css'

const style = {
    addCommentBtnStyle : {
        margin: 12,
        color: '#ffffff'        
    },
}

class PostView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalOpen: false,
            isEdit: false
        }
        this.closeModal = this.closeModal.bind(this)
        // this.editComment = this.editComment.bind(this)
    }

    componentDidMount() {
        if (this.props.match.params.postid) {
            this.props.fetchCommentsByPost(this.props.match.params.postid)
        }
    }

    openModal() {
        console.log('Here')
        this.setState({modalOpen: true})
    }

    closeModal() {
        console.log("Called", this.state)
        this.setState({modalOpen: false, isEdit: false})
    }

    render() {
        console.log(this.props)
        const {categoryid, postid} = this.props.match.params 
        return(
            <div className="post">
                <div className="post-content">
                    <span className="post-content-header">
                        {categoryid}
                    </span>
                    <div className="post-divider">.</div>
                    <FlatButton backgroundColor="#0a4797"
                        hoverColor="#0d3a75"
                        label="Add Comment"
                        style={style.addCommentBtnStyle}
                        onClick={this.openModal.bind(this)}/>
                    <Dialog
                        title={this.state.isEdit ? "Edit Comment" : "Add Comment"}
                        modal={true}
                        open={this.state.modalOpen}
                    >
                        <AddCommentForm closeModal={this.closeModal} isEdit={this.state.isEdit}/>
                    </Dialog>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, props) {
    const postId = props.match.params.postid || props.postid
    const post = state.posts.posts.filter((post)=>{ return postId === post.id}) || {}
    const comments = state.comments.comments.filter(comment => postId === comment.parentId)

    console.log(state, props)
    return {
        post: post,
        comments: comments,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchCommentsByPost: (postId) => dispatch(getCommentsByPost(postId)),
        likePost: (postId) => dispatch(likePost(postId)),
        unlikePost: (postId) => dispatch(unlikePost(postId)),
        deletePost: (postId) => dispatch(deletePost(postId)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostView));