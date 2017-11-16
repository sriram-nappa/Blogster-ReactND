import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

class CategoryList extends Component {
    render() {
        return(
            <div className="categoryList">
                Category List
            </div>
        );    
    }
}
//TODO: Should be refactored.
export default CategoryList;