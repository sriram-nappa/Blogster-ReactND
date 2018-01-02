import React, { Component } from 'react';
import {Link, withRouter, Switch, Route} from 'react-router-dom';
import { connect } from 'react-redux';

import CategoryView from './components/categoryView';
import { getAllCategories } from './actions/categoryActions'

import Category from './components/category';
import PostView from './components/postView';
import Page404 from './components/errorPage';
import { getAllPosts } from './actions/postActions';

import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import AppBar from 'material-ui/AppBar';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.fetchAllCategories();
    this.props.fetchAllPosts();
  }

  render() {
    const { allCategories, allPosts } = this.props;
    return (
      <div className="App">
        <AppBar title="Blogster" iconElementLeft={<IconButton tooltip="Home"><Link className="appLink" to="/"><ActionHome style={{'marginRight': '24'}}/></Link></IconButton>} style={{'textAlign': 'center'}}/>
        <Switch>
          <Route exact path="/" render={() => <CategoryView categories={allCategories} posts={allPosts}/>}/>
          <Route exact path="/categories/:categoryid" render={() => <Category/>}/>
          <Route exact path="/categories/:categoryid/posts/:postid" render={({match}) => <PostView matchLink={`/categories/${match.params.categoryid}/posts/${match.params.postid}`}/>}/>
          <Route component={Page404}/>
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    allCategories: state.categories.categories,
    allPosts: state.posts.posts
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAllCategories: () => dispatch(getAllCategories()),
    fetchAllPosts: () => dispatch(getAllPosts())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
