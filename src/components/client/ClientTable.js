import { MDBDataTable } from 'mdbreact';
import React, { Component } from 'react'
import ApiService from 'src/api/ApiService';
import Spinner from '../Spinner';
import Alert from '../Alert';
import { Button } from '@material-ui/core';
import { Navigate } from 'react-router-dom';
import AuthService from 'src/api/AuthService';

export default class ClientTable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      clients: [],
      loading: false,
      addSale: false,
      editClient: false,
      alert: null,
      empty: true,
      id: null,
      infoLabel: [
        "Mostrado", "a", "de", "entradas"
      ]
    }

  }

  componentDidMount() {
    this.listClient();
    console.log(AuthService.getJWTTokenData())
  }

  listClient() {
    this.setState({ loading: true });
    ApiService.listClients(
      clients => this.setState({ clients: clients, loading: false, empty: false }),
      error => this.setErrorState(error)
    );
  }

  setErrorState(error) {
    this.setState({ alert: `Erro na requisição: ${error.message}`, loading: false })
  }

  handleAddSale(id) {
    this.setState({
      addSale: true,
      id: id
    })
  }

  handleEditClient(id) {
    this.setState({
      editClient: true,
      id: id
    })
  }

  render() {
    if (this.state.addSale) {
      return <Navigate to={"/app/addSale/" + this.state.id} />
    }
    if (this.state.editClient) {
      return <Navigate to={"/app/editClient/" + this.state.id} />
    }
    if (!this.state.empty) {
      if (!this.state.clients[0].id) {
        console.log("entrou")
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
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                  },
                  {
                    label: 'CPF',
                    field: 'cpf',
                    sort: 'asc'
                  },
                  {
                    label: '',
                    field: 'buttonNewSale',
                    sort: 'asc'
                  },
                  {
                    label: '',
                    field: 'buttonEditClient',
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
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                  },
                  {
                    label: 'CPF',
                    field: 'cpf',
                    sort: 'asc'
                  },
                  {
                    label: '',
                    field: 'buttonNewSale',
                    sort: 'asc'
                  },
                  {
                    label: '',
                    field: 'buttonEditClient',
                    sort: 'asc'
                  }

                ],
                rows: [...this.state.clients.map((client) => {
                  return {
                    id: client.id,
                    name: client.name,
                    cpf: client.cpf,
                    buttonNewSale: <center> <Button
                      color="primary"
                      variant="contained"
                      onClick={() => this.handleAddSale(client.id)}
                    >
                      Nova Venda
                    </Button></center>,
                    buttonEditClient: <center> <Button
                      color="primary"
                      variant="contained"
                      onClick={() => this.handleEditClient(client.id)}
                    >
                      Editar Cliente
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



