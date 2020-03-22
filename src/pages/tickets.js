import React, { Component } from 'react';
import PaypalCheckoutButton from '../components/PaypalCheckoutButton';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';


class tickets extends Component {

    render() {
        const order = {
            customer: '123456',
            total: '3.00',
            items: [
                {
                    sku: '1',
                    name: '1 Ticket BiblioShare',
                    quantity: '1',
                    price: '3.0',
                    currency: 'EUR',
                    description: 'Compra de ticket en la página BiblioShare',
                }
            ]
        }

        const order1 = {
            customer: '123456',
            total: '13.0',
            items: [
                {
                    sku: '2',
                    name: 'Pack x5 Tickets BiblioShare',
                    quantity: '5',
                    price: '2.6',
                    currency: 'EUR',
                    description: 'Compra de ticket en la página BiblioShare',
                }
            ]
        };

        const order2 = {
            customer: '123456',
            total: '25.0',
            items: [
                {
                    sku: '3',
                    name: ' Pack x10 Tickets BiblioShare',
                    quantity: '10',
                    price: '2.5',
                    currency: 'EUR',
                    description: 'Compra de ticket en la página BiblioShare',
                }
            ]


        }

        return (
            <Card>

                <CardContent >

                    <Typography variant='h5'>Tickets3</Typography>  <Typography variant='h5'>1€</Typography>
                    <br/>
                    <PaypalCheckoutButton order={order1} />



                </CardContent>
            </Card > 
        )
        
    }
}




export default (tickets);