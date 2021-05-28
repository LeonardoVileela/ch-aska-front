import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import ClientToolbar from 'src/components/client/ClientToolbar';
import React, { Component } from 'react'
import ClientTable from 'src/components/client/ClientTable';

export default class Client extends Component {
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
          <ClientToolbar />
          <Box sx={{ pt: 3 }}>
            <ClientTable />
          </Box>
        </Container>
      </Box>
    </>
    )
  }
}
