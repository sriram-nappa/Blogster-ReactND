import React, { Component } from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import Modal from 'react-modal'
import Paper from 'material-ui/Paper';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';

import {
    likePost,
    unlikePost,
    deletePost
} from '../actions/postActions'

import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import Delete from 'material-ui/svg-icons/action/delete';
import ThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ThumbDown from 'material-ui/svg-icons/action/thumb-down';
import ThumbsUpdown from 'material-ui/svg-icons/action/thumbs-up-down';
import CommentCount from 'material-ui/svg-icons/editor/mode-comment';

const style = {
    postsView : {
        height: 250,
        width: 400,
        marginLeft: 20,
        marginTop: 20,
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
    },
    editBtn: {
        right: 0
    },
    postTools: {
        textAlign: 'right'
    },
    sectionLeft : {
        width: '20%',
        float: 'left',
        marginTop: 20
    },
    sectionRight : {
        width: '80%',
        float: 'left'
    },
}

class PostsList extends Component {
    constructor(props) {
        super(props)

        this.voteUp = this.voteUp.bind(this)
        this.voteDown = this.voteDown.bind(this)
        this.removePost = this.removePost.bind(this)
    }

    voteUp(e) {
        e.preventDefault()
        let postId = e.target.parentElement.getAttribute('post-id') || e.target.getAttribute('post-id')
        this.props.likePost(postId)
    }

    voteDown(e) {
        e.preventDefault()
        let postId = e.target.parentElement.getAttribute('post-id') || e.target.getAttribute('post-id')
        this.props.unlikePost(postId)
    }

    removePost(e) {
        e.preventDefault()
        let postId = e.target.parentElement.getAttribute('post-id') || e.target.getAttribute('post-id')
        this.props.deletePost(postId)
    }

    convertToDate(timestamp) {
        let date = new Date(timestamp);
        let dateString = date.toTimeString()
        return dateString
    }

    renderPosts() {
        var that = this
        const {posts} = this.props
        console.log(posts, this.props)
        return(
            posts.map((post, i) => (
                <Paper key={post.id} style={style.postsView} zDepth={3} rounded={true}>   
                    <div style={style.sectionLeft}>
                        <Badge
                            badgeContent={post.voteScore}
                            primary={true}
                            badgeStyle={{top: 20, right: 20}}
                            >
                            <IconButton tooltip='Votes'>
                                <ThumbsUpdown/>
                            </IconButton>
                        </Badge>
                        <Badge
                            badgeContent={post.commentCount}
                            primary={true}
                            badgeStyle={{top: 20, right: 20}}
                            >
                            <Link to={`/categories/${post.category}/posts/${post.id}`} style={{ textDecoration: 'none' }}>
                                <IconButton tooltip='Comments'>
                                    <CommentCount/>
                                </IconButton>
                            </Link>
                        </Badge>
                    </div>
                    <div style={style.sectionRight}>
                        <div style={style.postTools}>
                            <IconButton tooltip='Edit' onClick={ (e)=> that.props.editPost(e) }>
                                <ModeEdit post-id={post.id} style={style.editBtn}/>
                            </IconButton>
                            <IconButton tooltip='Like'>
                                <ThumbUp post-id={post.id} onClick={ (e)=> that.voteUp(e) }/>
                            </IconButton>
                            <IconButton tooltip='Dislike'>
                                <ThumbDown post-id={post.id} onClick={ (e)=> that.voteDown(e) }/>
                            </IconButton>
                            <IconButton tooltip='Delete'>
                                <Delete post-id={post.id} onClick={ (e)=> that.removePost(e) }/>
                            </IconButton>
                        </div>
                        <span style={style.postTitle}>{post.title}</span>
                        <div>by <span style={style.textBold}>{post.author}</span> posted in <span style={style.textBold}>{post.category}</span></div>
                        <span style={style.textItalics}>{that.convertToDate(post.timestamp)}</span>
                        <div style={style.postDesc}>{post.body}</div>
                    </div>
                </Paper>
            )
        ))
    }

    render() {
        return (
            this.renderPosts()
        )
    }
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        likePost : (post) => dispatch(likePost(post)),
        unlikePost : (post) => dispatch(unlikePost(post)),
        deletePost : (post) => dispatch(deletePost(post))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsList);