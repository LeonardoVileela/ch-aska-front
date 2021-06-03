import React, { Component } from 'react'
import ApiService from 'src/api/ApiService';
import Alert from 'src/components/Alert';
import Spinner from 'src/components/Spinner';
import { Box, Container } from '@material-ui/core';
import { Navigate } from 'react-router-dom';

export default class AddEmployee extends Component {
    constructor(props) {
        super(props)
        this.state = {
            appUser: {
                username: "",
                password: ""
            },
            redirect: false,
            buttonName: "Cadastrar",
            alert: null,
            loading: false,
            saving: false
        }

        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onInputChangeHandler = this.onInputChangeHandler.bind(this);
    }

    setErrorState(error) {
        this.setState({ alert: error, loading: false, saving: false });
    }

    onSubmitHandler(event) {
        event.preventDefault();
        this.setState({ saving: true, alert: null });
        
        ApiService.saveEmployee(this.state.appUser,
            () => this.setState({ redirect: true, saving: false }),
            error => {
                if (error.response) {
                    this.setErrorState(`Erro: ${error.response.data.error}`);
                } else {
                    this.setErrorState(`Erro na requisição: ${error.message}`);
                }
            })
    }

    onInputChangeHandler(event) {
        const field = event.target.name;
        const value = event.target.value;
        this.setState(prevState => ({ appUser: { ...prevState.appUser, [field]: value } }));
    }


    render() {
        if (this.state.redirect) {
            // eslint-disable-next-line
            {alert("CADASTRADO COM SUCESSO")}
            return <Navigate to="/app/employee" />
        }

        if (this.state.loading) {
            return <Spinner />
        }
        return (
            <div>
                <Box
                    sx={{
                        minHeight: '100%',
                        py: 3
                    }}
                >
                    <Container maxWidth="md">
                        <h1>Cadastro de Funcionário</h1>
                        {this.state.alert != null ? <Alert message={this.state.alert} /> : ""}
                        <form onSubmit={this.onSubmitHandler}>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input type="text"
                                    className="form-control"
                                    name="username"
                                    placeholder="Digite o Username"
                                    onChange={this.onInputChangeHandler} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Digite a senha"
                                    onChange={this.onInputChangeHandler} />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={this.state.saving}>
                                {
                                    this.state.buttonName
                                }
                            </button>
                           
                        </form>
                    </Container>
                </Box>
            </div>
        )
    }
}
