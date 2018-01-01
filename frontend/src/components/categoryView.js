import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

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
            selectedPost: {},
            sortingCriteria: 'timestamp',
            open: false
        }
        this.editPost = this.editPost.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange = (ev) => {
        ev.preventDefault()
        this.setState({
            sortingCriteria: ev.target.textContent ? ev.target.textContent.toLocaleLowerCase() : this.state.sortingCriteria
        })
    }


    sortAllPosts() {
        const sortingCriteria = this.state.sortingCriteria
        console.log(sortingCriteria, 'sort')
        let sortedPosts =  this.props.posts.sort((post1,post2) => {
            switch(sortingCriteria) {
                case 'timestamp':
                    return post2.timestamp - post1.timestamp
                case 'score':
                    return post2.voteScore - post1.voteScore
                default:
                    return null
            }
        })
        console.log('sorted', sortedPosts, this.props.posts)
        return sortedPosts
    }

    editPost(e) {
        let postId = e.target.parentElement.getAttribute('post-id') || e.target.getAttribute('post-id')
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
        const sortedPosts = this.sortAllPosts()
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
                {/* <select value={this.state.sortingCriteria} onChange={(ev) => this.onChange(ev)} ref="sortingSelector">
				  <option value="timestamp">By time</option>
				  <option value="score">By score</option>
                </select> */}
                <DropDownMenu value={this.state.sortingCriteria} onChange={this.handleChange}>
                    <MenuItem value={1} primaryText="Sort By" disabled={true}/>
                    <MenuItem value="score" primaryText="Score" />
                    <MenuItem value="timestamp" primaryText="Timestamp"/>
                </DropDownMenu>
                <div className="category-allposts">
                    <PostsList posts={sortedPosts} editPost={this.editPost} view={'post'}/>
                </div>
            </div>
        );    
    }
}
//TODO: Should be refactored.
export default CategoryView;