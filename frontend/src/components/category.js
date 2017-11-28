import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';

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
                <Paper style={style} zDepth={3} rounded={true}>
                    <Link to={`/categories/${categoryPath}`} style={{ textDecoration: 'none' }}>
                        <span className="category">{categoryPath}</span>
                    </Link>
                </Paper>
        )
    }
}

export default Category;