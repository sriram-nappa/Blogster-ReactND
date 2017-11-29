import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';

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
        const {categories} = this.props
        const categoriesWrapper = categories.map((category, i) => (
            <Paper key={i} style={style} zDepth={3} rounded={true}>            
                {this.renderCategories(category.path)}
            </Paper>
        ));
        return(
            <div className="category-list">
                {categoriesWrapper}
            </div>
        );    
    }
}
//TODO: Should be refactored.
export default CategoryList;