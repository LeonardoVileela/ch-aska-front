import {
  Box,
  Button,
} from '@material-ui/core';
import { Navigate } from 'react-router-dom';
import React, { Component } from 'react'


export default class ProductToolbar extends Component {

  constructor(props) {
    super(props)

    this.state = {
      click: false
    }
    this.handleAddProduct = this.handleAddProduct.bind(this)
  }

  handleAddProduct(event) {
    event.preventDefault()
    this.setState({
      click: true
    })

  }

  render() {
    if (this.state.click) {
      return <Navigate to="/app/addProduct" />
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
            onClick={this.handleAddProduct}
          >
            Adicionar Produto
          </Button>
        </Box>

      </div>
    )
  }
}




