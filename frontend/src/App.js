import React, { Component } from 'react';
import {Link, withRouter, Switch, Route} from 'react-router-dom';
import { connect } from 'react-redux';

import CategoryList from './components/categoryList';
import { getAllCategories } from './actions/categoryActions'

import Category from './components/category';

import PostsList from './components/postsList';
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
    const { allCategories } = this.props;

    return (
      <div className="App">
        <AppBar title="Blogster" iconElementLeft={<IconButton tooltip="Home"><Link className="appLink" to="/"><ActionHome style={{'marginRight': '24'}}/></Link></IconButton>} style={{'textAlign': 'center'}}/>
        <Switch>
          <Route exact path="/" render={() => <CategoryList categories={allCategories}/>}/>
          <Route exact path="/categories/:categoryid" render={() => <Category/>}/>
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state)
  return {
    allCategories: state.categories.categories
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAllCategories: () => dispatch(getAllCategories()),
    fetchAllPosts: () => dispatch(getAllPosts())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
