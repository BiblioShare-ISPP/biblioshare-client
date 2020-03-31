import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CustomButton from '../util/CustomButton';

//MUI

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import CloseIcon from '@material-ui/icons/Close';
import PaypalCheckoutButton from '../components/PaypalCheckoutButton';
import Typography from '@material-ui/core/Typography';
import {connect} from 'react-redux';

const styles = {
    
    closeButton: {
        position: 'absolute',
        right: '3%',
        top: '3%'
    },
    addButton: {
        float: 'right'
    }
    
};

class ButtonAddCounts extends Component{
    state = {
        open: false,
    }
    handleOpen = () => {
        this.setState({ 
            open: true,
           
        });
        
    };
    handleClose = () => {
        this.setState({ 
            open: false, 
            
        })
    };
   
    
    
    render(){
        const order = {
            customer:'123456',
            total:'200.00',
            items: 
                {
                    sku:'4',
                    name:'200 cuentas BiblioShare',
                    price:'1.00',
                    quantity: '200',
                    currency: 'EUR',
                    description: '200 acounts BiblioShare'
                }
            
        };
        const { classes} = this.props;
        return (
            <Fragment>
                <CustomButton onClick={this.handleOpen} tip="Buy accounts" tipClassName={classes.addButton}>
                    <GroupAddIcon color="primary" style={{ fontSize: 30 }}/>
                </CustomButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <CustomButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon />
                    </CustomButton>
                    <DialogTitle>Buy Accounts</DialogTitle>
                    <DialogContent>
                    <Typography variant="h5"  color="primary">200 accounts</Typography>
                    <Typography variant="h6" color="textSecondary">200€</Typography>
                    <br/>
                        <PaypalCheckoutButton order={order} user={this.props.hall.credentials.location}/>
                    </DialogContent>
                </Dialog>
                
            </Fragment>
        )
    }
}

ButtonAddCounts.propTypes = {
    hall: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    hall: state.hall
  });



export default connect(mapStateToProps)(withStyles(styles)(ButtonAddCounts));