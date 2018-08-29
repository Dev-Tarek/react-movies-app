import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    display: 'inline-block',
    marginTop: theme.spacing.unit * 2,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

class ControlledOpenSelect extends React.Component {
  state = {
    items: this.props.items,
    item: 'All',
    open: false,
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.props.handle(event.target.value);
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const { classes } = this.props;
    return (
      <form autoComplete="off">
        {this.props.button?
        <Button className={classes.button} onClick={this.handleOpen}>
          {this.props.button}
        </Button>
        :null}
        <FormControl className={classes.formControl}>
          {/*<InputLabel htmlFor="controlled-open-select">{this.props.name}</InputLabel>*/}
          <Select
            open={this.state.open}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            value={this.state.item}
            onChange={this.handleChange}
            inputProps={{
              name: 'item',
              id: 'controlled-open-select',
            }}
          >
            <MenuItem value="All">
              <em>All</em>
            </MenuItem>
            {this.state.items.map((item, index) => {
                return <MenuItem key={index} value={item.name}>{item.name}</MenuItem>
            })}
          </Select>
        </FormControl>
      </form>
    );
  }
}
/*
        
*/

ControlledOpenSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlledOpenSelect);