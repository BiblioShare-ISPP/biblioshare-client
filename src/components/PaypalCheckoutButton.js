import React from 'react';
import ReactDOM from 'react-dom';
import paypal from 'paypal-checkout';


const PaypalCheckoutButton = ({order}) => {

    const paypalConf = {
        currency: 'EUR',
        env: 'sandbox',
        client: {
            sandbox: 'AUXIXwmbd0ELdfhxeAoQV_EpFhOQGGe-Hwf_XgOYTkZrNRc3TSF9tm6LMCBvLmF1HWKFaoao743Iqn-b',
            production: '-- id--',
        },
        style: {
            layout:  'vertical',
            color:   'gold',
            shape:   'rect',
            label:   'paypal'
        }
    };

    const PaypalButton = paypal.Button.driver('react', {React, ReactDOM});

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
                        items:order.items
                    }
                }
            ],
            note_to_payer: 'Contact for more information'
        };
        return actions.payment.create({payment});
    };

    const onAuthorize = (data, actions) => {
        return actions.payment.execute()
        .then( response => {
            console.log(response);
            alert(`El pago fue procesado correctamente, ID: ${response.id}`);
        })
        .catch( error => {
            console.log(error);
            alert(`se ha producido un error`)
        });
    };

    const onError = (error) => {
        console.log(error);
        alert('El pago no fue realizado, intentalo de nuevo');
    };

    const onCancel = (data,actions) => {
        alert('Pago no realizado, el usuario canceló el proceso');
    };

    return(
        <PaypalButton
        env={paypalConf.env}
        client={paypalConf.client}
        payment={(data,actions) => payment(data, actions)}
        onAuthorize={(data,actions) => onAuthorize(data, actions)}
        onCancel={(data,actions) => onCancel(data, actions)}
        onError={(error)=> onError(error)}
        style={paypalConf.style}
        commit
        locale="es_ES"
        />

        
    );
};

export default PaypalCheckoutButton;

