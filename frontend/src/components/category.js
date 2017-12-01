import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

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
    }
}
class Category extends Component {
    state = {
        modalOpen : false
    }

    openModal() {
        console.log('Here')
        this.setState({modalOpen: true})
    }

    closeModal() {
        this.setState({modalOpen: false})
    }

    render() {
        const {category} = this.props;
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
                        actions={modalActions}
                        modal={true}
                        open={this.state.modalOpen}
                    >
                        <AddPostForm isEdit={false}/> 
                    </Dialog>
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