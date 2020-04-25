import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

//MUI
import Typography from '@material-ui/core/Typography';

//Redux
import { connect } from 'react-redux';

const styles = {
    form: {
      textAlign: 'center'
    },
    image: {
        margin: '20px auto 20px auto'
    },
    pageTitle: {
        margin: '20px auto 20px auto'
    },
    textField: {
        margin: '10px auto 10px auto'
    },
    button: {
        marginTop: '10px',
        position: 'relative'
    },
    customError: {
        color: 'red',
        fontSize: '0.8rem'
    },
    progress: {
        position: 'absolute'
    }
};
class terms extends Component {
    render() {
        const { t } = this.props;
        return (
        <Fragment>
            <Typography variant="h6" color="textPrimary"><b>{t('ht1')}</b></Typography>
            <br/>
            <Typography variant="body1" color="textSecondary">{t('bt11')}</Typography>
            <Typography variant="body1" color="textSecondary">{t('bt12')}</Typography>
            <Typography variant="body1" color="textSecondary">{t('bt13')}</Typography>
            <Typography variant="body1" color="textSecondary">{t('bt14')}</Typography>
            <Typography variant="body1" color="textSecondary">{t('bt15')}</Typography>
            <br/>
            <Typography variant="h6" color="textPrimary">{t('ht2')}</Typography>
            <br/>
            <Typography variant="body1" color="textSecondary">{t('bt21')}</Typography>
            <Typography variant="body1" color="textSecondary">{t('bt22')}</Typography>
            <ul>
                <li><Typography variant="body1" color="textSecondary">{t('bt221')}</Typography></li>
                <li><Typography variant="body1" color="textSecondary">{t('bt222')}</Typography></li>
                <li><Typography variant="body1" color="textSecondary">{t('bt223')}</Typography></li>
                <li><Typography variant="body1" color="textSecondary">{t('bt224')}</Typography></li>
            </ul>
            <Typography variant="body1" color="textSecondary">{t('bt23')}</Typography>
            <Typography variant="body1" color="textSecondary">{t('bt24')}</Typography>
            <Typography variant="body1" color="textSecondary">{t('bt25')}</Typography>
            <Typography variant="body1" color="textSecondary">{t('bt26')}</Typography>
            <Typography variant="body1" color="textSecondary">{t('bt27')}</Typography>
            <ul>
                <li><Typography variant="body1" color="textSecondary">{t('bt271')}</Typography></li>
                <li><Typography variant="body1" color="textSecondary">{t('bt272')}</Typography></li>
                <li><Typography variant="body1" color="textSecondary">{t('bt273')}</Typography></li>
                <li><Typography variant="body1" color="textSecondary">{t('bt274')}</Typography></li>
            </ul>
            <Typography variant="body1" color="textSecondary">{t('bt28')}</Typography>
            <br/>
            <Typography variant="h6" color="textPrimary">{t('ht3')}</Typography>
            <br/>
            <Typography variant="body1" color="textSecondary">{t('bt31')}</Typography>
            <ul>
                <li><Typography variant="body1" color="textSecondary">{t('bt311')}</Typography></li>
                <li><Typography variant="body1" color="textSecondary">{t('bt312')}</Typography></li>
                <li><Typography variant="body1" color="textSecondary">{t('bt313')}</Typography></li>
                <li><Typography variant="body1" color="textSecondary">{t('bt314')}</Typography></li>
                <li><Typography variant="body1" color="textSecondary">{t('bt315')}</Typography></li>
            </ul>
            <Typography variant="body1" color="textSecondary">{t('bt32')}</Typography>
            <Typography variant="body1" color="textSecondary">{t('bt33')}</Typography>
            <ul>
                <li><Typography variant="body1" color="textSecondary">{t('bt331')}</Typography></li>
                <li><Typography variant="body1" color="textSecondary">{t('bt332')}</Typography></li>
                <li><Typography variant="body1" color="textSecondary">{t('bt333')}</Typography></li>
                <li><Typography variant="body1" color="textSecondary">{t('bt334')}</Typography></li>
                <li><Typography variant="body1" color="textSecondary">{t('bt335')}</Typography></li>
                <li><Typography variant="body1" color="textSecondary">{t('bt336')}</Typography></li>
            </ul>
            <Typography variant="body1" color="textSecondary">{t('bt34')}</Typography>
            <Typography variant="body1" color="textSecondary">{t('bt35')}</Typography>
            <Typography variant="body1" color="textSecondary">{t('bt36')}</Typography>
            <Typography variant="body1" color="textSecondary">{t('bt37')}</Typography>
            <ul>
                <li><Typography variant="body1" color="textSecondary">{t('bt371')}</Typography></li>
                <li><Typography variant="body1" color="textSecondary">{t('bt372')}</Typography></li>
                <li><Typography variant="body1" color="textSecondary">{t('bt373')}</Typography></li>
            </ul>
            <Typography variant="body1" color="textSecondary">{t('bt38')}</Typography>
            <br/>
            <Typography variant="h6" color="textPrimary">{t('ht4')}</Typography>
            <br/>
            <Typography variant="body1" color="textSecondary">{t('bt41')}</Typography>
            <br/>
            <Typography variant="h6" color="textPrimary">{t('ht5')}</Typography>
            <br/>
            <Typography variant="body1" color="textSecondary">{t('bt51')}</Typography>
            <br/>
            <Typography variant="h6" color="textPrimary">{t('ht6')}</Typography>
            <br/>
            <Typography variant="body1" color="textSecondary">{t('bt61')}</Typography>
            <br/>
            <Typography variant="h6" color="textPrimary">{t('ht7')}</Typography>
            <br/>
            <Typography variant="body1" color="textSecondary">{t('bt71')}</Typography>
            <Typography variant="body1" color="textSecondary">{t('bt72')}</Typography>
            <br/>
            <Typography variant="h6" color="textPrimary">{t('ht8')}</Typography>
            <br/>
            <Typography variant="body1" color="textSecondary">{t('bt81')}</Typography>
            <ul>
                <li><Typography variant="body1" color="textSecondary">{t('bt811')}</Typography></li>
                <li><Typography variant="body1" color="textSecondary">{t('bt812')}</Typography></li>
                <li><Typography variant="body1" color="textSecondary">{t('bt813')}</Typography></li>
                <li><Typography variant="body1" color="textSecondary">{t('bt814')}</Typography></li>
            </ul>
            <Typography variant="body1" color="textSecondary">{t('bt82')}</Typography>
            <Typography variant="body1" color="textSecondary">{t('bt83')}</Typography>
            <br/>
            <Typography variant="h6" color="textPrimary"><b>{t('privacyTitle')}</b></Typography>
            <br/>
            <Typography variant="body1" color="textSecondary">{t('bp11')}</Typography>
            <Typography variant="body1" color="textSecondary">{t('bp12')}</Typography>
            <Typography variant="body1" color="textSecondary">{t('bp13')}</Typography>
            <br/>
            <Typography variant="h6" color="textPrimary">{t('hp2')}</Typography>
            <br/>
            <Typography variant="body1" color="textSecondary">{t('bp21')}</Typography>
            <br/>
            <Typography variant="h6" color="textPrimary">{t('hp3')}</Typography>
            <br/>
            <Typography variant="body1" color="textSecondary">{t('bp31')}</Typography>
            <Typography variant="body1" color="textSecondary">{t('bp32')}</Typography>
            <Typography variant="body1" color="textSecondary">{t('bp33')}</Typography>
            <br/>
            <Typography variant="h6" color="textPrimary">{t('hp4')}</Typography>
            <br/>
            <Typography variant="body1" color="textSecondary">{t('bp41')}</Typography>
            <ul>
                <li><Typography variant="body1" color="textSecondary">{t('bp411')}</Typography></li>
                <li><Typography variant="body1" color="textSecondary">{t('bp412')}</Typography></li>
                <li><Typography variant="body1" color="textSecondary">{t('bp413')}</Typography></li>
                <li><Typography variant="body1" color="textSecondary">{t('bp414')}</Typography></li>
                <li><Typography variant="body1" color="textSecondary">{t('bp415')}</Typography></li>
                <li><Typography variant="body1" color="textSecondary">{t('bp416')}</Typography></li>
                <li><Typography variant="body1" color="textSecondary">{t('bp417')}</Typography></li>
            </ul>
            <br/>
            <Typography variant="h6" color="textPrimary">{t('hp5')}</Typography>
            <br/>
            <Typography variant="body1" color="textSecondary">{t('bp51')}</Typography>
            <Typography variant="body1" color="textSecondary">{t('bp52')}</Typography>
            <br/>
            <Typography variant="h6" color="textPrimary">{t('hp6')}</Typography>
            <br/>
            <Typography variant="body1" color="textSecondary">{t('bp61')}</Typography>
            <Typography variant="body1" color="textSecondary">{t('bp62')}</Typography>
            <Typography variant="body1" color="textSecondary">{t('bp63')}</Typography>
            <br/>
            <Typography variant="h6" color="textPrimary">{t('hp7')}</Typography>
            <br/>
            <Typography variant="body1" color="textSecondary">{t('bp71')}</Typography>
            <br/>
            <Typography variant="h6" color="textPrimary">{t('hp8')}</Typography>
            <br/>
            <Typography variant="body1" color="textSecondary">{t('bp81')}</Typography>
            <Typography variant="body1" color="textSecondary">{t('bp82')}</Typography>
            <Typography variant="body1" color="textSecondary">{t('bp83')}</Typography>
            <Typography variant="body1" color="textSecondary">{t('bp84')}</Typography>
            <Typography variant="body1" color="textSecondary">{t('bp85')}</Typography>
            <Typography variant="body1" color="textSecondary">{t('bp86')}</Typography>
            <Typography variant="body1" color="textSecondary">{t('bp87')}</Typography>
            <Typography variant="body1" color="textSecondary">{t('bp88')}</Typography>
            <Typography variant="body1" color="textSecondary">{t('bp89')}</Typography>
            <br/>
            <Typography variant="h6" color="textPrimary">{t('hp9')}</Typography>
            <br/>
            <Typography variant="body1" color="textSecondary">{t('bp91')}</Typography>
            <Typography variant="body1" color="textSecondary">{t('bp92')}</Typography>
            <br/>
        </Fragment>
        );
    }
}

terms.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});
const terms1 = withTranslation()(terms)
export default connect(mapStateToProps)(withStyles(styles)(terms1));
