import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Menu from "@material-ui/core/Menu";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuItem from "@material-ui/core/MenuItem";
import styles from "./user-jss";
import { makeStyles } from "@material-ui/core";

class DropdownList extends PureComponent {
  state = {
    anchorEl: null,
    openMenu: false,
  };

  openMenu = (event) => {
    this.setState({
      openMenu: true,
      anchorEl: event.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({ anchorEl: null, openMenu: false });
  };

  render() {
    const {
      classes,
      value,
      renderData,
      renderItem,
      placeHolderText,
      onClick,
      renderRightIcon,
      disabled = false,
    } = this.props;
    const { anchorEl, openMenu } = this.state;
    return (
      <>
        <ClickAwayListener onClickAway={this.handleClose}>
          <Button disabled={disabled} className={classes.userButton} onClick={this.openMenu}>
            <span>{value ? value : placeHolderText}</span>
            {renderRightIcon ? renderRightIcon() : <ExpandMoreIcon className={classes.expandIcon} />}
          </Button>
        </ClickAwayListener>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            horizontal: "center",
          }}
          elevation={0}
          disableScrollLock
          transformOrigin={{
            horizontal: "center",
          }}
          open={openMenu}
          onClose={this.handleClose}
          style={{ maxHeight: 300 }}
        >
          {renderData.length
            ? renderData.map((data) =>
              renderItem({
                data,
                onClick,
              })
            )
            : null}
        </Menu>
      </>
    );
  }
}

DropdownList.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.string,
  renderData: PropTypes.array,
  renderChildren: PropTypes.func.isRequired,
};

DropdownList.defaultProps = {
  renderData: [],
  value: null,
};

const useListStyles = makeStyles((theme) => ({
  menuItem: {
    minWidth: 120,
    maxWidth: 180,
    minHeight: 42,
    backgroundColor: '#f6bed6',
  }
}));

export const DefaultMenuItem = ({ children, ...props }) => {
  const classes = useListStyles()
  return (<MenuItem className={classes.menuItem} {...props}>
    {children}
  </MenuItem>)
}

export const renderItem = ({ data, onClick }) => {
  const onChange = () => {
    onClick(data.value);
  };
  return (
    <DefaultMenuItem key={data.text} onClick={onChange} disabled={data.disabled}>
      {data.text}
    </DefaultMenuItem>
  );
};

export default withStyles(styles)(DropdownList);
