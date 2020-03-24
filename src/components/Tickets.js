import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';

import PropTypes from 'prop-types';
import PaypalCheckoutButton from '../components/PaypalCheckoutButton';
//MUI

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';



// Redux
import { connect } from 'react-redux';

const styles = {
    card: {
        display: 'flex',
        marginBottom: 20,
    },
    image:{
        minWidth: 150,
        minHeight: 200,
    },
    content: {
        padding: 25,
        objectFit: 'cover',
        width: '100%'
    }
};

class Tickets extends Component {

    render() {
        const offerpaypal= this.props.offer;
        const {classes} = this.props;
        const { offer: {total, imageUrl, items: {description}}} = this.props;        
        return (
            <Card className={classes.card}>
                <CardMedia image={imageUrl} title="Cover image" className={classes.image}/>
                <CardContent className={classes.content}>

                    <Typography variant="h5"  color="primary">{description}</Typography>
                    <Typography variant="h6" color="textSecondary">{total}€</Typography>
                    <PaypalCheckoutButton order={offerpaypal}/>
                     
                </CardContent>
            </Card>
        );
    }
}

Tickets.propTypes = {
    classes: PropTypes.object.isRequired,
    data:PropTypes.object.isRequired,
    
}

const mapStateToProps = (state) => ({
    user: state.user,
    data: state.data
  });
  

export default connect(mapStateToProps)(withStyles(styles)(Tickets));
