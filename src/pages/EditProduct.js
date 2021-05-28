import React, { Component } from 'react'
import ApiService from 'src/api/ApiService';
import Alert from 'src/components/Alert';
import Spinner from 'src/components/Spinner';
import { Box, Container } from '@material-ui/core';
import { Navigate } from 'react-router-dom';

export default class AddProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: 0,
            product: {
                image: "",
                name: "",
                description: "",
                price: ""
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

    componentDidMount() {
        let name = window.location.pathname
        let path = name.split("/")
        name = path.slice(-1)[0] 

        this.setState({
            id:name
        })

        ApiService.loadProduct(
            name,
            product => this.setState({ product: product, loading: false}),
            error => console.log(error)

        );
        
    }

    onSubmitHandler(event) {
        event.preventDefault();
        this.setState({ saving: true, alert: null });
        
        ApiService.putProduct(this.state.id,this.state.product,
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
        this.setState(prevState => ({ product: { ...prevState.product, [field]: value } }));
    }


    render() {
        if (this.state.redirect) {
            // eslint-disable-next-line
            {alert("EDITADO COM SUCESSO")}
            return <Navigate to="/app/products" />
        }

        if (this.state.loading) {
            return <Spinner />
        }
        return (
            <div>
                <Box
                    sx={{
                        backgroundColor: 'white',
                        minHeight: '100%',
                        py: 3
                    }}
                >
                    <Container maxWidth="md">
                        <h1>Editar Produto</h1>
                        {this.state.alert != null ? <Alert message={this.state.alert} /> : ""}
                        <form onSubmit={this.onSubmitHandler}>
                        <div className="form-group">
                                <label htmlFor="image">URL Imagem</label>
                                <input type="text"
                                    className="form-control"
                                    name="image"
                                    value={this.state.product.image}
                                    placeholder="Digite a URL da imagem"
                                    onChange={this.onInputChangeHandler} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Nome do Produto</label>
                                <input type="text"
                                    className="form-control"
                                    name="name"
                                    value={this.state.product.name}
                                    placeholder="Digite o nome do produto"
                                    onChange={this.onInputChangeHandler} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Descrição</label>
                                <input type="text"
                                    className="form-control"
                                    name="description"
                                    value={this.state.product.description}
                                    placeholder="Digite a descrição"
                                    onChange={this.onInputChangeHandler} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="price">Preço</label>
                                <input type="text"
                                    className="form-control"
                                    name="price"
                                    value={this.state.product.price}
                                    placeholder="Digite o preço"
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


//