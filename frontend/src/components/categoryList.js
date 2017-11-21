import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import {List, ListItem} from 'material-ui/List';
import {GridList} from 'material-ui/GridList';
import {Category} from './category'
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
        overflowY: 'auto',
    },
  };
  
  
class CategoryList extends Component {
    render() {
        const {categories} = this.props
        const categoriesWrapper = categories.map((category, i) => (
                <Category categoryPath={category.name}/>
        ));
        return(
            <div className="categoryList">
                <div className={styles.root}>
                    <GridList style={styles.gridList} cellHeight={180}>
                        {categoriesWrapper}
                    </GridList>
                </div>
            </div>
        );    
    }
}
//TODO: Should be refactored.
export default CategoryList;