import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import Sale from 'src/pages/Sale';
import Client from 'src/pages/Client';
import Dashboard from 'src/pages/Dashboard';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import AddProduct from 'src/pages/AddProduct';
import AddClient from 'src/pages/AddClient';
import AddEmployee from 'src/pages/AddEmployee';
import AddSale from 'src/pages/AddSale';
import Register from 'src/pages/Register';
import Employee from 'src/pages/Employee';
import EditClient from './pages/EditClient';
import Product from 'src/pages/Product';
import EditProduct from './pages/EditProduct';
import ApiService from './api/ApiService';
var routes = []
if (ApiService.getJWTTokenData() !== null) {
  if (ApiService.getJWTTokenData().admin) {
    routes = [
      {
        path: 'app',
        element: <DashboardLayout />,
        children: [
          { path: 'sale', element: <Sale /> },
          { path: 'client', element: <Client /> },
          { path: 'addClient', element: <AddClient /> },
          { path: 'editClient/:id', element: <EditClient /> },//rota pra editar cliente
          { path: 'dashboard', element: <Dashboard /> },
          { path: 'products', element: <Product /> },
          { path: 'editProduct/:id', element: <EditProduct /> },
          { path: 'addProduct', element: <AddProduct /> },
          { path: 'employee', element: <Employee /> },
          { path: 'addEmployee', element: <AddEmployee /> },
          { path: 'addSale/:id', element: <AddSale /> },
          { path: '*', element: <Navigate to="/404" /> }
        ]
      },
      {
        path: '/',
        element: <MainLayout />,
        children: [
          { path: 'login', element: <Login /> },
          { path: 'register', element: <Register /> },
          { path: '404', element: <NotFound /> },
          { path: '/', element: <Navigate to="/app/dashboard" /> },
          { path: '*', element: <Navigate to="/404" /> }
        ]
      }
    ]

  } else {

    routes = [
      {
        path: 'app',
        element: <DashboardLayout />,
        children: [
          { path: 'sale', element: <Sale /> },
          { path: 'client', element: <Client /> },
          { path: 'addClient', element: <AddClient /> },
          { path: 'editClient/:id', element: <EditClient /> },//rota pra editar cliente
          { path: 'dashboard', element: <Dashboard /> },
          { path: 'products', element: <Product /> },
          { path: 'addSale/:id', element: <AddSale /> },
          { path: '*', element: <Navigate to="/404" /> }
        ]
      },
      {
        path: '/',
        element: <MainLayout />,
        children: [
          { path: 'login', element: <Login /> },
          { path: 'register', element: <Register /> },
          { path: '404', element: <NotFound /> },
          { path: '/', element: <Navigate to="/app/dashboard" /> },
          { path: '*', element: <Navigate to="/404" /> }
        ]
      }
    ]
  }
} else {
  routes = [
    {
      path: 'app',
      element: <DashboardLayout />,
      children: [
        { path: 'sale', element: <Sale /> },
        { path: 'client', element: <Client /> },
        { path: 'addClient', element: <AddClient /> },
        { path: 'editClient/:id', element: <EditClient /> },//rota pra editar cliente
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'products', element: <Product /> },
        { path: 'editProduct/:id', element: <EditProduct /> },
        { path: 'addProduct', element: <AddProduct /> },
        { path: 'employee', element: <Employee /> },
        { path: 'addEmployee', element: <AddEmployee /> },
        { path: 'addSale/:id', element: <AddSale /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/app/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    }
  ]

}


export default routes;
