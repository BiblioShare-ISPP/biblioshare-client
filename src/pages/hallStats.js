import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

//Material
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

//Redux
import {connect} from 'react-redux';
import { getResidents, getBookStats } from '../redux/actions/hallAction';

//Chart.js
import { Doughnut, Polar } from 'react-chartjs-2';


const styles = theme => ({
    progress: {
        margin: '50px 50%'
    },
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    statTitle: {
        margin: '12px 0px 0px 10px'
    }
});

class hallStats extends Component {
    state = {
        members: [],
        accounts: 0,
        location: '',
        stats: null
    };
    componentDidMount(){
        this.props.getBookStats();
    }
    componentDidUpdate(prevProps){
        if(this.props.hall.credentials !== prevProps.hall.credentials){
            this.props.getResidents(this.props.hall.credentials.location);
            this.setState({
                members: this.props.hall.credentials.members,
                accounts: this.props.hall.credentials.accounts,
                location: this.props.hall.credentials.location,
            });
        }
        if(this.props.hall.stats !== prevProps.hall.stats){
            this.setState({
                stats: this.props.hall.stats
            });
        }
    };
    render() {
        const {classes, hall:{loadingResidents, loadingStats, residents, credentials:{location, members}, stats}} = this.props;
        const residentStats = !loadingResidents ? ({labels: ['Hall members',`${location} Residents`],datasets: [{data: [members.length, (residents.length - members.length)],backgroundColor: ['#FF6384','#FFCE56'],hoverBackgroundColor: ['#FF6384','#FFCE56']}]}) : null;

        const bookStats = !loadingStats ? ({
            datasets: [{
              data: stats.map(function(stat){return stat.books;}),
              backgroundColor: stats.map(function(){return '#'+(Math.random()*0xFFFFFF<<0).toString(16);}),
            }],
            labels: stats.map(function(stat){return stat.user;})
          }) : null;

        let allResidents = !loadingResidents ? (<Doughnut data={residentStats} />) :(<CircularProgress className={classes.progress} />);
        let bookPerMember = !loadingStats ? (<Polar data={bookStats} />) : (<CircularProgress className={classes.progress} />);
        return (
            <Grid container spacing={1}>
                <Grid item sm={6} xs={12}>
                    <Paper elevation={3}>
                        <Typography className={classes.statTitle} variant="h5" color="primary">BiblioShare users</Typography>
                        <Typography className={classes.statTitle} variant="body1" color="primary">Number of {location}'s residents who are member of the hall</Typography>
                        <br />
                        {allResidents}
                        <br />
                    </Paper>

                </Grid>
                <Grid item sm={6} xs={12}>
                    <Paper elevation={3}>
                    <Typography className={classes.statTitle} variant="h5" color="primary">Books per member</Typography>
                    <Typography className={classes.statTitle} variant="body1" color="primary">Number of books posted by hall member</Typography>
                    <br />
                    {bookPerMember}
                    <br />
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

hallStats.propTypes = {
    hall: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    getResidents: PropTypes.func.isRequired,
    getBookStats: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    hall: state.hall,
});



export default connect(mapStateToProps, {getResidents, getBookStats})(withStyles(styles)(hallStats));
