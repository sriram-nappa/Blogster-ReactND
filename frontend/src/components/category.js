import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import './category.css'

class Category extends Component {
    render() {
        const {categoryPath} = this.props;
        return (
            <div className="category">
                <div className="category-title">
                    <Link to={`/categories/${categoryPath}`} style={{ textDecoration: 'none' }}>
                        <span className="category-title-head">{categoryPath}</span>
                    </Link>
                </div>    
            </div>
        )
    }
}

export default Category;