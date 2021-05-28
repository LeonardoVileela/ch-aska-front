
import React, { Component } from 'react'
import AuthService from '../api/AuthService'
import { Navigate } from 'react-router-dom'

export default class Register extends Component {
  render() {
    if (AuthService.isAuthenticated()) {
      return <Navigate to="/app/dashboard" />
    }
    return (
      <>
        <h1>Cadaster</h1>
      </>
    )
  }
}
