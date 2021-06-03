import PropTypes from 'prop-types';
import {
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  Button
} from '@material-ui/core';
import {
  BarChart as BarChartIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  Users as UsersIcon,
  ShoppingCart
} from 'react-feather';
import NavItem from './NavItem';
import InputIcon from '@material-ui/icons/Input';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from 'src/api/AuthService';
import ApiService from 'src/api/ApiService';

const user = {
  jobTitle: `${ApiService.getJWTTokenData() === null ? "" : ApiService.getJWTTokenData().admin ? 'Administrador' : 'Funcionário'}`,
  name: `${ApiService.getJWTTokenData() === null ? "" : ApiService.getJWTTokenData().username}`
};
var items = []
if (ApiService.getJWTTokenData() != null) {
  items = ApiService.getJWTTokenData().admin ? [
    {
      href: '/app/dashboard',
      icon: BarChartIcon,
      title: 'Dashboard'
    },
    {
      href: '/app/client',
      icon: UsersIcon,
      title: 'Clientes'
    },
    {
      href: '/app/products',
      icon: ShoppingBagIcon,
      title: 'Produtos'
    },
    {
      href: '/app/sale',
      icon: ShoppingCart,
      title: 'Vendas'
    },
    {
      href: '/app/employee',
      icon: UserIcon,
      title: 'Funcionários'
    }
  ] : [
    {
      href: '/app/dashboard',
      icon: BarChartIcon,
      title: 'Dashboard'
    },
    {
      href: '/app/client',
      icon: UsersIcon,
      title: 'Clientes'
    },
    {
      href: '/app/products',
      icon: ShoppingBagIcon,
      title: 'Produtos'
    },
    {
      href: '/app/sale',
      icon: ShoppingCart,
      title: 'Vendas'
    }
  ];

}



const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  useState([]);
  const [logoutOpen, setLogout] = useState(false);
  if (logoutOpen) {
    return <Navigate to="/login" />
  }
  const content = (
    <Box
      sx={{
        backgroundColor: "#e3f1fc",
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        sx={{
          alignItems: 'left',
          display: 'flex',
          flexDirection: 'column',
          p: 2
        }}
      >
        <Typography
          color="textPrimary"
          variant="h5"
        >
          {user.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {user.jobTitle}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box>
        <Hidden lgUp>
          <Button onClick={() => {
            AuthService.logout()
            setLogout(true)
          }
          }>Sair <div style={{ marginLeft: 5, marginTop: 4 }}>< InputIcon /></div> </Button>
        </Hidden>
      </Box>
    </Box>
  );
  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};

export default DashboardSidebar;
