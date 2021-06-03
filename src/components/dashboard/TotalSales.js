import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { red, blue, green } from '@material-ui/core/colors';
import ApiService from 'src/api/ApiService';
import Alert from '../Alert';
import Spinner from '../Spinner';

import React, { Component } from 'react'

export default class TotalSales extends Component {
  constructor(props) {
    super(props)

    this.state = {
      totalSales: [],
      loading: false,
      alert: null
    }

  }

  componentDidMount() {
    if (ApiService.getJWTTokenData() !== null) {
      if (ApiService.getJWTTokenData().id) {
        this.setState({ loading: true });
        ApiService.totalSales(
          ApiService.getJWTTokenData().id,
          totalSales => this.setState({ totalSales: totalSales, loading: false }),
          error => this.setErrorState(error)
        );
      }
    }
  }

  setErrorState(error) {
    this.setState({ alert: `Erro na requisição: ${error.message}`, loading: false })
  }

  render() {
    return (
      <div>
        {this.state.alert != null ? <Alert message={this.state.alert} /> : ""}
        {this.state.loading ? <Spinner /> :
          <>
            <Card
              sx={{
                height: '100%',
              }}

            >
              <CardContent>
                <Grid
                  container
                  spacing={3}
                  sx={{ justifyContent: 'space-between' }}
                >
                  <Grid item>
                    <Typography
                      color="textSecondary"
                      gutterBottom
                      variant="h6"
                    >
                      TOTAL EM VENDAS
                    </Typography>
                    <Typography
                      color="textPrimary"
                      variant="h3"
                    >
                      R$ {this.state.totalSales.salesTotal}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Avatar
                      sx={{
                        backgroundColor: blue[600],
                        height: 56,
                        width: 56
                      }}
                    >
                      <AttachMoneyIcon />
                    </Avatar>
                  </Grid>
                </Grid>
                <Box
                  sx={{
                    pt: 2,
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  {this.state.totalSales.percentage ?
                    <ArrowUpwardIcon sx={{ color: green[900] }} />
                    :
                    <ArrowDownwardIcon sx={{ color: red[900] }} />
                  }
                  {this.state.totalSales.percentage ?
                    <Typography
                      sx={{
                        color: green[900],
                        mr: 1
                      }}
                      variant="body2"
                    >
                      {this.state.totalSales.percentageTotal}%
                    </Typography> :
                    <Typography
                      sx={{
                        color: red[900],
                        mr: 1
                      }}
                      variant="body2"
                    >
                      {this.state.totalSales.percentageTotal}%
                    </Typography>
                  }
                  <Typography
                    color="textSecondary"
                    variant="caption"
                  >
                    Comparado ao mês passado
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </>
        }
      </div>
    )
  }
}

