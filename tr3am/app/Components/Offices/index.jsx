import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import List from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { LinearProgress } from 'material-ui/Progress';

import Styles from './Styles';
import StylesUtils from 'Utils/StylesUtils';
import OfficeItem from './OfficeItem';
import AddOfficeModal from './AddOfficeModal';
import * as officesActions from 'ActionCreators/officesActions';

class Offices extends React.Component {

  constructor(props) {
    super(props);

    this.handleAddNewClick = this.handleAddNewClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchOffices();
  }

  handleAddNewClick() {
    this.props.showAddOfficeModal(true);
  }

  renderListHeader() {
    const { classes } = this.props;
    return (
      <Grid item xs={12}>
        <Paper className={classes.headerPaper}>
          <Typography variant='display1'>
            <Grid container>
              <Grid item xs>Country</Grid>
              <Grid item xs={2}>City</Grid>
              <Grid item xs={3}>Address</Grid>
              <Grid item xs={2}>Lat</Grid>
              <Grid item xs={2}>Lng</Grid>
            </Grid>
          </Typography>
        </Paper>
      </Grid>
    );
  }

  render() {
    const { classes, offices, fetchOfficesLoading } = this.props;
    return (
      <div className={classes.root}>
        <AddOfficeModal />
        <Grid container spacing={16}>
          {this.renderListHeader()}
          {fetchOfficesLoading ?
            <Grid item xs={12}>
              <LinearProgress />
            </Grid>
            : <Grid container>
              <List className={classes.officeList}>
                {offices.map(office => (
                  <OfficeItem key={office.id} office={office} />
                ))}
              </List>
              <Grid item xs={12}>
                <Button
                  variant="raised"
                  color="primary"
                  className={classes.addNewButton}
                  onClick={this.handleAddNewClick}
                >
                  ADD NEW
                </Button>
              </Grid>
            </Grid>}
        </Grid>
      </div>
    );
  }
}

Offices.propTypes = {
  offices: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    country: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  })).isRequired,
  fetchOfficesLoading: PropTypes.bool.isRequired,
  fetchOfficesErrorMessage: PropTypes.string.isRequired,
  createOfficeLoading: PropTypes.bool.isRequired,
  createOfficeErrorMessage: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  showAddOfficeModal: PropTypes.func.isRequired,
  fetchOffices: PropTypes.func.isRequired,
  createOffice: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    offices: state.offices.offices,
    fetchOfficesLoading: state.offices.fetchOfficesLoading,
    fetchOfficesErrorMessage: state.offices.fetchOfficesErrorMessage,

    createOfficeLoading: state.offices.createOfficeLoading,
    createOfficeErrorMessage: state.offices.createOfficeErrorMessage,
  };
};

export default connect(mapStateToProps, officesActions)(
  withStyles({ ...Styles, ...StylesUtils })(Offices)
);