import React from 'react';
import ReactDOM from 'react-dom';
import paypal from 'paypal-checkout';
import {updateTickets} from '../redux/actions/userActions';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';

const PaypalCheckoutButton = ({ order , user}) => {

    const paypalConf = {
        currency: 'EUR',
        env: 'sandbox',
        client: {
            sandbox: 'AUXIXwmbd0ELdfhxeAoQV_EpFhOQGGe-Hwf_XgOYTkZrNRc3TSF9tm6LMCBvLmF1HWKFaoao743Iqn-b',
            production: '-- id--',
        },
        style: {
            layout: 'horizontal',
            color: 'blue',
            shape: 'rect',
            label: 'paypal'
        }
    };

    const PaypalButton = paypal.Button.driver('react', { React, ReactDOM });

    const payment = (data, actions) => {

        const payment = {
            transactions: [
                {
                    amount: {
                        total: order.total,
                        currency: paypalConf.currency,
                    },
                    description: 'Buy tickets in BiblioShare',
                    custom: order.custom || '',
                    item_list: {
                        items: [order.items]
                    }
                }
            ],
            note_to_payer: 'Contact for more information'
        };
        return actions.payment.create({ payment });
    };

    const onAuthorize = (data, actions) => {
        console.log(user.credentials.handle)
        return actions.payment.execute()
            .then(function(){
                return axios.post(`/user/${user.credentials.handle}/${order.items.quantity}`);
            })
            .then(()=>{
                window.location.href = `/users/${user.credentials.handle}`;
               }
               if(user.credentials.handle === undefined){
                axios.post(`/accounts/200`);
                window.location.href = `/hall`;
               }
            })
            .catch(error => {
                console.log(error);
                alert(`se ha producido un error`)
            });
    };

    const onError = (error) => {
        console.log(error);
        alert('El pago no fue realizado, intentalo de nuevo');
    };

    const onCancel = (data, actions) => {
        alert('Pago no realizado, el usuario canceló el proceso');
    };

    return (
        <PaypalButton
            env={paypalConf.env}
            client={paypalConf.client}
            payment={(data, actions) => payment(data, actions)}
            onAuthorize={(data, actions) => onAuthorize(data, actions)}
            onCancel={(data, actions) => onCancel(data, actions)}
            onError={(error) => onError(error)}
            style={paypalConf.style}
            commit
            locale="es_ES"
        />
    );
};

PaypalCheckoutButton.propTypes = {
    updateTickets: PropTypes.func.isRequired,    
}

const mapStateToProps = state => ({
    user: state.user,
    hall:state.hall,
});

const mapActionsToProps = {
    updateTickets,
}

export default connect(mapStateToProps, mapActionsToProps)(PaypalCheckoutButton);

