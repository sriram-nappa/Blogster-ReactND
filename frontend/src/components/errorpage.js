import React, {Component} from 'react';
import { withRouter } from 'react-router-dom'

class ErrorPage extends Component {

  render() {
    return (
      <div className="page-404">
        <h1>PAGE NOT FOUND</h1>
      </div>
    );
  }

}

export default withRouter(ErrorPage);