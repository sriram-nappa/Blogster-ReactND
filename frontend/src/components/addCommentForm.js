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
        }
        this.submitForm = this.submitForm.bind(this);
    }
    
    componentDidMount() {
        console.log(this.props)
        const {body, author} = this.props.selectedComment ? this.props.selectedComment : '';
        this.setState({body, author})
    }

    submitForm = (ev) => {
        ev.preventDefault()
        const {id, timestamp, parentId} = this.props.selectedComment
        const comment = Object.assign({}, this.state, {
            id: id || uuid.v4(),
            timestamp: timestamp || Date.now(),
            parentId: parentId
        });
        debugger
        if (!this.props.isEdit) {
            this.props.addComment(comment)
        } else {
            this.props.updateComment(comment)
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
        const {closeModal, selectedComment, isEdit} = this.props;   
        console.log(selectedComment, '=============')
        return (
            <div>
                <form>
                    {
                        isEdit ? 
                        <div>
                            <label>Author : </label>
                            <TextField name="author" defaultValue={selectedComment.author} disabled={true}/>
                        </div>
                        : <div>
                            <label>Author : </label>
                            <TextField name="author" onChange={this.handleAuthorUpdate} hintText="Name" />
                        </div>
                    }
                    <div>
                        <label>Description : </label>
                        <TextField name="body" defaultValue={isEdit ? selectedComment.body : ''} onChange={this.handleDescriptionUpdate} hintText="Description" />
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