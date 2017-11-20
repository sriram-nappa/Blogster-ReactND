import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import {List, ListItem} from 'material-ui/List';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import './categoryList.css'

const styles = {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    },
    gridList: {
      display: 'flex',
      flexWrap: 'nowrap',
      overflowX: 'auto',
    },
    titleStyle: {
      color: '#000000',
    },
  };
  
  
class CategoryList extends Component {
    render() {
        const {categories} = this.props
        const categoriesWrapper = categories.map((category, i) => (
            <Link className='categoryList'
                to="/categories/" + {category.name}>
                <GridTile
                    title={category.name}
                    titleStyle={styles.titleStyle}
                    // titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                >
            </Link>
            {/* <img src={tile.img} /> */}
          </GridTile>
        ));
        return(
            <div className="categoryList">
                <GridList style={styles.gridList} cols={2.2}>
                    {categoriesWrapper}
                </GridList>
            </div>
        );    
    }
}
//TODO: Should be refactored.
export default CategoryList;