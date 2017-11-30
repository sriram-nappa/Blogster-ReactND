import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class Modal extends Component {
    state = {
        modalState: this.props.modalOpen || false
    }
    
    handleOpen = (e) => {
        e.preventDefault();
        this.setState({modalState: true})
    }
    
    handleClose = () => {
        this.setState({modalState: false})
    }

    render() {
        const { formType } = this.props;        
        const actions = [
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={this.handleClose}
            />,
            <FlatButton
              label="Submit"
              primary={true}
              disabled={true}
              onClick={this.handleClose}
            />,
          ];
        if (formType === 'post') {
            return (
                <div>
                  <Dialog
                    title="Add Post"
                    actions={actions}
                    modal={true}
                    open={this.state.modalState}
                  >
                    Only actions can close this dialog.
                  </Dialog>
                </div>
            )
        } else {
            return (
                <div>
                  <Dialog
                    title="Add Comment"
                    actions={actions}
                    modal={true}
                    open={this.state.modalState}
                  >
                    Only actions can close this dialog.
                  </Dialog>
                </div>
            )
        }
    }
}

export default Modal;
