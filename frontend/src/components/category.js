import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {GridTile} from 'material-ui/GridList'

const styles = {
    titleStyle: {
        color: '#000000',
    },
}

class Category extends Component {
    render() {
        const {categoryPath} = this.props;
        return (
            <div className="category">
                <Link to={`/categories/${categoryPath}`}>
                    <GridTile
                        title={categoryPath}
                        titleStyle={styles.titleStyle}
                        titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                    >
                    </GridTile>
                </Link>
            </div>
        )
    }
}

export default Category;