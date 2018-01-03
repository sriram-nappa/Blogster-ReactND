import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import AddPostForm from './addPostForm'
import AddCommentForm from './addCommentForm';
import PostsList from './postsList';
import ErrorPage from './errorPage';

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
            postModalOpen: false,
            isPostEdit: false,
            selectedPost: {},
            commentModalOpen: false,
            isCommentEdit: false,
            selectedComment: {}
        }
        this.closePostModal = this.closePostModal.bind(this)
        this.editPost = this.editPost.bind(this)
        this.closeCommentModal = this.closeCommentModal.bind(this)
        this.editComment = this.editComment.bind(this)
    }

    componentDidMount() {
        if (this.props.match.params.postid) {
            this.props.fetchCommentsByPost(this.props.match.params.postid)
        }
    }

    openPostModal() {
        this.setState({postModalOpen: true})
    }

    closePostModal() {
        this.setState({postModalOpen: false, isPostEdit: false})
    }

    editPost(e) {
        const {post} = this.props
        this.setState({isPostEdit: true, postModalOpen:true, selectedPost:{...post[0]}})
    }

    openCommentModal() {
        this.setState({commentModalOpen: true})
    }

    closeCommentModal() {
        this.setState({commentModalOpen: false, isCommentEdit: false})
    }

    editComment(e) {
        const {comments} = this.props
        let postId = e.target.parentElement.getAttribute('post-id') || e.target.getAttribute('post-id')
        let comment = comments.find((comment) => {return comment.id === postId})
        this.setState({isCommentEdit: true, commentModalOpen:true, selectedComment:{...comment}})
    }

    render() {
        const {categoryid, postid} = this.props.match.params 
        const {selectedPost, selectedComment} = this.state
        const currentCommentObj = {'parentId': postid}
        if(this.props.posts && Object.keys(this.props.posts).length !== 0) {
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
                            onClick={this.openCommentModal.bind(this)}/>
                        <span className="post-content-sub-header">
                            Post
                        </span>
                        <Dialog
                            title={this.state.isPostEdit ? "Edit Post" : "Add Post"}
                            modal={true}
                            open={this.state.postModalOpen}
                        >
                            <AddPostForm closeModal={this.closePostModal} isEdit={this.state.isPostEdit} selectedPost={selectedPost}/>                         
                        </Dialog>
                        <Dialog
                            title={this.state.isCommentEdit ? "Edit Comment" : "Add Comment"}
                            modal={true}
                            open={this.state.commentModalOpen}
                        >
                            <AddCommentForm closeModal={this.closeCommentModal} isEdit={this.state.isCommentEdit} selectedComment={this.state.isCommentEdit? selectedComment : currentCommentObj}/>
                        </Dialog>
                        <div className="post-selected">
                            <PostsList posts={this.props.post} editPost={this.editPost} view={'comment'} isComment={false} history={this.props.history}/>
                        </div>
                        <span className="post-content-sub-header">
                            Comments
                        </span>
                        <div className="post-comments">
                            <PostsList posts={this.props.comments} editPost={this.editComment} view={'comment'} isComment={true}/>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <ErrorPage/>
            )
        }
    }
}

function mapStateToProps(state, props) {
    const postId = props.match.params.postid || props.postid
    const post = state.posts.posts.filter((post)=>{ return postId === post.id}) || {}
    const comments = state.comments.comments.filter(comment => postId === comment.parentId)
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