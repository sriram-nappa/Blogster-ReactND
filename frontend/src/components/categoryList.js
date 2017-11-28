import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Drawer from 'material-ui/Drawer';

import Category from '../components/category'
import './categoryList.css'

const styles = {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    },
    gridList: {
        width: 500,
        height: 450,
        display: 'flex',
        flexWrap: 'nowrap',
        overflowX: 'auto',
    },
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
                <Drawer docked={true} containerStyle={{'marginTop':'50px'}}>
                    {categoriesWrapper}
                </Drawer>
            </div>
        );    
    }
}
//TODO: Should be refactored.
export default CategoryList;