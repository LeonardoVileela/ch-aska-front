import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Toolbar
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InputIcon from '@material-ui/icons/Input';
import Logo from './Logo';
import AuthService from 'src/api/AuthService';
import { Navigate } from 'react-router-dom';


const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
  useState([]);
  const [logoutOpen, setLogout] = useState(false);
  if (logoutOpen) {
    return <Navigate to="/login" />
  }
  return (
    <>
      <AppBar
        elevation={0}
        {...rest}
      >
        <Toolbar>
          <Logo />
          <Box sx={{ flexGrow: 1 }} />
          <Hidden lgDown>
            <IconButton color="inherit"
              onClick={() => {
                AuthService.logout()
                setLogout(true)
              }
              }
            >
              <InputIcon />
            </IconButton>
          </Hidden>
          <Hidden lgUp>
            <IconButton
              color="inherit"
              onClick={onMobileNavOpen}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
        </Toolbar>
      </AppBar>
    </>
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func
};

export default DashboardNavbar;



