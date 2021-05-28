import { Helmet } from 'react-helmet';
import {
  Box,
  Container
} from '@material-ui/core';
import React, { Component } from 'react'
import SaleTable from 'src/components/sale/SaleTable';
import SaleTableAdmin from 'src/components/sale/SaleTableAdmin';
import ApiService from '../api/ApiService'


export default class Sale extends Component {
  render() {
    if (ApiService.getJWTTokenData() !== null) {
      if (ApiService.getJWTTokenData().admin) {
        return (
          <>
            <Helmet>
              <title>Customers | Material Kit</title>
            </Helmet>
            <Box
              sx={{
                backgroundColor: 'white',
                minHeight: '100%',
                py: 3
              }}
            >
              <Container maxWidth={false}>
                <Box sx={{ pt: 3 }}>
                  <SaleTableAdmin />
                </Box>
              </Container>
            </Box>
          </>
        )
      } else {
        return (
          <>
            <Helmet>
              <title>Customers | Material Kit</title>
            </Helmet>
            <Box
              sx={{
                backgroundColor: 'white',
                minHeight: '100%',
                py: 3
              }}
            >
              <Container maxWidth={false}>
                <Box sx={{ pt: 3 }}>
                  <SaleTable />
                </Box>
              </Container>
            </Box>
          </>
        )
      }
    }
    
  }
}

