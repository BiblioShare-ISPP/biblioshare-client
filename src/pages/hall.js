import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import {withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import HallProfile from '../components/HallProfile';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { withTranslation } from 'react-i18next';
//Redux
import { connect } from 'react-redux';
import { getResidents, addUserToHall } from '../redux/actions/hallAction';

//MaterialUI
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
    progress: {
        margin: '50px 50%'
    },
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    ad: {
        margin: '10px'
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: '#ffffff',
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginTop: theme.spacing(1),
          width: 'auto',
        },
      },
      searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          width: 120,
          '&:focus': {
            width: 200,
          },
        },
      },
});

class hall extends Component {
    state = {
        members: [],
        accounts: 0,
        location: '',
        search: ''
    };
    componentDidUpdate(prevProps) {
        /* Funcion para obtener todos los habitantes de la region del ayuntamiento */
        if (this.props.hall.credentials !== prevProps.hall.credentials) {
            this.props.getResidents(this.props.hall.credentials.location);
            this.setState({
                members: this.props.hall.credentials.members,
                accounts: this.props.hall.credentials.accounts,
                location: this.props.hall.credentials.location
            });
        }
    };
    handleCheck = value => () => {
        let newMember = this.state.members;
        newMember.push(value);
        let accounts = this.state.accounts - 1
        this.setState({
            members: newMember,
            accounts: accounts
        });

        this.props.addUserToHall(value, this.state.location);
    };

    updateSearch(event) {
        this.setState({ search: event.target.value.substr(0, 60) });

    }

    render() {
        const { classes, hall: { loadingResidents, residents, credentials: { members, image, description, accounts } } } = this.props;
        const { t } = this.props;

        let filteredResidents = residents.filter((member) => {
            return member.handle.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
        });
        let allResidents = !loadingResidents ? ((residents.length === 0) ? (
            <ListItem button>
                <ListItemText>{t('noUsers')} {this.state.location}</ListItemText>
            </ListItem>
        ) : (

                filteredResidents.map((resident, index) => (

                    <ListItem key={resident.handle} button>
                        <ListItemAvatar>
                            <Avatar alt={resident.handle} src={resident.imageUrl} />
                        </ListItemAvatar>
                        <ListItemText id={`checkbox-list-secondary-label-${index}`} primary={resident.handle} />
                        <ListItemSecondaryAction>
                            <Checkbox edge="end" onChange={this.handleCheck(resident.handle)} checked={(members.includes(resident.handle)) ? true : false} disabled={((members.includes(resident.handle)) || (accounts <= 0)) ? true : false} />
                        </ListItemSecondaryAction>
                    </ListItem>
                )))) : (<CircularProgress className={classes.progress} />);
        return (
            <Grid container spacing={6}>
                <Grid item sm={4} xs={12}>
                    <HallProfile />
                    <div className={classes.ad}>
                        <Typography variant="h5" color="primary">{description}</Typography>
                        <img alt="Ad" src={image} width="100%" />
                    </div>
                </Grid>
                <Grid item sm={8} xs={12}>
                    <Typography variant="h4" color="primary">{t('Users')}</Typography>
                    <div className={classes.search}>
                    <div className={classes.searchIcon}>
                                    <SearchIcon />
                    </div>
                    <InputBase
                        name="search"
                        onChange={this.updateSearch.bind(this)}
                        placeholder={t('SearchByHandle')}
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                        value={this.state.search}
                    />
                    </div>
                    <br />
                    <List dense className={classes.root}>
                        {allResidents}
                    </List>
                </Grid>
            </Grid>
        )
    }
}

hall.propTypes = {
    hall: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    addUserToHall: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    hall: state.hall,
    getResidents: PropTypes.func.isRequired

});

const hall1 = withTranslation()(hall);
export default connect(mapStateToProps, { getResidents, addUserToHall })(withStyles(styles)(hall1));
