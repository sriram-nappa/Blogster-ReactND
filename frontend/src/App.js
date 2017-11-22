import React, { Component } from 'react';
import {Link, withRouter, Switch, Route} from 'react-router-dom';
import { connect } from 'react-redux';

import CategoryList from './components/categoryList';
import { getAllCategories } from './actions/categoryActions'

import PostsList from './components/postsList';

import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import AppBar from 'material-ui/AppBar';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.fetchAllCategories();
  }

  render() {
    const { allCategories } = this.props;
    console.log(allCategories)

    return (
      <div className="App">
        <AppBar title="Blogster" iconElementLeft={<IconButton tooltip="Home"><Link className="appLink" to="/"><ActionHome style={{'marginRight': '24'}}/></Link></IconButton>} style={{'textAlign': 'center'}}/>
        <Switch>
          <Route exact path="/" render={() => <CategoryList categories={allCategories}/>}/>
          <Route exact path="/categories/:categoryid" render={() => <PostsList/>}/>
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    allCategories: state.categories.categories
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAllCategories: () => dispatch(getAllCategories())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
