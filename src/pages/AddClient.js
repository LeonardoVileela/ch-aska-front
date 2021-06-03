import React, { Component } from 'react'
import ApiService from 'src/api/ApiService';
import Alert from 'src/components/Alert';
import { cpfMask } from 'src/components/mask/cpfMask';
import Spinner from 'src/components/Spinner';
import { Box, Container } from '@material-ui/core';
import { Navigate } from 'react-router-dom';

export default class AddClient extends Component {
    constructor(props) {
        super(props)
        this.state = {
            client: {
                name: "",
                cpf: ""
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

        const client = {
            name: this.state.client.name.toUpperCase(),
            cpf: this.state.client.cpf

        }

        ApiService.saveClient(client,
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
        if (event.target.name === 'cpf') {
            this.setState(prevState => ({ client: { ...prevState.client, [field]: cpfMask(value) } }));
        } else {
            this.setState(prevState => ({ client: { ...prevState.client, [field]: value } }));
        }

    }


    render() {
        if (this.state.redirect) {
            // eslint-disable-next-line
            { alert("CADASTRADO COM SUCESSO") }
            return <Navigate to="/app/client" />
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
                        <h1>Cadastro de Cliente</h1>
                        {this.state.alert != null ? <Alert message={this.state.alert} /> : ""}
                        <form onSubmit={this.onSubmitHandler}>
                            <div className="form-group">
                                <label htmlFor="name">Nome</label>
                                <input type="text"
                                    className="form-control"
                                    name="name"
                                    placeholder="Digite o Nome"
                                    onChange={this.onInputChangeHandler} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cpf">CPF</label>
                                <input type="text"
                                    className="form-control"
                                    name="cpf"
                                    placeholder="Digite o CPF"
                                    value={this.state.client.cpf}
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
