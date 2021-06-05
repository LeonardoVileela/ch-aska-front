import React, { Component } from 'react'
import { Helmet } from 'react-helmet';
import {
    Box,
    Container
} from '@material-ui/core';
import TableProductFinishSale from 'src/components/sale/TableProductFinishSale';


export default class AddSale extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: null
        }
    }

    componentDidMount() {
        let name = window.location.pathname
        let path = name.split("/")
        name = path.slice(-1)[0]

        this.setState({
            id: name
        })
    }

    render() {

        return (
            <>
                <Helmet>
                    <title>Ch'aska</title>
                </Helmet>
                <Box
                    sx={{
                        minHeight: '100%',
                        py: 3
                    }}
                >
                    <Container maxWidth={false}>
                        <Box sx={{ pt: 3 }}>
                            <TableProductFinishSale />
                        </Box>
                    </Container>
                </Box>
            </>
        )
    }
}



