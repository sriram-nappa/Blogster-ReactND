import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import MenuItem from 'material-ui/MenuItem';

import './category.css'

const style = {
    height: 250,
    width: 250,
    margin: 40,
    padding: 100,
    textAlign: 'center',
    display: 'inline-block',
};

const tileImages = {

}

class Category extends Component {
    render() {
        const {categoryPath} = this.props;
        return (
            <MenuItem>
                <Link to={`/categories/${categoryPath}`}>
                    {categoryPath}
                </Link>
            </MenuItem>
        )
    }
}

export default Category;