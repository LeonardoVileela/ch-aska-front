import { MDBDataTable } from 'mdbreact';
import React, { Component } from 'react'
import ApiService from 'src/api/ApiService';
import Spinner from '../Spinner';
import Alert from '../Alert';
import { Button } from '@material-ui/core';
import { Navigate } from 'react-router-dom';
import ProductModal from './ProductModal'

export default class ProductTable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      products: [],
      loading: false,
      empty: true,
      editProduct: false,
      alert: null,
      id: null,
      infoLabel: [
        "Mostrado", "a", "de", "entradas"
      ]
    }

  }

  componentDidMount() {
    this.listProduct();
  }

  listProduct() {
    this.setState({ loading: true });
    ApiService.listProducts(
      product => this.setState({ products: product, loading: false, empty: false }),
      error => this.setErrorState(error)
    );

  }

  setErrorState(error) {
    this.setState({ alert: `Erro na requisição: ${error.message}`, loading: false })
  }

  handleEditProduct(id) {
    this.setState({
      editProduct: true,
      id: id
    })
  }

  handleDeleteProduct(id) {
    ApiService.deleteProduct(
      id,
      onDelete => this.onDelete(onDelete),
      error => this.setErrorState(error)
    );
  }

  onDelete(onDelete) {
    console.log(onDelete)
    this.listProduct()

  }

  render() {
    if (this.state.editProduct) {
      return <Navigate to={"/app/editProduct/" + this.state.id} />
    }
    if (!this.state.empty) {
      if (!this.state.products[0].id) {
        return <div>
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
                  },
                  {
                    label: '',
                    field: 'buttonEditProduct',
                    sort: 'asc'
                  },
                  {
                    label: '',
                    field: 'buttonDelete',
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
                    field: 'buttonEditProduct',
                    sort: 'asc'
                  },
                  {
                    label: '',
                    field: 'buttonDelete',
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
                    id: product.id,
                    name: product.name,
                    price: `R$ ${product.price.toFixed(2)}`,
                    buttonEditProduct: <center> <Button
                      color="primary"
                      variant="contained"
                      onClick={() => this.handleEditProduct(product.id)}
                    >
                      Editar Produto
                    </Button></center>,

                    buttonDelete: <center> <Button
                      color="primary"
                      variant="contained"
                      onClick={() => this.handleDeleteProduct(product.id)}
                    >
                      Deletar Produto
                    </Button></center>,

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



