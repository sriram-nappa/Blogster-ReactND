import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Category from '../components/category'
import './categoryList.css'

const style = {
    height: 100,
    width: 100,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
  };
  
  
class CategoryList extends Component {
    render() {
        const {categories} = this.props
        const categoriesWrapper = categories.map((category, i) => (
                <Category key={i} categoryPath={category.name}/>
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