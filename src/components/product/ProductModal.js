import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import PropTypes from 'prop-types';
import Spinner from '../Spinner'
import Alert from '../Alert'
import ApiService from 'src/api/ApiService';
import { isMobile } from 'react-device-detect';
import {
    Button
} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';


/*const handleOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};*/

const styles = theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
});

class ProductModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            products: [],
            open: false,
            loading: false,
            alert: null,
        }

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);

    }


    handleOpen(id) {
        ApiService.loadProduct(
            id,
            product => this.setState({ products: product, loading: false, open: true }),
            error => this.setErrorState(error)

        );
    }

    setErrorState(error) {
        this.setState({ alert: `Erro na requisição: ${error.message}`, loading: false })
    }
    handleClose() {
        this.setState({ open: false });
    }

    render() {
        const { classes } = this.props;
        return (

            <div>





                <Button backgroundColor="white" onClick={
                    () => this.handleOpen(this.props.id)
                }>
                    < VisibilityIcon />
                </Button>



                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    responsive={true}
                    open={this.state.open}
                    onClose={this.handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={this.state.open}>

                        <div className={classes.paper}>
                            {this.state.alert != null ? <Alert message={this.state.alert} /> : ""}
                            {this.state.loading ? <Spinner /> :
                                <>
                                    {isMobile ?
                                        <div style={{ width: 250, height: 500 }}>
                                            <img alt="imagem" style={{ width: 200 }} src={this.state.products.image} />
                                            <h1 style={{ fontSize: 20 }}>{this.state.products.name}</h1>
                                            <h2 style={{ fontSize: 20 }}>Preço: R$ {parseFloat(this.state.products.price).toFixed(2)} </h2>
                                            <p id="transition-modal-description"><b>Descrição:</b> {this.state.products.description}</p>
                                            <button type="button" className="btn btn-primary" onClick={this.handleClose}>Fechar</button>
                                        </div>
                                        :
                                        <div style={{ width: 500, height: 500 }}>
                                            <img alt="imagem" style={{ width: 300 }} src={this.state.products.image} />
                                            <h1 style={{ fontSize: 20 }}>{this.state.products.name}</h1>

                                            <h2 style={{ fontSize: 20 }}>Preço: R$ {parseFloat(this.state.products.price).toFixed(2)} </h2>
                                            <p id="transition-modal-description"><b>Descrição:</b> {this.state.products.description}</p>
                                            <button type="button" className="btn btn-primary" onClick={this.handleClose}>Fechar</button>
                                        </div>
                                    }
                                </>
                            }
                        </div>
                    </Fade>
                </Modal>


            </div>
        )
    }
}

ProductModal.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductModal);