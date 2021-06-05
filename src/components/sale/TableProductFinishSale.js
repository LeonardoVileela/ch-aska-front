import { MDBDataTable } from 'mdbreact';
import React, { Component } from 'react'
import ApiService from 'src/api/ApiService';
import Spinner from '../Spinner';
import Alert from '../Alert';
import { Navigate } from 'react-router-dom';
import ProductModal from '../product/ProductModal'
import { Checkbox, Button, Box } from '@material-ui/core';

export default class ProductTable extends Component {
    constructor(props) {
        super(props)

        this.state = {
            products: [],
            productsSale: [],
            loading: false,
            empty: true,
            alert: null,
            id: null,
            total: 0.0,
            redirect: false,
            infoLabel: [
                "Mostrado", "a", "de", "entradas"
            ]
        }

        this.handleAddSale = this.handleAddSale.bind(this)

    }

    componentDidMount() {
        let name = window.location.pathname
        let path = name.split("/")
        name = path.slice(-1)[0]

        this.setState({
            id: name
        })
        this.listProduct();
    }

    listProduct() {
        this.setState({ loading: true });
        ApiService.listProducts(
            product => this.setState({
                products: product.map(function (prod) {
                    var done = { done: false }
                    var prodDone = Object.assign(done, prod)
                    return prodDone;
                }).map(function (prod) {
                    var quantity = { quantity: 1 }
                    var prodQuantity = Object.assign(quantity, prod)
                    return prodQuantity;
                }), loading: false, empty: false
            }),
            error => this.setErrorState(error)
        );



    }

    setErrorState(error) {
        this.setState({ alert: `Erro na requisição: ${error.message}`, loading: false })
    }

    checked(product) {
        product.done = !product.done;
        const products = this.state.products.map(t => t.id !== product.id ? t : product);


        //calcular preço total para exibir na tela
        var entry = this.state.products
        var productsFinalSale = entry.filter((e) => e.done === true)
        var totalPrice = 0
        for (let i = 0; i < productsFinalSale.length; i++) {
            for (let j = 0; j < productsFinalSale[i].quantity; j++) {
                totalPrice = totalPrice + productsFinalSale[i].price
            }
        }
        //calcular preço total para exibir na tela
        this.setState({ products: products, total: totalPrice.toFixed(2) });

    }


    quantity(product, quant) {

        var array = this.state.products;
        array.map((e) => e.id === product.id ? e.quantity = parseInt(quant.target.value) : e)

        //calcular preço total para exibir na tela
        var entry = this.state.products
        var productsFinalSale = entry.filter((e) => e.done === true)
        var totalPrice = 0
        for (let i = 0; i < productsFinalSale.length; i++) {
            for (let j = 0; j < productsFinalSale[i].quantity; j++) {
                totalPrice = totalPrice + productsFinalSale[i].price
            }
        }
        //calcular preço total para exibir na tela

        this.setState({
            products: array,
            total: totalPrice.toFixed(2)
        })

    }
    handleAddSale(event) {
        event.preventDefault()

        var entry = this.state.products
        var productsFinalSale = entry.filter((e) => e.done === true)
        var arrayAux = []
        for (let i = 0; i < productsFinalSale.length; i++) {
            for (let j = 0; j < productsFinalSale[i].quantity; j++) {
                arrayAux[arrayAux.length] = `${productsFinalSale[i].id}`
            }
        }

        var sale = {
            client: `${this.state.id}`,
            products: arrayAux
        }

        ApiService.saveSale(sale,
            () => this.setState({ redirect: true, saving: false }),
            error => {
                if (error.response) {
                    this.setErrorState(`Erro: ${error.response.data.error}`);
                } else {
                    this.setErrorState(`Erro na requisição: ${error.message}`);
                }
            })

    }

    render() {
        if (this.state.redirect) {
            // eslint-disable-next-line
            { alert("CADASTRADO COM SUCESSO") }
            return <Navigate to="/app/sale" />
        }

        if (!this.state.empty) {
            if (!this.state.products[0].id) {
                return <div>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end'
                        }}
                    >
                    </Box>
                    <MDBDataTable
                        striped
                        bordered
                        hover
                        infoLabel={this.state.infoLabel}
                        data={
                            {
                                columns: [
                                    {
                                        label: 'ID',
                                        field: 'id',
                                        sort: 'asc'
                                    },
                                    {
                                        label: 'Nome do Produto',
                                        field: 'name',
                                        sort: 'asc'
                                    },
                                    {
                                        label: 'Preço',
                                        field: 'price',
                                        sort: 'asc'
                                    }
                                ],
                                rows: []
                            }

                        }
                        noRecordsFoundLabel={"Nenhum registro encontrado"}
                        paginationLabel={["Anterior", "Próximo"]}
                        responsive={true}
                        displayEntries={false}
                        searchLabel="Buscar"
                        sortable={false} //desativa a ordenar ao clicar nas colunas
                    />
                </div>
            }
        }
        return (
            <div>
                <h1>TOTAL: R$ {this.state.total}</h1>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end'
                    }}
                >
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={this.handleAddSale}
                    >
                        Adicionar Nova Venda
                    </Button>
                </Box>
                {this.state.alert != null ? <Alert message={this.state.alert} /> : ""}
                {this.state.loading ? <Spinner /> :

                    <MDBDataTable
                        striped
                        bordered
                        hover
                        infoLabel={this.state.infoLabel}
                        data={
                            {
                                columns: [
                                    {
                                        label: '',
                                        field: 'checkbox',
                                        sort: 'asc'
                                    }, {
                                        label: 'Quantidade',
                                        field: 'quantity',
                                        sort: 'asc'
                                    },
                                    {
                                        label: 'ID',
                                        field: 'id',
                                        sort: 'asc'
                                    },
                                    {
                                        label: 'Nome do Produto',
                                        field: 'name',
                                        sort: 'asc'
                                    },
                                    {
                                        label: 'Preço',
                                        field: 'price',
                                        sort: 'asc'
                                    },
                                    {
                                        label: '',
                                        field: 'modal',
                                        sort: 'asc'
                                    }

                                ],
                                rows: [...this.state.products.map((product) => {
                                    return {
                                        checkbox: <Checkbox
                                            onChange={() => this.checked(product)}
                                            inputProps={{ 'aria-label': 'primary checkbox' }}
                                        />, quantity: <input min="1" onChange={(e) => this.quantity(product, e)} style={{ width: 60 }} type="number" id="quantity" name="quantity" />,
                                        id: product.id,
                                        name: product.name,
                                        price: `R$ ${product.price.toFixed(2)}`,
                                        modal: <ProductModal id={product.id} />

                                    }
                                })]
                            }

                        }
                        noRecordsFoundLabel={"Nenhum registro encontrado"}
                        paginationLabel={["Anterior", "Próximo"]}
                        responsive={true}
                        displayEntries={false}
                        searchLabel="Buscar"
                        sortable={false} //desativa a ordenar ao clicar nas colunas
                    />
                }
            </div>
        )
    }
}



