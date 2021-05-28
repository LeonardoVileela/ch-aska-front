
import AuthService from '../api/AuthService'
import Alert from 'src/components/Alert'
import React, { Component } from 'react'
import { Box, Container } from '@material-ui/core';


export default class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: "",
            password: "",
            alert: null,
            processing: false,
            loggedIn: false
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInputChanged = this.handleInputChanged.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault()
        this.setState({ processing: true })
        AuthService.login(this.state.username, this.state.password,
            success => {
                if (success) {
                    this.setState({ loggedIn: true })
                } else {
                    this.setState({ alert: "O login não pode ser realizado" })
                }
                this.setState({ processing: false })
            }
        )
    }

    handleInputChanged(event) {
        const field = event.target.name;
        const value = event.target.value;
        this.setState({
            [field]: value
        })

    }

    render() {
        if (AuthService.isAuthenticated()) {
            window.location.href  = "/app/dashboard"
        }
        if (this.state.loggedIn) {
            window.location.href  = "/app/dashboard"
        }

        return (
            <div>
                <Container maxWidth='sm'>
                    <Box sx={{ pt: 3 }}>
                        <h1>Login</h1>
                        {this.state.alert !== null ? <Alert message={this.state.alert} /> : ""}
                        <form onSubmit={this.handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="username">Usuário</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    onChange={this.handleInputChanged}
                                    value={this.state.username}
                                    name="username"
                                    placeholder="Digite o usuário"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password">Senha</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    onChange={this.handleInputChanged}
                                    value={this.state.password}
                                    name="password"
                                    placeholder="Digite a senha"
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={this.state.processing}
                            >
                                Login
                            </button>
                        </form>
                    </Box>
                </Container>
            </div>
        )
    }
}

