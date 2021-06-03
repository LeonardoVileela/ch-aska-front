import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import TotalSales from 'src/components/dashboard/TotalSales';
import TotalContSales from 'src/components/dashboard/TotalContSales';
import React, { Component } from 'react'

export default class Dashboard extends Component {
  render() {
    return (
      <>
        <Helmet>
          <title>Dashboard | Material Kit</title>
        </Helmet>
        <Box
          sx={{
            backgroundColor: 'white',
            minHeight: '100%',
            py: 3
          }}
        >
          <Container maxWidth={false}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                lg={4}
                sm={6}
                xl={3}
                xs={12}
              >
                <TotalSales />
              </Grid>
              <Grid
                item
                lg={4}
                sm={6}
                xl={3}
                xs={12}
              >
                <TotalContSales />
              </Grid>
              
            </Grid>
          </Container>
        </Box>
      </>
    )
  }
}
