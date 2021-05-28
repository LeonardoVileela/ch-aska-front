import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import React, { Component } from 'react'
import EmployeeToolbar from 'src/components/employee/EmployeeToolbar';
import EmployeeTable from 'src/components/employee/EmployeeTable';


export default class Employee extends Component {
  render() {
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
            <EmployeeToolbar />
            <Box sx={{ pt: 3 }}>
              <EmployeeTable />
            </Box>
          </Container>
        </Box>
      </>
    )
  }
}
