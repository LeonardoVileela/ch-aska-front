import {
  Box,
  Button,
} from '@material-ui/core';
import { Navigate } from 'react-router-dom';
import React, { Component } from 'react'


export default class EmployeeToolbar extends Component {

  constructor(props) {
    super(props)

    this.state = {
      click: false
    }
    this.handleAddEmployee = this.handleAddEmployee.bind(this)
  }

  handleAddEmployee(event) {
    event.preventDefault()
    this.setState({
      click: true
    })

  }

  render() {
    if (this.state.click) {
      return <Navigate to="/app/addEmployee" />
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
            onClick={this.handleAddEmployee}
          >
            Adicionar Funcionário
          </Button>
        </Box>

      </div>
    )
  }
}



