import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import List from 'material-ui/List';

import Styles from './Styles';
import OfficeItem from './OfficeItem';
import AddOfficeModal from './AddOfficeModal';
import * as officesActions from 'ActionCreators/officesActions';

class Offices extends React.Component {
  constructor(props) {
    super(props);

    this.handleAddNewClick = this.handleAddNewClick.bind(this);
  }

  componentDidMount() {
    this.props.getOffices();
  }

  handleAddNewClick() {
    this.props.showAddOfficeModal(true);
  }

  render() {
    const { classes, offices } = this.props;
    return (
      <div className={classes.root}>
        <AddOfficeModal />
        <Grid container spacing={16}>
          <List className={classes.officeList}>
            {offices.map(office => (
              <OfficeItem key={office.id} office={office} />
            ))}
          </List>
          <Grid item xs={12}>
            {/* TODO: Implement button functionality */}

            <Button
              variant="raised"
              color="primary"
              className={classes.addNewButton}
              onClick={this.handleAddNewClick}>
              ADD NEW
            </Button>
          </Grid>
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
  getOfficesLoading: PropTypes.bool.isRequired,
  getOfficesError: PropTypes.bool.isRequired,
  addOfficeLoading: PropTypes.bool.isRequired,
  addOfficeError: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  showAddOfficeModal: PropTypes.func.isRequired,
  getOffices: PropTypes.func.isRequired,
  addOffice: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,

    offices: state.offices.offices,
    getOfficesLoading: state.offices.getOfficesLoading,
    getOfficesError: state.offices.getOfficesError,

    addOfficeLoading: state.offices.addOfficeLoading,
    addOfficeError: state.offices.addOfficeLoading,
  };
};
export default connect(mapStateToProps, officesActions)(withStyles(Styles)(Offices));