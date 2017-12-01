import React, {Component} from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import {Link, withRouter, Switch, Route} from 'react-router-dom';

import {
    addPost,
    updatePost
} from '../actions/postActions';

import { addCommentByPost } from '../utils/serverAPI';

class AddPostForm extends Component {

    state = {
        body: '',
        author: '',
        title: ''
    }

    componentDidMount() {
        const {body, author, title} = this.props.post;
        this.setState({body, author, title})
    }

    render() {
        return (
            <div>
                <form>
                    {
                        this.props.isEdit ? null
                        : <div>
                            <label>Author : </label>
                            <TextField name="author" hintText="Name" />
                        </div>
                    }
                    <div>
                        <label>Title : </label>
                        <TextField name="title" hintText="Title" />
                    </div>
                    <div>
                        <label>Description : </label>
                        <TextField name="description" hintText="Description" />
                    </div>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        updatePost : (post) => dispatch(updatePost(post)),
        addPost : (post) => dispatch(addPost(post)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPostForm)