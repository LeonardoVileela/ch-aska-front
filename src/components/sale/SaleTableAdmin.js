import { MDBDataTable } from 'mdbreact';
import React, { Component } from 'react'
import ApiService from 'src/api/ApiService';
import Spinner from '../Spinner';
import Alert from '../Alert';
import { Button } from '@material-ui/core';

export default class SaleTable extends Component {
    constructor(props) {
        super(props)

        this.state = {
            sales: [],
            loading: false,
            deleteSale: false,
            alert: null,
            id: null,
            infoLabel: [
                "Mostrado", "a", "de", "entradas"
            ]
        }

    }

    componentDidMount() {
        this.listSale();
        console.log(this.state.sales)
    }

    listSale() {
        this.setState({ loading: true });
        ApiService.listSales(
            sales => this.setState({
                sales: sales.map(
                    function (prod) {
                        var totalPrice = 0
                        for (let j = 0; j < prod.product.length; j++) {
                            totalPrice = totalPrice + prod.product[j].price
                        }

                        var totalSale = { totalSale: totalPrice.toFixed(2) }
                        var prodDone = Object.assign(totalSale, prod)
                        return prodDone;
                    }
                ), loading: false
            }),
            error => this.setErrorState(error)
        );

    }

    setErrorState(error) {
        this.setState({ alert: `Erro na requisição: ${error.message}`, loading: false })
    }

    handleDeleteSale(id) {
        if (window.confirm("TEM CERTEZA QUE DESEJA EXCLUIR?")) {
            this.setState({
                loading: true,
            })

            ApiService.deleteSale(
                id,
                onDelete => this.onDelete(onDelete),
                error => this.setErrorState(error)
            );

        }


    }

    onDelete(onDelete) {
        console.log(onDelete)
        ApiService.listSales(
            sales => this.setState({ sales: sales, loading: false }),
            error => this.setErrorState(error)
        );
    }

    render() {
        return (
            <div>

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
                                        label: 'ID',
                                        field: 'id',
                                        sort: 'asc'
                                    },
                                    {
                                        label: 'Vendedor',
                                        field: 'nameAppUser',
                                        sort: 'asc'
                                    },
                                    {
                                        label: 'Nome Cliente',
                                        field: 'nameClient',
                                        sort: 'asc'
                                    },
                                    {
                                        label: 'Data Da Venda',
                                        field: 'whenToDo',
                                        sort: 'asc'
                                    },
                                    {
                                        label: 'Valor Total',
                                        field: 'priceTotal',
                                        sort: 'asc'
                                    },
                                    {
                                        label: '',
                                        field: 'buttonDelete',
                                        sort: 'asc'
                                    }

                                ],
                                rows: [...this.state.sales.map((sale) => {
                                    return {
                                        id: sale.id,
                                        nameAppUser: Object.values(sale.appUser)[1],
                                        nameClient: Object.values(sale.client)[1],
                                        whenToDo: sale.whenToDo,
                                        priceTotal: `R$ ${sale.totalSale}`,
                                        buttonDelete: <center> <Button
                                            color="primary"
                                            variant="contained"
                                            onClick={() => this.handleDeleteSale(sale.id)}
                                        >
                                            Deletar Venda
                                        </Button></center>,

                                    }
                                })
                                ]
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



