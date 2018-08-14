import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class FormDialog extends React.Component {
  state = {
    open: false,
    textField: {
        name: '',
        genre: '',
        stock: '',
    }
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleTextFieldChange(event, input) {
    const textField = this.state.textField;
    textField[input] = event.target.value;
    this.setState({
        textField: textField
    });
  }

  render() {
    return (
      <div>
        <Button onClick={this.handleClickOpen} color='secondary' variant='raised'>Add new movie</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add a Movie</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please fill the movie's data. If the movie exists in the database it will only be modified.
            </DialogContentText>
            <TextField autoFocus margin="dense" id="name" label="Title" fullWidth value={this.state.textField.name} onChange={event=>this.handleTextFieldChange(event,'name')}/>
            <TextField autoFocus margin="dense" id="genre" label="Genre" fullWidth value={this.state.textField.genre} onChange={event=>this.handleTextFieldChange(event,'genre')}/>
            <TextField autoFocus margin="dense" id="name" label="Availablitiy" fullWidth value={this.state.textField.stock} onChange={event=>this.handleTextFieldChange(event,'stock')}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={()=>this.props.handle(this.state.textField)} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}