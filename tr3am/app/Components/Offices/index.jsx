import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import List from 'material-ui/List';
import { withStyles } from 'material-ui/styles';

import Styles from './Styles';
import OfficeList from 'Constants/Offices';
import OfficeItem from './OfficeItem';
import AddOfficeModal from './AddOfficeModal';
import * as officesActions from 'ActionCreators/officesActions';
import { connect } from 'react-redux';

class Offices extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddNewClick = this.handleAddNewClick.bind(this);
  }

  componentDidMount() {
    const { offices, setOffices } = this.props;
    if (Object.keys(offices).length === 0) {  
      setOffices(OfficeList);
    }
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
  classes: PropTypes.object.isRequired,
  showAddOfficeModal: PropTypes.func.isRequired,
  setOffices: PropTypes.func.isRequired,
  addOffice: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    offices: state.offices.offices,
  };
};
export default connect(mapStateToProps, officesActions)(withStyles(Styles)(Offices));