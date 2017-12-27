import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';

const style = {
    height: 250,
    width: 250,
    margin: 40,
    padding: 100,
    textAlign: 'center',
    display: 'inline-block',
  };
  
  
class PostsList extends Component {

    render() {
        return(
            <div>
                "Hello this is posts page"
            </div>
        );    
    }
}
//TODO: Should be refactored.
export default PostsList;