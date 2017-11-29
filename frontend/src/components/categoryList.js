import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';

import Category from '../components/category'
import './categoryList.css'

const style = {
    height: 250,
    width: 250,
    margin: 40,
    padding: 100,
    textAlign: 'center',
    display: 'inline-block',
  };
  
  
class CategoryList extends Component {
    render() {
        const {categories} = this.props
        const categoriesWrapper = categories.map((category, i) => (
            <Paper key={i} style={style} zDepth={3} rounded={true}>            
                <Category categoryPath={category.name}/>
            </Paper>
        ));
        console.log(categoriesWrapper)
        return(
            <div className="categoryList">
                {categoriesWrapper}
            </div>
        );    
    }
}
//TODO: Should be refactored.
export default CategoryList;