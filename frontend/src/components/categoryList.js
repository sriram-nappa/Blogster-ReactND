import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import './categoryList.css'

class CategoryList extends Component {
    render() {
        const {categories} = this.props
        const categoriesWrapper = categories.map((category, i) => (
            <ListItem
                primaryText={category.name} />
        ));
        return(
            <div className="categoryList">
                Category List
                <List>
                    {categoriesWrapper}
                </List>
            </div>
        );    
    }
}
//TODO: Should be refactored.
export default CategoryList;