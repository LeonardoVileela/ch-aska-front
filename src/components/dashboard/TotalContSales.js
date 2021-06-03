import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';
import React, { Component } from 'react'
import ApiService from 'src/api/ApiService';
import Alert from '../Alert';
import Spinner from '../Spinner';

export default class TotalContSales extends Component {
  constructor(props) {
    super(props)

    this.state = {
      totalContSales: [],
      loading: false,
      alert: null
    }

  }

  componentDidMount() {
    if (ApiService.getJWTTokenData() !== null) {
      if (ApiService.getJWTTokenData().id) {
        this.setState({ loading: true });
        ApiService.totalContSales(
          ApiService.getJWTTokenData().id,
          totalContSales => this.setState({ totalContSales: totalContSales, loading: false }),
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
            <Card>
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
                      NÚMERO DE VENDAS
                    </Typography>
                    <Typography
                      color="textPrimary"
                      variant="h3"
                    >
                      {this.state.totalContSales.salesCont}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Avatar
                      sx={{
                        backgroundColor: green[600],
                        height: 56,
                        width: 56
                      }}
                    >
                      <InsertChartIcon />
                    </Avatar>
                  </Grid>
                </Grid>
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    pt: 2
                  }}
                >
                  <ArrowUpwardIcon sx={{ color: green[900] }} />
                  <Typography
                    variant="body2"
                    sx={{
                      color: green[900],
                      mr: 1
                    }}
                  >
                    16%
                  </Typography>
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
