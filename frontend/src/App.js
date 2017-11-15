import React, { Component } from 'react';
import {Link, withRouter, Switch, Route} from 'react-router-dom';
import { connect } from 'react-redux';

import CategoryList from './components/categoryList';
import { getAllCategories } from './actions/categoryActions'

import HomeIcon from 'react-icons/lib/fa/home';
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
        <Link className="appLink" to="/">
          <HomeIcon size={40}/>
        </Link>
        <Switch>
          <Route exact path="/" render={() => <CategoryList categories={allCategories}/>}/>
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
