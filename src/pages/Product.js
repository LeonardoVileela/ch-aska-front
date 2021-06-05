import { Helmet } from 'react-helmet';
import {
  Box,
  Container
} from '@material-ui/core';
import React, { Component } from 'react'
import ProductTable from 'src/components/product/ProductTable';
import ProductTableAdmin from 'src/components/product/ProductTableAdmin';
import ProductToolbar from 'src/components/product/ProductToolbar';
import ApiService from '../api/ApiService'


export default class Sale extends Component {
  render() {
    if (ApiService.getJWTTokenData() !== null) {
      if (ApiService.getJWTTokenData().admin) {
        return (
          <>
            <Helmet>
              <title>Ch'aska</title>
            </Helmet>
            <Box
              sx={{
                backgroundColor: 'white',
                minHeight: '100%',
                py: 3
              }}
            >
              <Container maxWidth={false}>
                <ProductToolbar />
                <Box sx={{ pt: 3 }}>
                  <ProductTableAdmin />
                </Box>
              </Container>
            </Box>
          </>
        )
      } else {
        return (
          <>
            <Helmet>
              <title>Ch'aska</title>
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
                  <ProductTable />
                </Box>
              </Container>
            </Box>
          </>
        )
      }
    }
    return (
      <>
        <Helmet>
          <title>Ch'aska</title>
        </Helmet>
        <Box
          sx={{
            backgroundColor: 'white',
            minHeight: '100%',
            py: 3
          }}
        >
          <Container maxWidth={false}>
            <ProductToolbar />
            <Box sx={{ pt: 3 }}>
              <ProductTable />
            </Box>
          </Container>
        </Box>
      </>
    )
  }
}

