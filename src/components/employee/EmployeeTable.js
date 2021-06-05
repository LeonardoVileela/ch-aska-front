import { MDBDataTable } from 'mdbreact';
import React, { Component } from 'react'
import ApiService from 'src/api/ApiService';
import Spinner from '../Spinner';
import Alert from '../Alert';
import { Button, MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

const redTheme = createMuiTheme({ palette: { primary: red } })

export default class EmployeeTable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      employees: [],
      loading: false,
      deleteEmployee: false,
      empty: true,
      alert: null,
      id: null,
      infoLabel: [
        "Mostrado", "a", "de", "entradas"
      ]
    }

  }

  componentDidMount() {
    this.listEmployee();
  }

  listEmployee() {
    this.setState({ loading: true });
    ApiService.listEmployees(
      employees => this.setState({ employees: employees, loading: false, empty: false }),
      error => this.setErrorState(error)
    );
  }

  setErrorState(error) {
    this.setState({ alert: `Erro na requisição: ${error.message}`, loading: false })
  }

  handleDeleteEmployee(id) {
    if (window.confirm("TEM CERTEZA QUE DESEJA EXCLUIR?")) {
      this.setState({
        loading: true,
      })

      ApiService.deleteEmployee(
        id,
        onDelete => this.onDelete(onDelete),
        error => this.setErrorState(error)
      );
    }
  }

  onDelete(onDelete) {
    console.log(onDelete)
    this.listEmployee()
  }

  handleAdminEmployee(id, boolVar) {
    var confirm = ''
    if (boolVar) {
      confirm = "TEM CERTEZA QUE DESEJA TORNAR ESSE USUÁRIO UM NÃO ADMINISTRADOR?"
    } else {
      confirm = "TEM CERTEZA QUE DESEJA TORNAR ESSE USUÁRIO UM ADMINISTRADOR?"
    }

    if (window.confirm(confirm)) {
      boolVar = !boolVar
      this.setState({
        loading: true,
      })
      var admin = {
        admin: boolVar
      }
      ApiService.putEmployeeAdmin(id, admin,
        () => this.setState({ loading: false }, this.listEmployee()),
        error => {
          if (error.response) {
            this.setErrorState(`Erro: ${error.response.data.error}`);
          } else {
            this.setErrorState(`Erro na requisição: ${error.message}`);
          }
        })
    }

  }

  render() {
    if (!this.state.empty) {
      if (!this.state.employees[0].id) {
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
                    label: 'Nome de usuário',
                    field: 'username',
                    sort: 'asc'
                  },
                  {
                    label: 'Administrador',
                    field: 'admin',
                    sort: 'asc'
                  },
                  {
                    label: '',
                    field: 'buttonAdmin',
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
                    label: 'Nome de usuário',
                    field: 'username',
                    sort: 'asc'
                  },
                  {
                    label: 'Administrador',
                    field: 'admin',
                    sort: 'asc'
                  },
                  {
                    label: '',
                    field: 'buttonAdmin',
                    sort: 'asc'
                  },
                  {
                    label: '',
                    field: 'buttonDelete',
                    sort: 'asc'
                  }

                ],
                rows: [...this.state.employees.map((employee) => {
                  return {
                    id: employee.id,
                    username: employee.username,
                    admin: `${employee.admin ? 'Sim' : 'Não'}`,
                    buttonAdmin: <center> <Button
                      color="primary"
                      onClick={() => this.handleAdminEmployee(employee.id, employee.admin)}
                      variant="contained"
                    >
                      Admin
                    </Button></center>,
                    buttonDelete: <center><MuiThemeProvider theme={redTheme}> <Button
                      color="primary"
                      variant="contained"
                      disabled={employee.admin ? true : false}
                      onClick={() => this.handleDeleteEmployee(employee.id)}
                    >
                      Deletar Funcionário
                    </Button></MuiThemeProvider></center>

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



