import { MDBDataTable } from 'mdbreact';
import React, { Component } from 'react'
import ApiService from 'src/api/ApiService';
import Spinner from '../Spinner';
import Alert from '../Alert';
import { Navigate } from 'react-router-dom';
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
      showProducts: false,
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

  handleShowProducts(id) {

    this.setState({
      showProducts: true,
      id: id
    })

  }

  render() {
    if (this.state.showProducts) {
      return <Navigate to={"/app/saleProducts/" + this.state.id} />
    }
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
                    field: 'showProducts',
                    sort: 'asc'
                  },

                ],
                rows: [...this.state.sales.map((sale) => {
                  return {
                    id: sale.id,
                    nameAppUser: Object.values(sale.appUser)[1],
                    nameClient: Object.values(sale.client)[1],
                    whenToDo: sale.whenToDo,
                    priceTotal: `R$ ${sale.totalSale}`,
                    showProducts: <center> <Button
                      color="primary"
                      variant="contained"
                      onClick={() => this.handleShowProducts(sale.id)}
                    >
                      Mostrar Produtos
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



