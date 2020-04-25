import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import { Menu } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import MenuBookIcon from '@material-ui/icons/MenuBook';

const styles = theme => ({
  buttonCollapse: {
    [theme.breakpoints.up("sm")]: {
      display: "none"
    },
    margin: "10px",
    boxShadow: "none"
  }
});

class ButtonAppBarCollapseOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    };
    this.handleMenu = this.handleMenu.bind(this);
  }
  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.buttonCollapse}>
        <IconButton onClick={this.handleMenu}>
          <MenuBookIcon color="secondary" />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={open}
          onClose={this.handleClose}
        >
          {this.props.children}
        </Menu>
      </div>
    );
  }
}
export default withStyles(styles)(ButtonAppBarCollapseOut);
