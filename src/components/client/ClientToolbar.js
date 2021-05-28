import {
  Box,
  Button,
} from '@material-ui/core';
import { Navigate } from 'react-router-dom';
import React, { Component } from 'react'


export default class ClientToolbar extends Component {

  constructor(props) {
    super(props)

    this.state = {
      click: false
    }
    this.handleAddClient = this.handleAddClient.bind(this)
  }

  handleAddClient(event) {
    event.preventDefault()
    this.setState({
      click: true
    })

  }

  render() {
    if (this.state.click) {
      return <Navigate to="/app/addClient" />
    }

    return (
      <div>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={this.handleAddClient}
          >
            Adicionar Cliente
          </Button>
        </Box>

      </div>
    )
  }
}

/*<>
      <Navigate to="/404" />
    </>*/



