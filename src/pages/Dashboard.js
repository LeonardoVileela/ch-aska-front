import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import Budget from 'src/components/dashboard//Budget';
import TasksProgress from 'src/components/dashboard//TasksProgress';
import TotalCustomers from 'src/components/dashboard//TotalCustomers';
import TotalProfit from 'src/components/dashboard//TotalProfit';
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
                lg={3}
                sm={6}
                xl={3}
                xs={12}
              >
                <Budget />
              </Grid>
              <Grid
                item
                lg={3}
                sm={6}
                xl={3}
                xs={12}
              >
                <TotalCustomers />
              </Grid>
              <Grid
                item
                lg={3}
                sm={6}
                xl={3}
                xs={12}
              >
                <TasksProgress />
              </Grid>
              <Grid
                item
                lg={3}
                sm={6}
                xl={3}
                xs={12}
              >
                <TotalProfit sx={{ height: '100%' }} />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </>
    )
  }
}
