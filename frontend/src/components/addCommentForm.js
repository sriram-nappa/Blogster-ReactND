import React, {Component} from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import uuid from 'react-native-uuid';

import {Link, withRouter, Switch, Route} from 'react-router-dom';

import {
    addComment,
    updateComment
} from '../actions/commentActions';

class AddCommentForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            body: '',
            author: '',
            title: ''
        }
        this.submitForm = this.submitForm.bind(this);
    }
    
    componentDidMount() {
        console.log(this.props)
        const {body, author} = this.props.selectedPost ? this.props.selectedPost : '';
        this.setState({body, author})
    }

    submitForm = (ev) => {
        ev.preventDefault()
        const {id, timestamp, category} = this.props.selectedPost
        const post = Object.assign({}, this.state, {
            category,
            id: id || uuid.v4(),
            timestamp: timestamp || Date.now()
        });
        if (!this.props.isEdit) {
            console.log(post)
            this.props.addPost(post)
        } else {
            this.props.updatePost(post)
        }
        this.props.closeModal()
    }

    handleAuthorUpdate = (ev) => {
        ev.preventDefault()
        this.setState({author: ev.target.value})
    }

    handleDescriptionUpdate = (ev) => {
        ev.preventDefault()
        this.setState({body: ev.target.value})
    }

    render() {
        const {closeModal, selectedPost, isEdit} = this.props;   
        console.log(selectedPost, '=============')
        return (
            <div>
                <form>
                    {
                        isEdit ? 
                        <div>
                            <label>Author : </label>
                            <TextField name="author" defaultValue={selectedPost.author} disabled={true}/>
                        </div>
                        : <div>
                            <label>Author : </label>
                            <TextField name="author" onChange={this.handleAuthorUpdate} hintText="Name" />
                        </div>
                    }
                    <div>
                        <label>Description : </label>
                        <TextField name="body" defaultValue={isEdit ? selectedPost.body : ''} onChange={this.handleDescriptionUpdate} hintText="Description" />
                    </div>
                    <FlatButton
                        label="Submit"
                        primary={true}
                        onClick={this.submitForm}
                    />
                    <FlatButton
                        label="Cancel"
                        primary={true}
                        onClick={closeModal}
                    />
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log(state)
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        updateComment : (post) => dispatch(addComment(post)),
        addComment : (post) => dispatch(addComment(post)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCommentForm)